package com.facebook.fbplatform.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    @GetMapping("/user")
    public ExampleMessage userEndpoint() {
        return new ExampleMessage("Hello user!");
    }

    @GetMapping("/admin")
    public ExampleMessage adminEndpoint() {
        return new ExampleMessage("Hello admin!");
    }
 }
