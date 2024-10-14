package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.Word;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface WordRepository extends JpaRepository<Word, Integer> {

    @Query(value = "SELECT w.* FROM words w WHERE w.topic_id = :topicId AND w.is_hidden = :isHidden ORDER BY w.update_time DESC LIMIT :limit OFFSET :pOffset", nativeQuery = true)
    List<Word> findAllByTopicIdAndIsHidden(@Param("topicId") Integer topicId, @Param("isHidden") Boolean isHidden, @Param("limit") Integer limit, @Param("pOffset") Integer pOffset);

    @Query(value = "SELECT COUNT(w.id) FROM words w WHERE w.topic_id = :topicId AND w.is_hidden = :isHidden ", nativeQuery = true)
    Integer countByTopicIdAndIsHidden(@Param("topicId") Integer topicId, @Param("isHidden") Boolean isHidden);

    Word findByIdAndIsHidden(Integer id, boolean isHidden);

    @Query("SELECT MAX(sec) FROM Word WHERE topicId = ?1 AND isHidden = false")
    Integer getMaxSec(Integer topicId);

    @Query(value = "SELECT w.* FROM words w WHERE w.is_hidden = :isHidden ORDER BY w.update_time DESC LIMIT :limit OFFSET :pOffset", nativeQuery = true)
    List<Word> findAllByIsHidden(@Param("isHidden") Boolean isHidden, @Param("limit") Integer limit, @Param("pOffset") Integer pOffset);

    @Query(value = "SELECT COUNT(w.id) FROM words w WHERE w.is_hidden = :isHidden ", nativeQuery = true)
    Integer countAllActiveWords( @Param("isHidden") Boolean isHidden);


}
