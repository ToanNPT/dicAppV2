package com.education.vndictionary.dtos.requests;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchParams extends PaginatedParams {
    private String searchText = "";

    private String dateOrder = "desc";

}
