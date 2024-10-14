package com.education.vndictionary.mybatisQuery;

import com.education.vndictionary.dtos.TopicDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
@Mapper
public interface TopicCustomQueryMapper {
    List<TopicDto> getPopularTopics(@Param("limit") Integer limit);

    List<TopicDto> getTopicsWithPaging(@Param("limit") Integer limit, @Param("offset") Integer offset);
    List<TopicDto> getAllTopicIdAndName();

    Integer countTotalTopic();

    List<TopicDto> searchTopicByName(@Param("name") String name, @Param("limit") Integer limit, @Param("offset") Integer offset);
}
