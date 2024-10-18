package com.backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {

//          // Uncomment if running BE separately
//        Dotenv dotenv = Dotenv.load();
//
//        System.setProperty("SPRING_SECRET_KEY", dotenv.get("SPRING_SECRET_KEY"));
//        System.setProperty("GMAIL_EMAIL", dotenv.get("GMAIL_EMAIL"));
//        System.setProperty("GMAIL_PASSWORD", dotenv.get("GMAIL_PASSWORD"));

        SpringApplication.run(BackendApplication.class, args);
    }

}
