package com.backend.model;

import com.backend.enums.EventType;

import java.time.LocalDate;


public record EventCreateDto(
        String title,
        String description,
        LocalDate date,
        EventType type
) {
}
