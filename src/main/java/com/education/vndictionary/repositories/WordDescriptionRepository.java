package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.WordDescription;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WordDescriptionRepository extends JpaRepository<WordDescription, Integer> {
    List<WordDescription> findByWordIdAndIsHiddenOrderBySec(Integer wordId, Boolean isHidden);

    @Query("SELECT MAX(wd.sec) FROM WordDescription wd WHERE wd.wordId = ?1")
    Integer getMaxSecByWordId(Integer wordId);

    @Modifying
    @Query("UPDATE WordDescription wd SET wd.isHidden = true WHERE wd.wordId = :wordId")
    void unActiveWordDescriptionByWordId(@Param("wordId") Integer wordId);
}
