package com.education.vndictionary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "topics")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Topic extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "topic_name")
    private String topicName;

    @Column(name = "class_id")
    private Integer classId;

    @Column(name = "thumbnail")
    private String thumbnail;
    @Column(name = "sec")
    private Integer sec;

    @Column(name = "is_hidden")
    private Boolean isHidden;
}
