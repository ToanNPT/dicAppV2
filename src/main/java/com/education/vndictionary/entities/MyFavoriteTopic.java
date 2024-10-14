package com.education.vndictionary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "my_favorite_topics")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyFavoriteTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "topic_id")
    private Integer topicId;

    @Column(name = "user_id")
    private Integer userId;
}
