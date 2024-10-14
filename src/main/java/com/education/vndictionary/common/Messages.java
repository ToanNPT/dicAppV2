package com.education.vndictionary.common;

import java.text.MessageFormat;

public class Messages {
    public static final String SUCCESS = "Successfully retrieved data";
    public static final String SUCCESS_UPSERT_OPERATION = "Successfully updated data";

    public static final String FAILED = "Failed to retrieve data";

    public static final String NOT_FOUND_TEMPLATE = "Xin lỗi, {0} chưa được cập nhật";

    public static final String INVALID_FIELDS = "{0} không hợp lệ";
    public static final String NOT_BLANK_FIELDS = "{0} không được để trống";

    public static final String INVALID_REQUEST = "Invalid request";

    public static final String UNAUTHORIZED = "Unauthorized";

    public static final String FORBIDDEN = "Forbidden";

    public static final String INTERNAL_SERVER_ERROR = "Đã xảy ra lỗi trên máy chủ, vui lòng thử lại sau";

    public static final String BAD_REQUEST = "Bad request";

    public static final String METHOD_NOT_ALLOWED = "Method not allowed";

    public static final String CONFLICT = "Conflict";

    public static final String UNSUPPORTED_MEDIA_TYPE = "Unsupported media type";

    public static final String TOO_MANY_REQUESTS = "Too many requests";

    public static final String SERVICE_UNAVAILABLE = "Service";

    public static final String GATEWAY_TIMEOUT = "Gateway timeout";

    public static String formatErrorMsg(String message, Object... args) {
        return MessageFormat.format(message, args);
    }
}
