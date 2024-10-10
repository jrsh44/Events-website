package com.backend.model;

public record SignUpDto (String firstName, String lastName, String email, char[] password) { }
