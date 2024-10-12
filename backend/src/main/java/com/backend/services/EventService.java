package com.backend.services;

import com.backend.model.EventCreateDto;
import com.backend.model.EventDto;

public interface EventService {

    void deleteEvent(Integer eventId);

    EventDto addEvent(EventCreateDto eventDto);

    EventDto updateEvent(Integer eventId, EventDto eventDto);

    EventDto getEvent(Integer eventId);

}
