package com.skermo.event_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skermo.event_booking.entity.Category;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Category findByName(String name);
}
