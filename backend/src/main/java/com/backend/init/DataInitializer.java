package com.backend.init;

import com.backend.data.User;
import com.backend.enums.Role;
import com.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.CharBuffer;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Optional<User> admin = userRepository.findByEmail("admin@example.com");
        Optional<User> manager = userRepository.findByEmail("manager@example.com");

        if (admin.isEmpty()) {
            User adminUser = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode(CharBuffer.wrap("adminpassword")))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(adminUser);
        }

        if (manager.isEmpty()) {
            User managerUser = User.builder()
                    .firstName("Manager")
                    .lastName("User")
                    .email("manager@example.com")
                    .password(passwordEncoder.encode(CharBuffer.wrap("managerpassword")))
                    .role(Role.MANAGER)
                    .build();
            userRepository.save(managerUser);
        }
    }
}
