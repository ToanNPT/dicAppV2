package com.education.vndictionary.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TopicDto implements Serializable {

    private Integer id;

    private String topicName;

    private Integer classId;

    private String thumbnail;

    private Integer sec;

    private Boolean isHidden;

    private Long viewCount;

    private LocalDateTime updateTime;
}
