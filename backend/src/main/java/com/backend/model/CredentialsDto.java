package com.backend.model;


public record CredentialsDto (
        String email,
        String password
) { }