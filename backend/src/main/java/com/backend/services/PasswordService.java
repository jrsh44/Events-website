package com.backend.services;

import com.backend.model.RestartCredentialsDto;

public interface PasswordService {

    void initiatePasswordReset(RestartCredentialsDto restartCredentialsDto);

    boolean validateResetToken(String token);

    void updatePassword(String token, String newPassword);
}
