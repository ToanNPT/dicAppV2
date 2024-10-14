package com.education.vndictionary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "my_notebook_words")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyNoteBookWord extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "notebook_id")
    private Integer notebookId;

    @Column(name = "word_id")
    private Integer wordId;

    @Column(name = "sec")
    private Integer sec;
}
