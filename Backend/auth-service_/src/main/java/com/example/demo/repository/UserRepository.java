package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
<<<<<<< HEAD:Backend/auth-service/src/main/java/com/example/demo/repository/UserRepository.java

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);



}
=======
    
    Optional<User> findByUsernameOrEmail(String username, String email);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);

}
>>>>>>> origin/master:Backend/auth-service_/src/main/java/com/example/demo/repository/UserRepository.java
