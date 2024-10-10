package com.backend.controller;

import com.backend.model.EventDto;
import com.backend.model.EventTableDto;
import com.backend.model.UserDto;
import com.backend.services.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("event")
@RestController
public class EventController {

    private final EventService eventService;

    @GetMapping("/archived")
    public ResponseEntity<EventDto[]> getArchived(@RequestBody @Valid EventTableDto eventTableDto) {
        EventDto[] eventsArchived = eventService.getArchivedEvents(eventTableDto);
        return ResponseEntity.ok(eventsArchived);
    }
}
