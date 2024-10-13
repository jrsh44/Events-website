package com.backend.controller;

import com.backend.model.EventCreateDto;
import com.backend.model.EventDto;
import com.backend.model.EventSearchDto;
import com.backend.services.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("api/event")
@RestController
public class EventController {

    private final EventService eventService;

    @PreAuthorize("hasAuthority('event:read')")
    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEvent(@PathVariable Integer id) {
        EventDto event = eventService.getEvent(id);
        return ResponseEntity.ok(event);
    }

    @PreAuthorize("hasAuthority('event:modify')")
    @PostMapping
    public ResponseEntity<EventDto> addEvent(@RequestBody @Valid EventCreateDto eventDto) {
        EventDto event = eventService.addEvent(eventDto);
        return ResponseEntity.ok(event);
    }

    @PreAuthorize("hasAuthority('event:modify')")
    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@RequestBody @Valid EventDto eventDto, @PathVariable Integer id) {
        EventDto event = eventService.updateEvent(id, eventDto);
        return ResponseEntity.ok(event);
    }

    @PreAuthorize("hasAuthority('event:modify')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<EventDto>> searchEvents(@RequestBody EventSearchDto eventSearchDto) {
        List<EventDto> events = eventService.searchEvents(eventSearchDto);
        return ResponseEntity.ok(events);
    }

}
