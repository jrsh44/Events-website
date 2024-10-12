package com.backend.model;

import com.backend.enums.EventType;
import org.springframework.data.domain.Sort;

import java.time.LocalDate;

public record EventTableDto(
        Integer take,
        Integer skip,
        String sortBy,
        Sort.Direction sortDirection,
        LocalDate dateFrom,
        LocalDate dateTo,
        EventType type,
        String titleLike
) {
}
