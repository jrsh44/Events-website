package com.backend.services.impl;

import com.backend.data.Event;
import com.backend.model.EventDto;
import com.backend.model.EventTableDto;
import com.backend.repositories.EventRepository;
import com.backend.services.EventService;
import lombok.RequiredArgsConstructor;
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
}
