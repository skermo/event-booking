package com.skermo.event_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skermo.event_booking.entity.City;

import java.util.UUID;

public interface CityRepository extends JpaRepository<City, UUID> {
    City findByName(String name);
}
