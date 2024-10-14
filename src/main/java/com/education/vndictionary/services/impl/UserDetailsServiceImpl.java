package com.education.vndictionary.services.impl;

import com.education.vndictionary.entities.Role;
import com.education.vndictionary.repositories.RoleRepository;
import com.education.vndictionary.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var dbUser = this.userRepository.findByUsername(username);
        if (dbUser == null) {
            throw new UsernameNotFoundException("User not found");
        }

        Role userRole = this.roleRepository.findById(dbUser.getRoleId()).orElseThrow(() -> new UsernameNotFoundException("Role not found"));

        return UserDetailsImpl.build(dbUser, userRole);
    }
}
