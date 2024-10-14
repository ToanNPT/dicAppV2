package com.education.vndictionary.services.impl;

import com.education.vndictionary.common.Jwt;
import com.education.vndictionary.dtos.requests.LoginRequest;
import com.education.vndictionary.entities.Role;
import com.education.vndictionary.entities.User;
import com.education.vndictionary.exceptions.AppErrorException;
import com.education.vndictionary.repositories.RoleRepository;
import com.education.vndictionary.repositories.UserRepository;
import com.education.vndictionary.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final Jwt jwtUtils;

    @Override
    public UserDetailsImpl verifyByUsernamePassword(LoginRequest payload) {
        var username = payload.getUsername();
        var password = payload.getPassword();
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        var cookie1 = jwtUtils.generateJwtToken(username);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        return userDetails;
    }

    @Override
    public UserDetailsImpl verifyByToken(String token) {
        jwtUtils.validateJwtToken(token);
        var username = jwtUtils.getUserNameFromJwtToken(token);

        User user = this.userRepository.findByUsername(username);
        if (user == null) {
            throw new AppErrorException(401, "User not found");
        }
        Role role = this.roleRepository.findById(user.getRoleId()).orElse(null);
        return UserDetailsImpl.build(user, role);
    }
}
