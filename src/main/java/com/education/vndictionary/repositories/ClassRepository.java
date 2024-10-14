package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.Class;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ClassRepository extends JpaRepository<Class, Integer> {

}
