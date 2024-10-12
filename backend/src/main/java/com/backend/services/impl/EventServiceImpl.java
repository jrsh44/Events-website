package com.backend.services.impl;

import com.backend.data.Event;
import com.backend.exceptions.AppException;
import com.backend.model.EventDto;
import com.backend.model.EventTableDto;
import com.backend.model.UserDto;
import com.backend.repositories.EventRepository;
import com.backend.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public EventDto[] getArchivedEvents(EventTableDto eventTableDto) {

        Optional<Event[]> eventsArchived = eventRepository.findAllByIsArchived();

        return new EventDto[0];
    }

    @Override
    public void deleteEvent(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new AppException("Event doesn't exist", HttpStatus.BAD_REQUEST));

        eventRepository.delete(event);
    }

    @Override
    public EventDto addEvent(EventDto eventDto) {

        return null;
    }

    @Override
    public EventDto updateEvent(Integer id, EventDto eventDto) {
        eventRepository.findById(id)
                .orElseThrow(() -> new AppException("Event doesn't exist", HttpStatus.BAD_REQUEST));

        Event updatedEvent = eventRepository.updateEventById(id, dtoToEntity(eventDto));
        return entityToDto(updatedEvent);
    }

    @Override
    public EventDto getEventById(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new AppException("Event doesn't exist", HttpStatus.BAD_REQUEST));

        return entityToDto(event);
    }

    private Event dtoToEntity(EventDto eventDto) {
        return Event.builder()
                .id(eventDto.getId())
                .title(eventDto.getTitle())
                .date(eventDto.getDate())
                .description(eventDto.getDescription())
                .isArchived(eventDto.getIsArchived())
                .type(eventDto.getType())
                .build();
    }

    private EventDto entityToDto(Event event) {
        if (event == null) {
            return null;
        } else {
            EventDto.EventDtoBuilder eventDto = EventDto.builder();
            if (event.getId() != null) {
                eventDto.id(event.getId().intValue());
            }

            eventDto.title(event.getTitle());
            eventDto.description(event.getDescription());
            eventDto.date(event.getDate());
            eventDto.type(event.getType());
            eventDto.isArchived(event.getIsArchived());

            return eventDto.build();
        }
    }
}
