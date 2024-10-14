package com.education.vndictionary.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "my_notebooks")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MyNoteBook extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "notebook_name")
    private String notebookName;

    @Column(name = "thumbnail")
    private String thumbnail;
}
