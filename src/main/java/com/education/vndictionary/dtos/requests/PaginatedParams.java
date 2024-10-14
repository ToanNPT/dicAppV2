package com.education.vndictionary.dtos.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaginatedParams {
    private Integer page = 1;

    private Integer size = 10;
}
