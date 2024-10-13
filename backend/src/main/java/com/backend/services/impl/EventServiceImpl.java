package com.backend.services.impl;

import com.backend.data.Event;
import com.backend.enums.EventType;
import com.backend.exceptions.AppException;
import com.backend.model.EventCreateDto;
import com.backend.model.EventDto;
import com.backend.model.EventSearchDto;
import com.backend.repositories.EventRepository;
import com.backend.repositories.EventSpecification;
import com.backend.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public void deleteEvent(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new AppException("Event doesn't exist", HttpStatus.BAD_REQUEST));

        eventRepository.delete(event);
    }

    @Override
    public EventDto addEvent(EventCreateDto eventCreateDto) {

        Event event = Event.builder()
                .title(eventCreateDto.title())
                .description(eventCreateDto.description())
                .type(eventCreateDto.type())
                .date(eventCreateDto.date())
                .isArchived(false)
                .build();

        Event eventSaved = eventRepository.save(event);

        return entityToDto(eventSaved);
    }

    @Override
    public EventDto updateEvent(Integer id, EventDto eventDto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new AppException("Event doesn't exist", HttpStatus.BAD_REQUEST));

        event.setTitle(eventDto.getTitle());
        event.setDescription(eventDto.getDescription());
        event.setDate(eventDto.getDate());
        event.setType(eventDto.getType());

        Event savedEvent = eventRepository.save(event);

        return entityToDto(savedEvent);
    }

    @Override
    public EventDto getEvent(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new AppException("Event doesn't exist", HttpStatus.BAD_REQUEST));

        return entityToDto(event);
    }

    @Override
    public List<EventDto> searchEvents(EventSearchDto eventSearchDto) {
        Specification<Event> spec = Specification
                .where(EventSpecification.hasTitle(eventSearchDto.getTitle()))
                .and(EventSpecification.hasDateRange(eventSearchDto.getDateFrom(), eventSearchDto.getDateTo()))
                .and(EventSpecification.hasType(eventSearchDto.getType()))
                .and(EventSpecification.isArchived(eventSearchDto.getIsArchived()));

        PageRequest pageable = PageRequest.of(eventSearchDto.getPage(), eventSearchDto.getTake());

        Page<Event> resultPage = eventRepository.findAll(spec, pageable);

        return resultPage.getContent().stream().map(this::entityToDto).toList();
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
