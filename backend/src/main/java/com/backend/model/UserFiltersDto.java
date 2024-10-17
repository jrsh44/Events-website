package com.backend.model;

import com.backend.enums.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserFiltersDto {

    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private int page = 0;
    private int take = 10;
    private String sortBy = "date";
    private String sortDirection = "asc";
}
