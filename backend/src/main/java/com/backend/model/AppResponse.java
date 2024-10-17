package com.backend.model;

import lombok.Getter;

@Getter
public class AppResponse {
    String code;
    String message;

    public AppResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
