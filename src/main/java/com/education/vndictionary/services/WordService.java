package com.education.vndictionary.services;

import com.education.vndictionary.dtos.PaginatedHttpResponse;
import com.education.vndictionary.dtos.WordDto;
import com.education.vndictionary.dtos.requests.WordSearchParams;

public interface WordService {
    WordDto getWordById(Integer wordId, Boolean isIncreaseView);

    PaginatedHttpResponse getWordsByTopicId(Integer topicId, Boolean isIncreaseView, Integer limit, Integer page);

    PaginatedHttpResponse getAllWords(Integer limit, Integer page);

    PaginatedHttpResponse searchWords(WordSearchParams params);

    WordDto createWord(WordDto wordDto);

    void updateWord(Integer id, WordDto wordDto);

    void deleteWord(Integer wordId);
}
