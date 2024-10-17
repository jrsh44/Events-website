package com.backend.init;

import com.backend.data.Event;
import com.backend.enums.EventType;
import com.backend.repositories.EventRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class EventInitializer {

    private final EventRepository eventRepository;

    public EventInitializer(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Bean
    public CommandLineRunner initializeEvents() {
        return args -> {
            long eventCount = eventRepository.count();
            if (eventCount < 40) {
                List<Event> events = new ArrayList<>();
                Random random = new Random();

                for (int i = 1; i <= 40 - eventCount; i++) {
                    Event event = Event.builder()
                            .title(generateRandomTitle((int) eventCount + i))
                            .description(generateRandomDescription())
                            .date(generateRandomDate())
                            .type(generateRandomEventType())
                            .isArchived(random.nextBoolean())
                            .build();

                    events.add(event);
                }

                eventRepository.saveAll(events);
                System.out.println((40 - eventCount) + " random events have been initialized!");
            } else {
                System.out.println("There are already 40 or more events, no need to initialize more.");
            }
        };
    }

    private String generateRandomTitle(int i) {
        return "Event " + i;
    }

    private String generateRandomDescription() {
        String[] descriptions = {
                "Amazing event happening soon.",
                "Join us for an exciting experience!",
                "Don't miss out on this opportunity.",
                "A life-changing event you won't forget.",
                "A great chance to network and learn."
        };
        return descriptions[new Random().nextInt(descriptions.length)];
    }

    private LocalDate generateRandomDate() {
        int year = 2024;
        int month = new Random().nextInt(12) + 1;
        int day = new Random().nextInt(28) + 1;
        return LocalDate.of(year, month, day);
    }

    private EventType generateRandomEventType() {
        EventType[] eventTypes = EventType.values();
        return eventTypes[new Random().nextInt(eventTypes.length)];
    }
}
