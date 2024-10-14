package com.education.vndictionary.dtos;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticatedUserDto {
    private Integer id;

    private String username;

    private String firstName;

    private String lastName;

    private Integer roleId;

    private String mail;

    private String loginProvider;

}
