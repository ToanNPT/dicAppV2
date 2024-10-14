package com.education.vndictionary.dtos;

import lombok.Data;

@Data
public class BaseHttpResponse {

    private String message;

    private int status;

    private Object data;

}
