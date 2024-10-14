package com.education.vndictionary.mybatisQuery;

import com.education.vndictionary.dtos.WordDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WordCustomQueryMapper {
    List<WordDto> searchWords(String keyWord, Integer topicId, String dateOrder, Integer limit, Integer offset);
    Integer countSearchWords(String keyWord, Integer topicId);
}
