package com.backend.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RestartCredentialsDto (

        @NotBlank(message = "Email jest wymagany.")
        @Email(message = "Email musi być w formacie: example@domain.com")
        String email

){}
