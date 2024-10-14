package com.education.vndictionary.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AppErrorException extends RuntimeException {
    private  Integer status;
    private  String message;

    public AppErrorException(Integer status, String message) {
        this.status = status;
        this.message = message;
    }

    public static AppErrorException notFoundException(String message) {
        return new AppErrorException(HttpStatus.NOT_FOUND.value(), message);
    }

    public static AppErrorException badRequestException(String message) {
        return new AppErrorException(HttpStatus.BAD_REQUEST.value(), message);
    }

}
