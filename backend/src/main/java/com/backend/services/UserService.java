package com.backend.services;

import com.backend.model.*;

public interface UserService {

    UserDto login(CredentialsDto credentialsDto);

    UserDto register(SignUpDto userDto);

    void deleteUser(Integer userId);

    UserDto addUser(UserCreateDto userCreateDto);

    UserDto updateUser(Integer userId, UserDto userDto);

    UserDto getUser(Integer userId);

    UserDto findByEmail(String email);

    SearchResultDto<UserDto> searchUsers(UserFiltersDto userFiltersDto);


}

