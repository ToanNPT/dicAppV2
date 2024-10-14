package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.MyNoteBookWord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MyNoteBookWordRepository extends JpaRepository<MyNoteBookWord, Integer> {
}
