package com.education.vndictionary.common;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class CommonUtils {
    public static void requireAdminRole() {

    }

    public static LocalDateTime utcTime() {
        ZoneId zoneId = ZoneId.of(ZoneOffset.UTC.getId());
        return LocalDateTime.now(zoneId);
    }

    public static String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf(".") == -1) {
            return ""; // Return an empty string if there's no extension
        }
        return filename.substring(filename.lastIndexOf(".") + 1);
    }


    public static String formatDateTime(LocalDateTime dateTime, String pattern) {
        if (dateTime == null) {
            return null;
        }
        return DateTimeFormatter.ofPattern(pattern).format(dateTime);
    }
}
