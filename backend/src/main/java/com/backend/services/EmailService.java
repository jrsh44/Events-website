package com.backend.services;

public interface EmailService {
    void sendResetPasswordEmail(String email, String token);
}
