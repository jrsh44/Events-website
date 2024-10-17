package com.backend.repositories;

import com.backend.data.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

    void deleteById(Integer id);

    Optional<User> findByEmail(String email);
}
