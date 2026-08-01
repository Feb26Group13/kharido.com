package com.kharido.businessservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.kharido.businessservice.security.CustomUserDetailsService;

@Configuration
public class SecurityBeansConfig {

    @Bean
    public UserDetailsService userDetailsService(
            CustomUserDetailsService service) {

        return service;
    }

    @Bean
    public AuthenticationProvider authenticationProvider(
            UserDetailsService userDetailsService) {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(userDetailsService);

        return provider;
    }
}