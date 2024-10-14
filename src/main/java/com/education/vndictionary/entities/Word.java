package com.education.vndictionary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "words")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Word extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "key_work")
    private String keyWork;

    @Column(name = "voice_url")
    private String voiceUrl;

    @Column(name = "topic_id")
    private Integer topicId;

    @Column(name = "class_id")
    private Integer classId;

    @Column(name = "sec")
    private Integer sec;

    @Column(name = "is_hidden")
    private Boolean isHidden;

}
