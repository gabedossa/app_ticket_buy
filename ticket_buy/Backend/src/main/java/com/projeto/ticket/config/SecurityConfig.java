package com.projeto.ticket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Integra a configuração de CORS diretamente na cadeia de segurança
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. Desabilita a proteção CSRF, que não é necessária para APIs
                .csrf(AbstractHttpConfigurer::disable)

                // 3. Define as regras de autorização
                .authorizeHttpRequests(authorize -> authorize
                        // Permite acesso público a todos os endpoints
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        // Cria um objeto de configuração de CORS
        CorsConfiguration configuration = new CorsConfiguration();

        // Permite requisições de qualquer origem
        configuration.setAllowedOrigins(List.of("*"));

        // Permite os métodos HTTP mais comuns
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permite todos os cabeçalhos
        configuration.setAllowedHeaders(List.of("*"));

        // Registra a configuração de CORS para todos os endpoints ("/**")
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}