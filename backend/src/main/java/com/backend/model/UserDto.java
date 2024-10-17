package com.backend.model;

import com.backend.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private int id;
    private String token;

    @NotBlank(message = "Imię jest wymagane.")
    @Size(min = 3, message = "Imię musi mieć co najmniej 3 znaki.")
    private String firstName;

    @NotBlank(message = "Nazwisko jest wymagane.")
    @Size(min = 3, message = "Nazwisko musi mieć co najmniej 3 znaki.")
    private String lastName;

    @NotBlank(message = "Email jest wymagany.")
    @Email(message = "Email musi być w formacie: example@domain.com")
    private String email;

    @NotNull(message = "Rola jest wymagana.")
    private Role role;

}
