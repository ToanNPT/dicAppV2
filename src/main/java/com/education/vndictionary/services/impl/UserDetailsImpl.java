package com.education.vndictionary.services.impl;

import com.education.vndictionary.entities.Role;
import com.education.vndictionary.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private Integer id;

    private Integer roleId;

    private String roleName;

    private String username;

    @JsonIgnore
    private String password;

    private String loginProvider;

    private String firstName;

    private String lastName;


    @Setter
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Integer id, Integer roleId, String roleName, String username, String password, String loginProvider, String firstName, String lastName) {
        this.id = id;
        this.roleId = roleId;
        this.roleName = roleName;
        this.username = username;
        this.password = password;
        this.loginProvider = loginProvider;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public UserDetailsImpl(User user, Role role) {
        this.id = user.getId();
        this.roleId = role.getId();
        this.roleName = role.getRoleName();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.loginProvider = user.getLoginProvider();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();

        this.authorities = List.of(new SimpleGrantedAuthority(role.getRoleName()));

    }

    public static UserDetailsImpl build(User user, Role role) {
        return new UserDetailsImpl(user, role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }


    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }


    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
