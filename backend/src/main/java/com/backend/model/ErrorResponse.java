package com.backend.model;

import lombok.Getter;

@Getter
public class ErrorResponse {
    String errorCode;
    String errorMessage;

    public ErrorResponse(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
