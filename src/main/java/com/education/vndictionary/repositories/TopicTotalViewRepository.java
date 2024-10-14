package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.TopicTotalView;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface TopicTotalViewRepository extends JpaRepository<TopicTotalView, Integer> {

    @Modifying
    @Query("UPDATE TopicTotalView t SET t.viewCount = t.viewCount + 1 WHERE t.topicId = :topicId")
    void updateViewTopic(@Param("topicId") Integer topicId);
}
