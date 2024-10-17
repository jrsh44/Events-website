package com.backend.services.impl;

import com.backend.data.Event;
import com.backend.data.User;
import com.backend.enums.Role;
import com.backend.exceptions.LoginException;
import com.backend.exceptions.EmailTakenException;
import com.backend.exceptions.UnknownUserException;
import com.backend.exceptions.UserTokenException;
import com.backend.model.*;
import com.backend.repositories.UserRepository;
import com.backend.repositories.UserSpecification;
import com.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.email())
                .orElseThrow(LoginException::new);

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            return entityToDto(user);
        }
        throw new LoginException();
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.email());

        if (optionalUser.isPresent()) {
            throw new EmailTakenException();
        }

        User user = User.builder()
                .firstName(userDto.firstName())
                .lastName(userDto.lastName())
                .email(userDto.email())
                .password(passwordEncoder.encode(CharBuffer.wrap(userDto.password())))
                .role(Role.USER)
                .build();

        User savedUser = userRepository.save(user);

        return entityToDto(savedUser);
    }

    @Override
    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserTokenException("Token jest niepoprawny lub wygasł"));

        return entityToDto(user);
    }

    @Override
    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(UnknownUserException::new);

        userRepository.delete(user);
    }

    @Override
    public UserDto addUser(UserCreateDto userCreateDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userCreateDto.email());

        if (optionalUser.isPresent()) {
            throw new EmailTakenException();
        }

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
                .orElseThrow(UnknownUserException::new);

        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();

            if (!existingUser.getId().equals(user.getId())) {
                throw new EmailTakenException();
            }        }

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
                .orElseThrow(UnknownUserException::new);

        return entityToDto(user);
    }

    @Override
    public UserDto findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(UnknownUserException::new);

        return entityToDto(user);
    }

    @Override
    public SearchResultDto<UserDto> searchUsers(UserFiltersDto userFiltersDto) {
        Specification<User> spec = Specification
                .where(UserSpecification.hasEmail(userFiltersDto.getEmail()))
                .and(UserSpecification.hasFirstName(userFiltersDto.getFirstName())
                .and(UserSpecification.hasLastName(userFiltersDto.getLastName()))
                .and(UserSpecification.hasRole(userFiltersDto.getRole())));

        Sort.Direction direction = userFiltersDto.getSortDirection().equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

        Sort sort = Sort.by(direction, userFiltersDto.getSortBy());

        PageRequest pageable = PageRequest.of(userFiltersDto.getPage(), userFiltersDto.getTake(), sort);

        Page<User> resultPage = userRepository.findAll(spec, pageable);

        List<UserDto> eventDtos = resultPage.getContent().stream().map(this::entityToDto).toList();
        long totalRecords = resultPage.getTotalElements();

        return new SearchResultDto<>(eventDtos, totalRecords);
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
