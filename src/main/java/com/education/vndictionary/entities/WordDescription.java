package com.education.vndictionary.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "word_descr")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WordDescription extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "word_id")
    private Integer wordId;

    @Column(name = "description")
    private String description;

    @Column(name = "word_type")
    private String wordType;

    @Column(name = "sec")
    private Integer sec;

    @Column(name = "is_hidden")
    private Boolean isHidden;
}
