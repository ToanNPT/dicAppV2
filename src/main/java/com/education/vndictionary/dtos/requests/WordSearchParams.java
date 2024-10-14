package com.education.vndictionary.dtos.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WordSearchParams extends SearchParams {
    private Integer topicId;
}
