package com.backend.services;

import com.backend.model.EventDto;
import com.backend.model.EventTableDto;

public interface EventService {

    EventDto[] getArchivedEvents(EventTableDto eventTableDto);

    void deleteEvent(Integer eventId);
    EventDto addEvent(EventDto eventDto);
    EventDto updateEvent(Integer eventId, EventDto eventDto);
    EventDto getEventById(Integer eventId);

}
