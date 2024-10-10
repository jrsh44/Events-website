package com.backend.repositories;

import com.backend.data.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    void deleteById(Long id);

    Optional<User> findByEmail(String email);
}
