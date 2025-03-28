package com.backend.controller;

import com.backend.exceptions.ResetTokenException;
import com.backend.model.PasswordUpdateDto;
import com.backend.model.RestartCredentialsDto;
import com.backend.services.PasswordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/password")
public class PasswordController {

    private final PasswordService passwordService;

    @PostMapping("/reset-request")
    public ResponseEntity<String> requestPasswordReset(@RequestBody @Valid RestartCredentialsDto restartCredentialsDto) {
        passwordService.initiatePasswordReset(restartCredentialsDto);
            return ResponseEntity.ok("Wysłano link do resetowania hasła na podany adres e-mail.");
    }

    @GetMapping("/check-token")
    public ResponseEntity<String> resetPasswordPage(@RequestParam("token") String token) {
        if (passwordService.validateResetToken(token)) {
            return ResponseEntity.ok("Token jest prawidłowy, możesz zresetować hasło.");
        }
        throw new ResetTokenException();
    }

    @PostMapping("/update")
    public ResponseEntity<String> updatePassword(@RequestParam("token") String token, @RequestBody @Valid PasswordUpdateDto passwordUpdateDto) {
        passwordService.updatePassword(token, passwordUpdateDto);
        return ResponseEntity.ok("Hasło zostało zaktualizowane.");
    }

}
