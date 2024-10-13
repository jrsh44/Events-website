package com.backend.model;

import java.util.Map;

public record ValidationDto(
        Map<String, String> validationErrors
) {
}
