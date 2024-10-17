package com.backend.exceptions;


import com.backend.model.AppResponse;
import com.backend.model.ValidationDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationDto> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ValidationDto validationDto = new ValidationDto("ES-11", "Napotkano błędy w trakcie walidacji danych", errors);
        return new ResponseEntity<>(validationDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailTakenException.class)
    public ResponseEntity<AppResponse> handleEmailTakenException() {
        AppResponse appResponse = new AppResponse("ES-03", "Email jest już zajęty");
        return new ResponseEntity<>(appResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<AppResponse> handleLoginException() {
        AppResponse appResponse = new AppResponse("ES-04", "Niepoprawne dane logowania");
        return new ResponseEntity<>(appResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UnknownUserException.class)
    public ResponseEntity<AppResponse> handleUnknownUserException() {
        AppResponse appResponse = new AppResponse("ES-05", "Nie odnaleziono takiego użytkownika");
        return new ResponseEntity<>(appResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnknownEventException.class)
    public ResponseEntity<AppResponse> handleUnknownEventException() {
        AppResponse appResponse = new AppResponse("ES-06", "Nie odnaleziono takiego wydarzenia");
        return new ResponseEntity<>(appResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResetTokenException.class)
    public ResponseEntity<AppResponse> handleResetTokenException() {
        AppResponse appResponse = new AppResponse("ES-07", "Token jest błędny lub stracił ważność");
        return new ResponseEntity<>(appResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<AppResponse> handleExpiredTokenException() {
        AppResponse appResponse = new AppResponse("AUTH-01", "Token stracił swoją ważność");
        return new ResponseEntity<>(appResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidTokenFormatException.class)
    public ResponseEntity<AppResponse> handleInvalidTokenFormatException() {
        AppResponse appResponse = new AppResponse("AUTH-02", "Token jest niepoprawny");
        return new ResponseEntity<>(appResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserTokenException.class)
    public ResponseEntity<AppResponse> handleUserTokenException(UserTokenException ex) {
        AppResponse appResponse = new AppResponse("AUTH-03", ex.getMessage());
        return new ResponseEntity<>(appResponse, HttpStatus.UNAUTHORIZED);
    }


}