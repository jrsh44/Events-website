package com.backend.services.impl;

import com.backend.data.PasswordResetToken;
import com.backend.data.User;
import com.backend.exceptions.UserTokenException;
import com.backend.exceptions.UnknownUserException;
import com.backend.model.PasswordUpdateDto;
import com.backend.model.RestartCredentialsDto;
import com.backend.repositories.PasswordResetTokenRepository;
import com.backend.repositories.UserRepository;
import com.backend.services.EmailService;
import com.backend.services.PasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class PasswordServiceImpl implements PasswordService {

    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public void initiatePasswordReset(RestartCredentialsDto restartCredentialsDto) {
        User user = userRepository.findByEmail(restartCredentialsDto.email())
                .orElseThrow(UnknownUserException::new);

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(resetToken);

        emailService.sendResetPasswordEmail(user.getEmail(), token);
    }

    public boolean validateResetToken(String token) {
        Optional<PasswordResetToken> resetTokenOptional = passwordResetTokenRepository.findByToken(token);
        return resetTokenOptional.isPresent() && resetTokenOptional.get().getExpiryDate().isAfter(LocalDateTime.now());
    }

    public void updatePassword(String token, PasswordUpdateDto passwordUpdateDto) {
        Optional<PasswordResetToken> resetTokenOptional = passwordResetTokenRepository.findByToken(token);
        if (resetTokenOptional.isPresent() && resetTokenOptional.get().getExpiryDate().isAfter(LocalDateTime.now())) {
            User user = resetTokenOptional.get().getUser();
            user.setPassword(passwordEncoder.encode(passwordUpdateDto.password()));
            userRepository.save(user);

            passwordResetTokenRepository.delete(resetTokenOptional.get());
        } else {
            throw new UserTokenException("Token jest niepoprawny lub wygasł");
        }
    }
}
