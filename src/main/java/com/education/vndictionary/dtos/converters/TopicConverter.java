package com.education.vndictionary.dtos.converters;

import com.education.vndictionary.dtos.TopicDto;
import com.education.vndictionary.entities.Topic;

import java.util.Collections;
import java.util.List;

public class TopicConverter {

    public static TopicDto toTopicDto(Topic topic) {
        if (topic == null) {
            return null;
        }

        TopicDto dto = new TopicDto();
        dto.setId(topic.getId());
        dto.setTopicName(topic.getTopicName());
        dto.setThumbnail(topic.getThumbnail());
        dto.setSec(topic.getSec());
        dto.setIsHidden(topic.getIsHidden());
//        dto.setUpdateTime(topics.getUpdateTime());
        return dto;

    }

    public static List<TopicDto> toTopicDtos(List<Topic> topics) {
        if (topics == null || topics.isEmpty()) {
            return Collections.emptyList();
        }
        return topics.stream().map(TopicConverter::toTopicDto).toList();
    }
}
