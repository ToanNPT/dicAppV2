package com.education.vndictionary.configs;

import com.education.vndictionary.services.impl.UserDetailsImpl;
import lombok.Data;

@Data
public class CustomContext {
    private UserDetailsImpl logonAccount;

    private String cookie;

    private boolean isAuthenticated;
}
