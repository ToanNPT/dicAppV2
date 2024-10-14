package com.education.vndictionary.services.impl;

import com.education.vndictionary.common.CommonConstant;
import com.education.vndictionary.common.Messages;
import com.education.vndictionary.common.HttpResponseUtil;
import com.education.vndictionary.common.MessageParams;
import com.education.vndictionary.dtos.PaginatedHttpResponse;
import com.education.vndictionary.dtos.TopicDto;
import com.education.vndictionary.dtos.converters.TopicConverter;
import com.education.vndictionary.entities.Topic;
import com.education.vndictionary.entities.TopicTotalView;
import com.education.vndictionary.exceptions.AppErrorException;
import com.education.vndictionary.mybatisQuery.TopicCustomQueryMapper;
import com.education.vndictionary.repositories.TopicRepository;
import com.education.vndictionary.repositories.TopicTotalViewRepository;
import com.education.vndictionary.services.TopicService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicServiceImpl implements TopicService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final TopicRepository topicRepository;

    private final TopicCustomQueryMapper topicCustomQueryMapper;

    private final TopicTotalViewRepository topicTotalViewRepository;

    private final FileCommonServiceImpl fileCommonService;


    @Override
    public TopicDto getTopicById(Integer topicId) {

        Topic topic = this.topicRepository.findByIdAndIsHidden(topicId, false);
        if (topic == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.TOPIC));
        }

        return TopicConverter.toTopicDto(topic);
    }

    @Override
    public List<TopicDto> searchTopics(String keyword, Integer limit, Integer page) {
        if (keyword == null) {
            keyword = "";
        }

        limit = limit < 0 ? CommonConstant.DEFAULT_LIMIT : limit;
        page = page <= 0 ? CommonConstant.DEFAULT_PAGE : page;

        return this.topicCustomQueryMapper.searchTopicByName(keyword.trim().toLowerCase(), limit, page - 1);
    }

    @Override
    public List<TopicDto> getAllTopicIdAndName() {
        return this.topicCustomQueryMapper.getAllTopicIdAndName();
    }

    @Override
    @Transactional(rollbackOn = Exception.class, value = Transactional.TxType.REQUIRES_NEW)
    public void createTopic(TopicDto topicDto) {

        this.ensureValidTopicName(topicDto.getTopicName());

        Integer maxSec = this.topicRepository.getMaxSec();
        maxSec = maxSec == null ? 0 : maxSec + 1;

        Topic topic = new Topic();
        topic.setTopicName(topicDto.getTopicName());
        topic.setThumbnail(topicDto.getThumbnail());
        topic.setSec(maxSec);
        topic.setIsHidden(false);

        //current version not support classroom
        topic.setClassId(CommonConstant.DEFAULT_CLASSROOM);

        Topic dbTopic = this.topicRepository.saveAndFlush(topic);

        TopicTotalView topicTotalView = new TopicTotalView();
        topicTotalView.setTopicId(dbTopic.getId());
        topicTotalView.setViewCount(0L);

        this.topicTotalViewRepository.save(topicTotalView);
    }

    @Override
    public void updateTopic(Integer topicId, TopicDto topicDto) {
        this.ensureValidTopicName(topicDto.getTopicName());
        Topic topic = this.topicRepository.findByIdAndIsHidden(topicId, false);
        if (topic == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.TOPIC));
        }

        topic.setTopicName(topicDto.getTopicName());
        if (topic.getThumbnail() != null && !topic.getThumbnail().isEmpty() && !topic.getThumbnail().equals(topicDto.getThumbnail())) {
            try {
                this.fileCommonService.deleteFile(topic.getThumbnail());
            } catch (IOException e) {
                throw new RuntimeException("Can not delete file");
            }
        }

        topic.setThumbnail(topicDto.getThumbnail());

        this.topicRepository.save(topic);
    }

    @Override
    public void deleteTopic(Integer topicId) {
        Topic topic = this.topicRepository.findByIdAndIsHidden(topicId, false);
        if (topic == null) {
            throw AppErrorException.notFoundException(Messages.formatErrorMsg(Messages.NOT_FOUND_TEMPLATE, MessageParams.TOPIC));
        }

        topic.setIsHidden(true);
        this.topicRepository.save(topic);
    }

    @Override
    public List<TopicDto> viewPopularTopics(Integer limit) {
        limit = limit == null || limit < 0 ? 6 : limit;
        List<TopicDto> topics = this.topicCustomQueryMapper.getPopularTopics(limit);
        if (topics == null) {
            return Collections.emptyList();
        }

        return topics;
    }

    @Override
    public PaginatedHttpResponse viewAllTopicWithPaging(Integer page, Integer size) {
        page = page == null || page < 0 ? CommonConstant.DEFAULT_PAGE : page;
        size = size == null || size < 0 ? CommonConstant.DEFAULT_LIMIT : size;

        List<TopicDto> topics = this.topicCustomQueryMapper.getTopicsWithPaging(size, (page - 1) * size);
        if (topics == null) {
            topics = Collections.emptyList();
        }

        Integer total = this.topicCustomQueryMapper.countTotalTopic();

        return HttpResponseUtil.paginatedHttpResponse(topics, page, total % size == 0 ? total / size : total / size + 1, total);
    }

    private void ensureValidTopicName(String topicName) {
        if (topicName == null || topicName.isEmpty()) {
            throw AppErrorException.badRequestException(Messages.formatErrorMsg(Messages.NOT_BLANK_FIELDS, MessageParams.TOPIC_NAME));
        }
    }

    @Override
    @Transactional(value = Transactional.TxType.REQUIRES_NEW)
    public void increaseViewTopic(Integer topicId) {
        try {
            this.topicTotalViewRepository.updateViewTopic(topicId);
        } catch (Exception e) {
            logger.error("Error: ", e);
        }
    }

}
