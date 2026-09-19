package com.eventgenie.userservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventgenie.userservice.entity.User;
import com.eventgenie.userservice.entity.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
    public User getUserById(Long id) {
    return userRepository.findById(id).orElse(null);
    
    }
}