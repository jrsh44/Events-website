package com.backend.controller;

import com.backend.model.*;
import com.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("api/user")
@RestController
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasAuthority('user:read')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {
        UserDto user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<UserDto> getCurrentUser() {
        UserDto user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasAuthority('user:modify')")
    @PostMapping
    public ResponseEntity<UserDto> addUser(@RequestBody @Valid UserCreateDto userDto) {
        UserDto user = userService.addUser(userDto);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasAuthority('user:modify')")
    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody @Valid UserDto userDto, @PathVariable Integer id) {
        UserDto user = userService.updateUser(id, userDto);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasAuthority('user:modify')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAuthority('user:read')")
    @PostMapping("/search")
    public ResponseEntity<SearchResultDto<UserDto>> searchEvents(@RequestBody UserFiltersDto userFiltersDto) {
        SearchResultDto<UserDto> events = userService.searchUsers(userFiltersDto);
        return ResponseEntity.ok(events);
    }


}
