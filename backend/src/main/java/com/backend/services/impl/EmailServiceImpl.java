package com.backend.services.impl;

import com.backend.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;

    public void sendResetPasswordEmail(String to, String token) {
        String resetLink = "http://localhost:3000/password-reset?token=" + token;

        String subject = "Resetowanie hasła";
        String body = "Kliknij w poniższy link, aby zresetować hasło: \n" + resetLink;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        try {
            emailSender.send(message);
        } catch (Exception e) {
            System.out.println("Nie udało sie wysłać maila poprzez Gmail");
            System.out.println("ResetLink: " + resetLink);
        }

    }

}