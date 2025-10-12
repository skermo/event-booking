package com.skermo.event_booking.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skermo.event_booking.dto.CityDto;
import com.skermo.event_booking.entity.City;
import com.skermo.event_booking.repository.CityRepository;

@Service
public class CityService {
    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<CityDto> getAllCities() {
        List<City> cities = cityRepository.findAll();

        return cities.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private CityDto mapToDto(City city) {
        return new CityDto(
                city.getId(),
                city.getName());
    }
}
