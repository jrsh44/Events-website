package com.backend.auth;

import com.backend.exceptions.ExpiredTokenException;
import com.backend.exceptions.InvalidTokenFormatException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        Throwable cause = (Throwable) request.getAttribute("authException");
        Map<String, String> errorResponse = new HashMap<>();

        if (cause instanceof InvalidTokenFormatException) {
            errorResponse.put("code", "AUTH-02");
            errorResponse.put("message", "Niepoprawny token");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        } else if (cause instanceof ExpiredTokenException) {
            errorResponse.put("code", "AUTH-01");
            errorResponse.put("message", "Token stracił ważność");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        } else {
            errorResponse.put("code", "AUTH-00");
            errorResponse.put("message", "Błąd autentykacji");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        OBJECT_MAPPER.writeValue(response.getOutputStream(), errorResponse);
    }
}

