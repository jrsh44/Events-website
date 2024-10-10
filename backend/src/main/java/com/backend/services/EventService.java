package com.backend.services;

import com.backend.model.EventDto;
import com.backend.model.EventTableDto;

public interface EventService {

    EventDto[] getArchivedEvents(EventTableDto eventTableDto);

}
