package com.facebook.fbplatform.user;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class JwtUserService {

    private final JwtUserRepository jwtUserRepository;
    private final PasswordEncoder passwordEncoder;


    public JwtUser save(JwtUser user) {
        return jwtUserRepository.save(user);
    }

    public Optional<JwtUser> findJwtUserByEmail(String email) {
        return jwtUserRepository.findJwtUserByEmail(email);
    }

    public JwtUser getJwtUserByEmail(String email) {
        return jwtUserRepository.findJwtUserByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found by email!"));
    }

    public JwtUser getJwtUserByUsername(String username) {
        return jwtUserRepository.findJwtUserByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found by username!"));
    }

    public JwtUser createUser(JwtUser jwtUser) throws Exception {
       JwtUser jwtUsers = new JwtUser();
       jwtUsers.setUsername(jwtUser.getUsername());
        jwtUsers.setEmail(jwtUser.getEmail());
        jwtUsers.setPassword(passwordEncoder.encode(jwtUser.getPassword()));
       jwtUsers.setRole(Collections.singleton(Role.ROLE_USER));
       jwtUsers.setEnabled(true);
       return jwtUserRepository.save(jwtUsers);
    }
}
