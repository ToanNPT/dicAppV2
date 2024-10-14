package com.education.vndictionary.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class WordDto {

    private Integer id;

    private String keyWork;

    private Integer topicId;

    private String topicName;

    private Integer classId;

    private Integer sec;

    private Boolean isHidden;

    private String voiceUrl;

    private LocalDateTime updateTime;

    private String wordType;

    private List<WordDescriptionDto> descriptions = new ArrayList<>();
}
