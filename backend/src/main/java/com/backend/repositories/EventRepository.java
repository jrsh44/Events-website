package com.backend.repositories;

import com.backend.data.Event;
import com.backend.enums.EventType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {

    void deleteById(String id);

    Optional<Event> findByTitle(String title);
    Optional<Event[]> findAllByType(EventType type);
    Optional<Event[]> findAllByIsArchived();


}

