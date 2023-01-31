package com.facebook.fbplatform.security.application;

import com.facebook.fbplatform.security.domaine.JwtRefreshRequestDto;
import com.facebook.fbplatform.security.domaine.JwtResponseDto;
import com.facebook.fbplatform.security.domaine.RefreshToken;
import com.facebook.fbplatform.security.JwtUtils;
import com.facebook.fbplatform.security.application.port.RefreshTokenRepository;
import com.facebook.fbplatform.user.JwtUser;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;

    private static final int expiration = 120 ;




    public String createToken(JwtUser user) {
        var refreshToken = refreshTokenRepository.save(RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiration(ZonedDateTime.now(ZoneId.systemDefault()).plusMinutes(expiration))
                .build());
        return refreshToken.getToken();
    }

    public JwtResponseDto refreshToken(JwtRefreshRequestDto refreshRequestDto) {
        var tokenOpt = refreshTokenRepository.findRefreshTokenByToken(refreshRequestDto.getRefreshToken());
        if (tokenOpt.isEmpty()) {
            throw new RuntimeException("Refresh Token %s not found!".formatted(refreshRequestDto.getRefreshToken()));
        }
        var token = tokenOpt.get();
        if (isTokenExpired(token.getExpiration())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh Token %s was expired!".formatted(refreshRequestDto.getRefreshToken()));
        }
        String jwt = jwtUtils.createJwt(token.getUser().getEmail());
        updateToken(token);
        return JwtResponseDto.of(jwt, token.getToken());
    }

    private void updateToken(RefreshToken token) {
        token.setExpiration(ZonedDateTime.now(ZoneId.systemDefault()).plusMinutes(expiration));
        refreshTokenRepository.save(token);
    }

    private boolean isTokenExpired(ZonedDateTime expirationTime) {
        return expirationTime.isBefore(ZonedDateTime.now(ZoneId.systemDefault()));
    }

}
