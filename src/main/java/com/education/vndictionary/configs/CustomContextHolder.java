package com.education.vndictionary.configs;

import org.hibernate.annotations.Cache;
import org.springframework.stereotype.Component;

@Component
public class CustomContextHolder {
    private static final ThreadLocal<CustomContext> context = new ThreadLocal<>();

    public static void setContext(CustomContext customContext) {
        context.set(customContext);
    }

    public static CustomContext getContext() {
        CustomContext customContext = context.get();
        if (customContext == null) {
            customContext = new CustomContext();
            context.set(customContext);
        }
        return customContext;
    }

    public static void clear() {
        context.remove();
    }

}
