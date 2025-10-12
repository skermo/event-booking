package com.skermo.event_booking.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skermo.event_booking.service.SeedDataService;

@RestController
@CrossOrigin
@RequestMapping("/api/seed")
public class SeedDataController {
    private final SeedDataService seedDataService;

    public SeedDataController(SeedDataService seedDataService) {
        this.seedDataService = seedDataService;
    }

    @GetMapping
    public void seedDatabase() {
        seedDataService.seed();
    }
}
