package com.backend.model;

import com.backend.enums.EventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventDto {

    private int id;
    private String title;
    private String description;
    private Date date;
    private EventType type;
    private Boolean isArchived;
}
