package com.backend.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PasswordUpdateDto(

        @NotBlank(message = "Hasło jest wymagane.")
        @Size(min = 8, message = "Hasło musi mieć co najmniej 8 znaków.")
        String password

){}
