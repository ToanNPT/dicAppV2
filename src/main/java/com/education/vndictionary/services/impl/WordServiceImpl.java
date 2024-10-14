package com.education.vndictionary.services.impl;

import com.education.vndictionary.common.CommonConstant;
import com.education.vndictionary.common.Messages;
import com.education.vndictionary.common.HttpResponseUtil;
import com.education.vndictionary.common.MessageParams;
import com.education.vndictionary.dtos.PaginatedHttpResponse;
import com.education.vndictionary.dtos.WordDto;
import com.education.vndictionary.dtos.converters.WordConverter;
import com.education.vndictionary.dtos.requests.WordSearchParams;
import com.education.vndictionary.entities.Topic;
import com.education.vndictionary.entities.Word;
import com.education.vndictionary.entities.WordDescription;
import com.education.vndictionary.exceptions.AppErrorException;
import com.education.vndictionary.mybatisQuery.WordCustomQueryMapper;
import com.education.vndictionary.repositories.*;
import com.education.vndictionary.services.FileCommonService;
import com.education.vndictionary.services.TopicService;
import com.education.vndictionary.services.WordService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;


    private final TopicRepository topicRepository;

    private final TopicTotalViewRepository topicTotalViewRepository;

    private final WordCustomQueryMapper wordCustomQueryMapper;

    private final TopicService topicService;

    private final WordDescriptionRepository wordDescriptionRepository;

    private final FileCommonService fileCommonService;


    @Override
    public WordDto getWordById(Integer wordId, Boolean isIncreaseView) {
        Word word = this.wordRepository.findById(wordId).orElse(null);
        if (word == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.WORD));
        }

        Topic topic = this.topicRepository.findByIdAndIsHidden(word.getTopicId(), false);
        String topicName = topic != null ? topic.getTopicName() : null;

        //INCREASE COUNT_VIEW for Topic if user search word
        if (isIncreaseView) {
            this.topicService.increaseViewTopic(word.getTopicId());
        }

        WordDto dto =  WordConverter.toWordDto(word, topicName);
        List<WordDescription> descriptions  = this.wordDescriptionRepository.findByWordIdAndIsHiddenOrderBySec(wordId, false);
        String wordTypes = descriptions.stream().map(WordDescription::getWordType).collect(Collectors.joining(", "));

        dto.setDescriptions(WordConverter.toWordDescriptionDtos(descriptions));
        dto.setWordType(wordTypes);
        return dto;
    }

    @Override
    public PaginatedHttpResponse getWordsByTopicId(Integer topicId, Boolean isIncreaseView, Integer limit, Integer page) {
        limit = limit == null || limit <= 0 ? CommonConstant.DEFAULT_LIMIT : limit;
        page = page == null || page <= 0 ? CommonConstant.DEFAULT_PAGE : page;

        Topic dbTopic = this.topicRepository.findByIdAndIsHidden(topicId, false);
        if (dbTopic == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.TOPIC));
        }

        List<Word> words = this.wordRepository.findAllByTopicIdAndIsHidden(topicId, false, limit, page - 1);

        if (isIncreaseView) {
            this.topicService.increaseViewTopic(topicId);
        }

        List<WordDto> dtos = WordConverter.toWordDtos(dbTopic.getTopicName(), words);
        Integer count = this.wordRepository.countByTopicIdAndIsHidden(topicId, false);
        var totalPages = count / limit == 0 ? count / limit : count / limit + 1;

        return HttpResponseUtil.paginatedHttpResponse(dtos, page, totalPages, count);
    }

    @Override
    public PaginatedHttpResponse getAllWords(Integer limit, Integer page) {
        limit = limit == null || limit <= 0 ? CommonConstant.DEFAULT_LIMIT : limit;
        page = page == null || page <= 0 ? CommonConstant.DEFAULT_PAGE : page;

        List<Word> words = this.wordRepository.findAllByIsHidden(false, limit, page - 1);

        List<WordDto> dtos = WordConverter.toWordDtos(words);

        Integer count = this.wordRepository.countAllActiveWords(false);

        var totalPages = count / limit == 0 ? count / limit : count / limit + 1;

        return HttpResponseUtil.paginatedHttpResponse(dtos, page, totalPages, count);

    }

    @Override
    public PaginatedHttpResponse searchWords(WordSearchParams params) {
        if (params.getSize() == null || params.getSize() <= 0) {
            params.setSize(CommonConstant.DEFAULT_LIMIT);
        }

        if (params.getPage() == null || params.getPage() <= 0) {
            params.setPage(CommonConstant.DEFAULT_PAGE);
        }

        List<WordDto> dtos = this.wordCustomQueryMapper.searchWords(
                params.getSearchText().trim().toLowerCase(),
                params.getTopicId(),
                params.getDateOrder(),
                params.getSize(),
                (params.getPage() - 1) * params.getSize()
        );

        Integer countElements = this.wordCustomQueryMapper.countSearchWords(params.getSearchText(), params.getTopicId());
        var totalPages = countElements % params.getSize() == 0 ? countElements / params.getSize() : countElements / params.getSize() + 1;
        return HttpResponseUtil.paginatedHttpResponse(dtos, params.getPage(), totalPages, countElements);
    }

    @Transactional(rollbackOn = Exception.class)
    @Override
    public WordDto createWord(WordDto wordDto) {
        Topic dbTopic = this.topicRepository.findByIdAndIsHidden(wordDto.getTopicId(), false);
        if (dbTopic == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.TOPIC));
        }

        Integer maxSec = this.wordRepository.getMaxSec(wordDto.getTopicId());
        maxSec = maxSec != null ? maxSec + 1 : 0;

        Word word = new Word();
        word.setKeyWork(wordDto.getKeyWork());
        word.setTopicId(wordDto.getTopicId());
        word.setVoiceUrl(wordDto.getVoiceUrl());
        word.setSec(maxSec);
        word.setIsHidden(false);

        word.setClassId(CommonConstant.DEFAULT_CLASSROOM);
        this.wordRepository.saveAndFlush(word);


        if (wordDto.getDescriptions() != null && !wordDto.getDescriptions().isEmpty()) {
            List<WordDescription> descriptions = wordDto.getDescriptions().stream().map(descriptionDto -> {
                WordDescription description = new WordDescription();
                description.setWordId(word.getId());
                description.setWordType(descriptionDto.getWordType());
                description.setDescription(descriptionDto.getDescription());
                description.setSec(descriptionDto.getSec());
                description.setIsHidden(false);

                return description;
            }).toList();

            this.wordDescriptionRepository.saveAll(descriptions);
        }

        WordDto dto =  WordConverter.toWordDto(word);

        return dto;

    }

    @Override
    public void updateWord(Integer id, WordDto wordDto) {
        Word dbWord = this.wordRepository.findByIdAndIsHidden(id, false);
        if (dbWord == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.WORD));
        }

        dbWord.setKeyWork(wordDto.getKeyWork());
        dbWord.setTopicId(wordDto.getTopicId());
        if (dbWord.getVoiceUrl() != null && !dbWord.getVoiceUrl().equals(wordDto.getVoiceUrl())) {
            try {
                this.fileCommonService.deleteFile(dbWord.getVoiceUrl());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        dbWord.setVoiceUrl(wordDto.getVoiceUrl());

        List<WordDescription> descriptions = this.wordDescriptionRepository.findByWordIdAndIsHiddenOrderBySec(dbWord.getId(), false);
        Map<Integer, WordDescription> descriptionMap = descriptions.stream().collect(Collectors.toMap(WordDescription::getId, description -> description));
        Integer maxSec = this.wordDescriptionRepository.getMaxSecByWordId(dbWord.getId());
        if (maxSec == null) {
            maxSec = 0;
        }

        if (wordDto.getDescriptions() != null) {
            for (var descriptionDto : wordDto.getDescriptions()) {
                //CASE INSERT
                if (descriptionDto.getId() == null) {
                    WordDescription description = new WordDescription();
                    description.setWordId(dbWord.getId());
                    description.setWordType(descriptionDto.getWordType());
                    description.setDescription(descriptionDto.getDescription());
                    description.setSec(descriptionDto.getSec());
                    description.setIsHidden(false);
                    this.wordDescriptionRepository.save(description);
                } else {
                    //CASE UPDATE
                    WordDescription dbDescription = descriptionMap.get(descriptionDto.getId());
                    if (dbDescription != null) {
                        dbDescription.setWordType(descriptionDto.getWordType());
                        dbDescription.setDescription(descriptionDto.getDescription());
                        dbDescription.setSec(descriptionDto.getSec());
                        dbDescription.setIsHidden(descriptionDto.getIsHidden());
                        this.wordDescriptionRepository.save(dbDescription);
                    }

                }
            }
        }

        this.wordRepository.save(dbWord);
    }

    @Override
    @Transactional
    public void deleteWord(Integer wordId) {
        Word dbWord = this.wordRepository.findByIdAndIsHidden(wordId, false);
        if (dbWord == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.WORD));
        }

        dbWord.setIsHidden(true);

        this.wordRepository.save(dbWord);
        this.wordDescriptionRepository.unActiveWordDescriptionByWordId(dbWord.getId());
    }

}
