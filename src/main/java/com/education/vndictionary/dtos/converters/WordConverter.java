package com.education.vndictionary.dtos.converters;

import com.education.vndictionary.dtos.WordDescriptionDto;
import com.education.vndictionary.dtos.WordDto;
import com.education.vndictionary.entities.Word;
import com.education.vndictionary.entities.WordDescription;

import java.util.Collections;
import java.util.List;

public class WordConverter {

    public static WordDto toWordDto(Word word) {
        WordDto wordDto = new WordDto();
        wordDto.setId(word.getId());
        wordDto.setKeyWork(word.getKeyWork());
        wordDto.setVoiceUrl(word.getVoiceUrl());
        wordDto.setTopicId(word.getTopicId());
        wordDto.setClassId(word.getClassId());
        wordDto.setSec(word.getSec());
        wordDto.setIsHidden(word.getIsHidden());
        return wordDto;
    }

    public static WordDto toWordDto(Word word, String topicName) {
        WordDto wordDto = toWordDto(word);
        wordDto.setTopicName(topicName);
        return wordDto;
    }

    public static List<WordDto> toWordDtos(List<Word> words) {
        return words.stream().map(WordConverter::toWordDto).toList();
    }

    public static List<WordDto> toWordDtos(String topicName, List<Word> words) {
        return words.stream().map(word -> {
            WordDto dto = toWordDto(word);
            dto.setTopicName(topicName);

            return dto;
        }).toList();
    }

    public static List<WordDescriptionDto> toWordDescriptionDtos(List<WordDescription> wordDescriptions) {
        if (wordDescriptions == null || wordDescriptions.isEmpty()) {
            return Collections.emptyList();
        }

        return wordDescriptions.stream().map(x -> {
            WordDescriptionDto dto = new WordDescriptionDto();
            dto.setId(x.getId());
            dto.setWordId(x.getWordId());
            dto.setWordType(x.getWordType());
            dto.setDescription(x.getDescription());
            dto.setSec(x.getSec());
            dto.setIsHidden(x.getIsHidden());
            return dto;
        }).toList();

    }

}
