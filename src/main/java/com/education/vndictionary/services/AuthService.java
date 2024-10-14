package com.education.vndictionary.services;

import com.education.vndictionary.dtos.requests.LoginRequest;
import com.education.vndictionary.services.impl.UserDetailsImpl;
import jakarta.servlet.http.Cookie;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    UserDetailsImpl verifyByUsernamePassword(LoginRequest payload);

    UserDetailsImpl verifyByToken(String token);
}
