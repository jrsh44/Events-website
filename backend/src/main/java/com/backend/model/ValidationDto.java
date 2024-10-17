package com.backend.model;

import lombok.Getter;

import java.util.Map;

@Getter
public class ValidationDto extends AppResponse {
    private final Map<String, String> validationErrors;

    public ValidationDto(String errorCode, String errorMessage, Map<String, String> validationErrors ) {
        super(errorCode, errorMessage);
        this.validationErrors = validationErrors;
    }
}
