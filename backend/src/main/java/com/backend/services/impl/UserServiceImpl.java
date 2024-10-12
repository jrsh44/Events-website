package com.backend.services.impl;

import com.backend.enums.Role;
import com.backend.auth.UserAuthenticationProvider;
import com.backend.data.User;
import com.backend.exceptions.AppException;
import com.backend.model.CredentialsDto;
import com.backend.model.SignUpDto;
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
    private final UserAuthenticationProvider userAuthenticationProvider;
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
        savedUserDto.setToken(userAuthenticationProvider.createToken(savedUserDto));

        return savedUserDto;
    }

    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        UserDto userDto = entityToDto(user);
        userDto.setToken(userAuthenticationProvider.createToken(userDto));

        return userDto;
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
