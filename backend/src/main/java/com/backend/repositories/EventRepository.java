package com.backend.repositories;

import com.backend.data.Event;
import com.backend.enums.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {

    void deleteById(Integer id);
    Event updateEventById(Integer id, Event event);

    Optional<Event> findById(Integer id);
    Optional<Event[]> findAllByIsArchived();


}

