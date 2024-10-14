package com.education.vndictionary.repositories.impl;

import com.education.vndictionary.common.QueryUtils;
import com.education.vndictionary.dtos.WordDto;
import com.education.vndictionary.dtos.requests.WordSearchParams;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.data.annotation.Persistent;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WordRepositoryCustomImpl {

    @Persistent
    private EntityManager entityManager;

    public List<WordDto> searchWords(WordSearchParams params){
        StringBuilder sql = new StringBuilder();
        Map<String, Object> queryParams = new HashMap<>();

        sql.append("SELECT * ")
                .append(" FROM words w ")
                .append(" WHERE w.is_hidden = false ");

        if(params.getSearchText() != null && !params.getSearchText().isEmpty()){
            sql.append(" AND (w.key_work LIKE :searchText OR w.description LIKE :searchText) ");
            queryParams.put("searchText", "%" + params.getSearchText() + "%" );
        }

        if(params.getTopicId() != null){
            sql.append(" AND w.topic_id = :topicId ");
            queryParams.put("topicId", params.getTopicId());
        }

        sql.append(" ORDER BY w.key_work ASC ");

        sql.append(" , w.update_time ").append(params.getDateOrder());

        Query query = entityManager.createQuery(sql.toString());
        QueryUtils.setNamedParameter(query, queryParams);

        query.setFirstResult(params.getPage());
        query.setMaxResults(params.getPage());

        List<Object[]> resultList = query.getResultList();

        return null;
    }
}
