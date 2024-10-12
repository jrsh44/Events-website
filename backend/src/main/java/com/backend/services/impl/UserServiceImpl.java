package com.backend.services.impl;

import com.backend.data.User;
import com.backend.enums.Role;
import com.backend.exceptions.AppException;
import com.backend.model.CredentialsDto;
import com.backend.model.SignUpDto;
import com.backend.model.UserCreateDto;
import com.backend.model.UserDto;
import com.backend.repositories.UserRepository;
import com.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.email())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            return entityToDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.email());

        if (optionalUser.isPresent()) {
            throw new AppException("Email is taken", HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .firstName(userDto.firstName())
                .lastName(userDto.lastName())
                .email(userDto.email())
                .password(passwordEncoder.encode(CharBuffer.wrap(userDto.password())))
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        UserDto savedUserDto = entityToDto(savedUser);

        return savedUserDto;
    }

    @Override
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User doesn't exist", HttpStatus.BAD_REQUEST));

        userRepository.delete(user);
    }

    @Override
    public UserDto addUser(UserCreateDto userCreateDto) {

        User user = User.builder()
                .firstName(userCreateDto.firstName())
                .lastName(userCreateDto.lastName())
                .email(userCreateDto.email())
                .password(passwordEncoder.encode(CharBuffer.wrap(userCreateDto.password())))
                .role(userCreateDto.role())
                .build();

        User userSaved = userRepository.save(user);

        return entityToDto(userSaved);
    }

    @Override
    public UserDto updateUser(Integer id, UserDto userDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User doesn't exist", HttpStatus.BAD_REQUEST));

        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());

        User savedEvent = userRepository.save(user);

        return entityToDto(savedEvent);
    }

    @Override
    public UserDto getUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException("User doesn't exist", HttpStatus.BAD_REQUEST));

        return entityToDto(user);
    }

    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return entityToDto(user);
    }

    private UserDto entityToDto(User user) {
        if (user == null) {
            return null;
        } else {
            UserDto.UserDtoBuilder userDto = UserDto.builder();
            if (user.getId() != null) {
                userDto.id(user.getId().intValue());
            }

            userDto.firstName(user.getFirstName());
            userDto.lastName(user.getLastName());
            userDto.email(user.getEmail());
            userDto.role(user.getRole());

            return userDto.build();
        }
    }

}
