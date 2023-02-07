package com.facebook.fbplatform.security;


import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import com.auth0.jwt.JWT;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private static final int expTime = 6000000 ;


    private static final String secret = "secret";


    public String createJwt(String email) {
        return JWT.create()
                .withSubject(email)
                .withExpiresAt(Instant.ofEpochMilli(ZonedDateTime.now(ZoneId.systemDefault()).toInstant().toEpochMilli() + expTime))
                .sign(Algorithm.HMAC256(secret));
    }

}
