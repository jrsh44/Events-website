package com.backend.services;

import com.backend.model.CredentialsDto;
import com.backend.model.SignUpDto;
import com.backend.model.UserCreateDto;
import com.backend.model.UserDto;

public interface UserService {

    UserDto login(CredentialsDto credentialsDto);

    UserDto register(SignUpDto userDto);

    void deleteUser(Integer userId);

    UserDto addUser(UserCreateDto userCreateDto);

    UserDto updateUser(Integer userId, UserDto userDto);

    UserDto getUser(Integer userId);

    UserDto findByEmail(String email);

}

