package com.education.vndictionary.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WordDescriptionDto {
    private Integer id;

    private Integer wordId;

    private String wordType;

    private String description;

    private Integer sec;

    private Boolean isHidden;
}
