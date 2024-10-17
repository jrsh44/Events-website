package com.backend.exceptions;


import com.backend.model.ErrorDto;
import com.backend.model.ErrorResponse;
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

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ErrorDto> handleAppException(AppException ex) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(new ErrorDto(ex.getMessage()));
    }

    @ExceptionHandler(UserTokenException.class)
    public ResponseEntity<ErrorResponse> handleUserTokenException() {
        ErrorResponse errorResponse = new ErrorResponse("ES-02", "Token jest niepoprawny lub wygasł");
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(EmailTakenException.class)
    public ResponseEntity<ErrorResponse> handleEmailTakenException() {
        ErrorResponse errorResponse = new ErrorResponse("ES-03", "Email jest już zajęty");
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<ErrorResponse> handleLoginException() {
        ErrorResponse errorResponse = new ErrorResponse("ES-04", "Niepoprawne dane logowania");
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UnknownUserException.class)
    public ResponseEntity<ErrorResponse> handleUnknownUserException() {
        ErrorResponse errorResponse = new ErrorResponse("ES-05", "Nie odnaleziono takiego użytkownika");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnknownEventException.class)
    public ResponseEntity<ErrorResponse> handleUnknownEventException() {
        ErrorResponse errorResponse = new ErrorResponse("ES-06", "Nie odnaleziono takiego wydarzenia");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


}