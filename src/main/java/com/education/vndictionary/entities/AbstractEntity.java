package com.education.vndictionary.entities;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.time.LocalDateTime;


@Getter
@Setter
@MappedSuperclass
public abstract class AbstractEntity implements Serializable {

    @Column(name = "reg_time")
    @CreationTimestamp
    private LocalDateTime regTime;

    @Column(name = "reg_user")
    private Integer regUser;

    @Column(name = "update_time")
    @UpdateTimestamp
    private LocalDateTime updateTime;

    @Column(name = "update_user")
    private Integer updateUser;

}
