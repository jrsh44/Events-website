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

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable Integer id) {
        EventDto event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public ResponseEntity<EventDto> addEvent(@RequestBody @Valid EventDto eventDto) {
        EventDto event = eventService.addEvent(eventDto);
        return ResponseEntity.ok(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@RequestBody @Valid EventDto eventDto, @PathVariable Integer id) {
        EventDto event = eventService.updateEvent(id, eventDto);
        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>  deleteEvent(@PathVariable Integer id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/archived")
    public ResponseEntity<EventDto[]> getEventArchived(@RequestBody @Valid EventTableDto eventTableDto) {
        EventDto[] eventsArchived = eventService.getArchivedEvents(eventTableDto);
        return ResponseEntity.ok(eventsArchived);
    }


}
