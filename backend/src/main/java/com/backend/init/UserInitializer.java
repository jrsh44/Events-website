package com.backend.init;

import com.backend.data.User;
import com.backend.enums.Role;
import com.backend.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class UserInitializer {

    private final Integer minQuantity = 40;

    private final UserRepository userRepository;

    public UserInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public CommandLineRunner initializeUsers() {
        return args -> {
            long userCount = userRepository.count();
            if (userCount < minQuantity) {
                List<User> users = new ArrayList<>();
                Random random = new Random();

                for (int i = 1; i <= minQuantity - userCount; i++) {
                    User user = User.builder()
                            .firstName(generateRandomFirstName())
                            .lastName(generateRandomLastName())
                            .email(generateRandomEmail(i))
                            .password("password")
                            .role(generateRandomRole())
                            .build();

                    users.add(user);
                }

                userRepository.saveAll(users);
                System.out.println((minQuantity - userCount) + " random users have been initialized!");
            } else {
                System.out.println("There are already " + minQuantity + " or more users, no need to initialize more.");
            }
        };
    }

    private String generateRandomFirstName() {
        String[] firstNames = {"John", "Jane", "Michael", "Sarah", "David", "Emily"};
        return firstNames[new Random().nextInt(firstNames.length)];
    }

    private String generateRandomLastName() {
        String[] lastNames = {"Smith", "Doe", "Johnson", "Brown", "Davis", "Wilson"};
        return lastNames[new Random().nextInt(lastNames.length)];
    }

    private String generateRandomEmail(int index) {
        return "user" + index + "@example.com";
    }

    private Role generateRandomRole() {
        Role[] roles = Role.values();
        return roles[new Random().nextInt(roles.length)];
    }
}
