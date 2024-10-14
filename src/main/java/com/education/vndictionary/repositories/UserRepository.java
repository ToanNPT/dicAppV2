package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);
}
