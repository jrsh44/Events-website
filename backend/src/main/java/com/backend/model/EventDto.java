package com.backend.model;

import com.backend.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDto {

    private int id;
    private String title;
    private String description;
    private LocalDate date;
    private EventType type;
    private Boolean isArchived;
}
