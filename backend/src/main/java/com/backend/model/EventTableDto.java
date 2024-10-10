package com.backend.model;

import com.backend.enums.EventType;
import org.springframework.data.domain.Sort;

import java.util.Date;

public record EventTableDto(Integer take, Integer skip, String sortBy, Sort.Direction sortDirection, Date dateFrom, Date dateTo, EventType type, String titleLike) {
}
