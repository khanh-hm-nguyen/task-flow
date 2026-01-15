package com.khanh.tasks.services.impl;

import com.khanh.tasks.domain.dto.AuthRequest;
import com.khanh.tasks.domain.dto.AuthResponse;
import com.khanh.tasks.domain.dto.RegisterRequest;
import com.khanh.tasks.domain.entities.User;
import com.khanh.tasks.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // create user
    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        repository.save(user); // create user

        // generate new token
        var jwtToken = jwtService.generateToken(user);

        // return token
        return AuthResponse.builder().token(jwtToken).build();
    }


    // login
    public AuthResponse authenticate(AuthRequest request) {

        // call authenticationManager.authenticate() to check credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // if correct, fetch user and return new token
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder().token(jwtToken).build();
    }
}
