package com.backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignUpDto(
        @NotBlank(message = "Imię jest wymagane.")
        @Size(min = 3, message = "Imię musi mieć co najmniej 3 znaki.")
        String firstName,

        @NotBlank(message = "Nazwisko jest wymagane.")
        @Size(min = 3, message = "Nazwisko musi mieć co najmniej 3 znaki.")
        String lastName,

        @NotBlank(message = "Email jest wymagany.")
        @Email(message = "Email musi być w formacie: example@domain.com")
        String email,

        @NotBlank(message = "Hasło jest wymagane.")
        @Size(min = 8, message = "Hasło musi mieć co najmniej 8 znaków.")
        String password
) {
}
