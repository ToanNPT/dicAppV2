package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface TopicRepository extends JpaRepository<Topic, Integer> {

    Topic findByIdAndIsHidden(Integer id, Boolean isHidden);

    List<Topic> findByIsHiddenOrderByUpdateTimeDesc(Boolean isHidden);

    Topic findByTopicNameAndIsHidden(String topicName, Boolean isHidden);

    List<Topic> findByTopicNameContainingAndIsHidden(String topicName, Boolean isHidden);

    @Query("SELECT MAX(t.sec) FROM Topic t WHERE t.isHidden = false")
    Integer getMaxSec();


}
