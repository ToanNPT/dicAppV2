package com.education.vndictionary.common;

import jakarta.persistence.Query;

import java.util.Map;

public class QueryUtils {
    public static void setNamedParameter(Query query, Map<String, Object> params) {
        if (params == null || params.isEmpty()) {
            return;
        }
        for (Map.Entry<String, Object> entry : params.entrySet()) {
            query.setParameter(entry.getKey(), entry.getValue());
        }
    }

    public static void setPositionParameter(Query query, Object... params) {
        if (params == null || params.length == 0) {
            return;
        }
        for (int i = 0; i < params.length; i++) {
            query.setParameter(i + 1, params[i]);
        }
    }
}
