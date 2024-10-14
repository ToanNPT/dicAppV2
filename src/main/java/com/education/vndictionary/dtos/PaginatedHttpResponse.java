package com.education.vndictionary.dtos;

import lombok.Data;

@Data
public class PaginatedHttpResponse extends BaseHttpResponse {

    private int totalPage;

    private int currentPage;

    private int totalElement;

}
