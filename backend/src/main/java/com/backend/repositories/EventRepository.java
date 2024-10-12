package com.backend.repositories;

import com.backend.data.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Optional<Event> findById(Integer id);

    void deleteById(Integer id);

}

