package com.skermo.event_booking.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skermo.event_booking.dto.CityDto;
import com.skermo.event_booking.service.CityService;

@RestController
@CrossOrigin
@RequestMapping("/api/cities")
public class CityController {
    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public List<CityDto> getAllCities() {
        return cityService.getAllCities();
    }
}
