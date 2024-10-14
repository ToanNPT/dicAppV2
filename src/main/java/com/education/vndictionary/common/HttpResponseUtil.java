package com.education.vndictionary.common;

import com.education.vndictionary.dtos.BaseHttpResponse;
import com.education.vndictionary.dtos.PaginatedHttpResponse;
import org.springframework.http.HttpStatus;

import java.util.Collections;

public class HttpResponseUtil {

    public static BaseHttpResponse createSuccessResponse(Object data) {
        BaseHttpResponse response = new BaseHttpResponse();
        response.setMessage(Messages.SUCCESS);
        response.setData(data);
        response.setStatus(HttpStatus.OK.value());
        return response;
    }

    public static BaseHttpResponse createSuccessResponse() {
        BaseHttpResponse response = new BaseHttpResponse();
        response.setMessage(Messages.SUCCESS);
        response.setStatus(HttpStatus.OK.value());
        return response;
    }

    public static BaseHttpResponse createSuccessResponse(String message) {
        BaseHttpResponse response = new BaseHttpResponse();
        response.setMessage(message);
        response.setStatus(HttpStatus.OK.value());
        return response;
    }

    public static BaseHttpResponse createErrorResponse(String message, HttpStatus status) {
        BaseHttpResponse response = new BaseHttpResponse();
        response.setMessage(message);
        response.setStatus(status.value());
        return response;
    }

    public static PaginatedHttpResponse paginatedHttpResponse(Object data,  Integer curPage, Integer totalPage, Integer totalElements  ){
        PaginatedHttpResponse response = new PaginatedHttpResponse();
        response.setMessage(Messages.SUCCESS);
        response.setData(data);
        response.setStatus(HttpStatus.OK.value());
        response.setCurrentPage(curPage);
        response.setTotalPage(totalPage);
        response.setTotalElement(totalElements);
        return response;
    }

    public static PaginatedHttpResponse paginatedHttpResponse(){
        PaginatedHttpResponse response = new PaginatedHttpResponse();
        response.setMessage(Messages.SUCCESS);
        response.setData(Collections.emptyList());
        response.setStatus(HttpStatus.OK.value());
        response.setCurrentPage(0);
        response.setTotalPage(0);
        response.setTotalElement(0);
        return response;
    }
}
