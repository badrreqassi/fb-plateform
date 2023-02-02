package com.facebook.fbplatform.controller;


import com.facebook.fbplatform.user.JwtUser;
import com.facebook.fbplatform.user.JwtUserService;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    private  final JwtUserService jwtUserService ;
    @GetMapping("/user")
    public ExampleMessage userEndpoint() {
        return new ExampleMessage("Hello user!");
    }

    @PostMapping("/admin/creation")
    public JwtUser creationUser(@RequestBody JwtUser jwtUser) throws Exception {
       return  jwtUserService.createUser(jwtUser);

    }

    @GetMapping("/admin")
    public ExampleMessage adminEndpoint() {
        return new ExampleMessage("Hello admin!");
    }
 }
