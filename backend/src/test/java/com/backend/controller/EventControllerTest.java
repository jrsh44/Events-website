package com.backend.controller;

import com.backend.enums.EventType;
import com.backend.model.EventCreateDto;
import com.backend.model.EventDto;
import com.backend.services.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class EventControllerTest {

    @InjectMocks
    private EventController eventController;

    @Mock
    private EventService eventService;

    private EventDto eventDto;
    private EventCreateDto eventCreateDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        eventDto = EventDto.builder()
                .id(1)
                .title("Test Event")
                .description("This is a test event.")
                .date(LocalDate.of(2004, 2, 25))
                .type(EventType.OTHER)
                .build();

        eventCreateDto = new EventCreateDto("Test Event", "This is a test event.", LocalDate.of(2004, 2, 25), EventType.OTHER);
    }

    @Test
    void addEvent_ShouldReturnCreatedEvent() {
        when(eventService.addEvent(any(EventCreateDto.class))).thenReturn(eventDto);

        ResponseEntity<EventDto> response = eventController.addEvent(eventCreateDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(eventDto, response.getBody());
        verify(eventService, times(1)).addEvent(any(EventCreateDto.class));
    }

    @Test
    void updateEvent_ShouldReturnUpdatedEvent() {
        when(eventService.updateEvent(eq(1), any(EventDto.class))).thenReturn(eventDto);

        ResponseEntity<EventDto> response = eventController.updateEvent(eventDto, 1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(eventDto, response.getBody());
        verify(eventService, times(1)).updateEvent(eq(1), any(EventDto.class));
    }

    @Test
    void getEvent_ShouldReturnEvent() {
        when(eventService.getEvent(1)).thenReturn(eventDto);

        ResponseEntity<EventDto> response = eventController.getEvent(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(eventDto, response.getBody());
        verify(eventService, times(1)).getEvent(1);
    }

    @Test
    void deleteEvent_ShouldReturnNoContent() {
        ResponseEntity<Void> response = eventController.deleteEvent(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(eventService, times(1)).deleteEvent(1);
    }
}
