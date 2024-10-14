package com.education.vndictionary.repositories;

import com.education.vndictionary.entities.MyFavoriteTopic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MyFavoriteTopicRepository extends JpaRepository<MyFavoriteTopic, Integer> {

}
