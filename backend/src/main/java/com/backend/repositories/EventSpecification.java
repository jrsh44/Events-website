package com.backend.repositories;

import com.backend.data.Event;
import com.backend.enums.EventType;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class EventSpecification {

    public static Specification<Event> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> {
            if (title == null || title.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
        };
    }

    public static Specification<Event> hasDateRange(LocalDate dateFrom, LocalDate dateTo) {
        return (root, query, criteriaBuilder) -> {
            if (dateFrom == null && dateTo == null) {
                return null;
            }
            if (dateFrom != null && dateTo == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("date"), dateFrom);
            }
            if (dateFrom == null && dateTo != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("date"), dateTo);
            }
            return criteriaBuilder.between(root.get("date"), dateFrom, dateTo);
        };
    }

    public static Specification<Event> hasType(EventType type) {
        return (root, query, criteriaBuilder) -> {
            if (type == null) {
                return null;
            }
            return criteriaBuilder.equal(root.get("type"), type);
        };
    }

    public static Specification<Event> hasDateGreaterThanOrEqual(LocalDate date) {
        return (root, query, builder) -> builder.greaterThanOrEqualTo(root.get("date"), date);
    }

    public static Specification<Event> hasDateLessThan(LocalDate date) {
        return (root, query, builder) -> builder.lessThan(root.get("date"), date);
    }

}
