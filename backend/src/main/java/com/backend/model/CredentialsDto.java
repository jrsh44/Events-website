package com.backend.model;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record CredentialsDto (
        @NotBlank(message = "Email jest wymagany.")
        @Email(message = "Email musi być w formacie: example@domain.com")
        String email,

        @NotBlank(message = "Hasło jest wymagane.")
        @Size(min = 8, message = "Hasło musi mieć co najmniej 8 znaków.")
        String password
) { }