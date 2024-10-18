package com.backend.services.impl;

import com.backend.data.Event;
import com.backend.exceptions.UnknownEventException;
import com.backend.model.EventCreateDto;
import com.backend.model.EventDto;
import com.backend.model.EventFiltersDto;
import com.backend.model.SearchResultDto;
import com.backend.repositories.EventRepository;
import com.backend.repositories.EventSpecification;
import com.backend.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public void deleteEvent(Integer id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(UnknownEventException::new);

        eventRepository.delete(event);
    }

    @Override
    public EventDto addEvent(EventCreateDto eventCreateDto) {

        Event event = Event.builder()
                .title(eventCreateDto.title())
                .description(eventCreateDto.description())
                .type(eventCreateDto.type())
                .date(eventCreateDto.date())
                .build();

        Event eventSaved = eventRepository.save(event);

        return entityToDto(eventSaved);
    }

    @Override
    public EventDto updateEvent(Integer id, EventDto eventDto) {
        Event event = eventRepository.findById(id)
                .orElseThrow(UnknownEventException::new);

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
                .orElseThrow(UnknownEventException::new);

        return entityToDto(event);
    }

    @Override
    public SearchResultDto<EventDto> searchEvents(EventFiltersDto eventSearchDto) {
        LocalDate today = LocalDate.now();

        Specification<Event> spec = Specification
                .where(EventSpecification.hasTitle(eventSearchDto.getTitle()))
                .and(EventSpecification.hasDateRange(eventSearchDto.getDateFrom(), eventSearchDto.getDateTo()))
                .and(EventSpecification.hasType(eventSearchDto.getType()))
                .and(EventSpecification.hasDateGreaterThanOrEqual(today));

        return getEventDtos(eventSearchDto, spec);
    }

    @Override
    public SearchResultDto<EventDto> searchArchivedEvents(EventFiltersDto eventSearchDto) {
        LocalDate today = LocalDate.now();
        Specification<Event> spec = Specification
                .where(EventSpecification.hasTitle(eventSearchDto.getTitle()))
                .and(EventSpecification.hasDateRange(eventSearchDto.getDateFrom(), eventSearchDto.getDateTo()))
                .and(EventSpecification.hasType(eventSearchDto.getType()))
                .and(EventSpecification.hasDateLessThan(today));

        return getEventDtos(eventSearchDto, spec);
    }


    private SearchResultDto<EventDto> getEventDtos(EventFiltersDto eventSearchDto, Specification<Event> spec) {
        Sort.Direction direction = eventSearchDto.getSortDirection().equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

        Sort sort = Sort.by(direction, eventSearchDto.getSortBy());

        PageRequest pageable = PageRequest.of(eventSearchDto.getPage(), eventSearchDto.getTake(), sort);

        Page<Event> resultPage = eventRepository.findAll(spec, pageable);

        List<EventDto> eventDtos = resultPage.getContent().stream().map(this::entityToDto).toList();
        long totalRecords = resultPage.getTotalElements();

        return new SearchResultDto<>(eventDtos, totalRecords);
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

            return eventDto.build();
        }
    }
}
