package com.backend.model;

import com.backend.enums.Role;

public record UserCreateDto(
        String firstName,
        String lastName,
        String email,
        char[] password,
        Role role
) {
}
