package com.skermo.event_booking.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.skermo.event_booking.dto.CategoryDto;
import com.skermo.event_booking.entity.Category;
import com.skermo.event_booking.repository.CategoryRepository;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private CategoryDto mapToDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName());
    }
}
