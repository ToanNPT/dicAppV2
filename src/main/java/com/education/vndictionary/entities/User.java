package com.education.vndictionary.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends AbstractEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "mail")
    private String mail;

    @Column(name = "school_name")
    private String schoolName;

    @Column(name = "school_city")
    private String schoolCity;

    @Column(name = "school_ward")
    private String schoolWard;

    @Column(name = "school_address")
    private String schoolAddress;

    @Column(name = "locked_flag")
    private Boolean lockedFlag;

    @Column(name = "del_flag")
    private Boolean delFlag;

    @Column(name = "login_provider")
    private String loginProvider;
}
