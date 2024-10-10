package com.backend.services;

import com.backend.model.CredentialsDto;
import com.backend.model.SignUpDto;
import com.backend.model.UserDto;

public interface UserService {

     UserDto login(CredentialsDto credentialsDto);
     UserDto register(SignUpDto userDto);
     UserDto findByEmail(String email);
}
