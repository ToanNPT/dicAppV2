package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
