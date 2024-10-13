package com.backend.model;

import com.backend.enums.EventType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;


public record EventCreateDto(
        @NotBlank(message = "Tytuł jest wymagany.")
        @Size(max = 100, message = "Tytuł nie może przekraczać 100 znaków.")
        String title,

        @NotBlank(message = "Opis jest wymagany.")
        @Size(max = 2000, message = "Opis nie może przekraczać 2000 znaków.")
        String description,

        @NotNull(message = "Data jest wymagana.")
        LocalDate date,

        @NotNull(message = "Typ wydarzenia jest wymagany.")
        EventType type
) {
}
