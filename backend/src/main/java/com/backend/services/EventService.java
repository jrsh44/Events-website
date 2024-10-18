package com.backend.services;

import com.backend.model.EventCreateDto;
import com.backend.model.EventDto;
import com.backend.model.EventFiltersDto;
import com.backend.model.SearchResultDto;

public interface EventService {

    void deleteEvent(Integer eventId);

    EventDto addEvent(EventCreateDto eventDto);

    EventDto updateEvent(Integer eventId, EventDto eventDto);

    EventDto getEvent(Integer eventId);

    SearchResultDto<EventDto> searchEvents(EventFiltersDto eventSearchDto);

    SearchResultDto<EventDto> searchArchivedEvents(EventFiltersDto eventSearchDto);
}
