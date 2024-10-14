package com.education.vndictionary.services;

import com.education.vndictionary.dtos.PaginatedHttpResponse;
import com.education.vndictionary.dtos.TopicDto;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TopicService {
    TopicDto getTopicById(Integer topicId);

    List<TopicDto> searchTopics(String keyword, Integer limit, Integer offset);

    List<TopicDto> getAllTopicIdAndName();

    void createTopic(TopicDto topicDto);

    void updateTopic(Integer topicId, TopicDto topicDto);

    void deleteTopic(Integer topicId);

    List<TopicDto> viewPopularTopics(Integer limit);

    PaginatedHttpResponse viewAllTopicWithPaging(Integer page, Integer size);

    @Transactional(value = Transactional.TxType.REQUIRES_NEW)
    void increaseViewTopic(Integer topicId);
}
