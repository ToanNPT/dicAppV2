package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.MyNoteBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MyNoteBookRepository extends JpaRepository<MyNoteBook, Integer> {

}
