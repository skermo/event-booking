package com.skermo.event_booking.service;

import com.skermo.event_booking.entity.City;
import com.skermo.event_booking.entity.Category;
import com.skermo.event_booking.entity.Event;
import com.skermo.event_booking.entity.Image;
import com.skermo.event_booking.repository.CityRepository;
import com.skermo.event_booking.repository.CategoryRepository;
import com.skermo.event_booking.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class SeedDataService {

    private final CityRepository cityRepository;
    private final CategoryRepository categoryRepository;
    private final EventRepository eventRepository;

    public SeedDataService(CityRepository cityRepository, CategoryRepository categoryRepository,
            EventRepository eventRepository) {
        this.cityRepository = cityRepository;
        this.categoryRepository = categoryRepository;
        this.eventRepository = eventRepository;
    }

    public void seed() {
        if (categoryRepository.count() > 0 || cityRepository.count() > 0 || eventRepository.count() > 0) {
            System.out.println("Seeded cities");
        }

        // ---- Cities ----
        List<City> cities = List.of(
                new City(null, "Sarajevo"),
                new City(null, "Mostar"),
                new City(null, "Zenica"));
        List<City> savedCities = cityRepository.saveAll(cities);

        System.out.println("Seeded cities");

        // ---- Categories ----
        List<Category> categories = List.of(
                new Category(null, "Music"),
                new Category(null, "Art"),
                new Category(null, "Fitness"));
        List<Category> savedCategories = categoryRepository.saveAll(categories);
        System.out.println("Seeded categories");

        // ---- Events ----
        List<Event> allEvents = new ArrayList<>();
        int daysOffset = 5;
        Random random = new Random();

        for (City city : savedCities) {
            for (Category category : savedCategories) {
                for (int i = 1; i <= 10; i++) {
                    // Create event first (so we can set it in images)
                    Event event = new Event(
                            null,
                            city.getName() + " " + category.getName() + " Event " + i,
                            "Event description for " + city.getName() + " " + category.getName() + " Event " + i,
                            Date.valueOf(LocalDate.now().plusDays(daysOffset)),
                            Time.valueOf(LocalTime.of(18, 0)),
                            120,
                            city.getName() + " Center",
                            100 + random.nextInt(200),
                            10.0 + random.nextDouble() * 40.0,
                            category,
                            city,
                            new ArrayList<>() // temporarily empty, will fill below
                    );

                    // Create images and link them to event
                    List<Image> images = new ArrayList<>();
                    for (int j = 0; j < 5; j++) {
                        boolean isPrimary = (j == 0);

                        // Optional: vary based on category for semantic variety (but Picsum doesn’t use
                        // keywords)
                        String categorySeed = switch (category.getName().toLowerCase()) {
                            case "music" -> "music";
                            case "art" -> "art";
                            case "fitness" -> "fitness";
                            default -> "event";
                        };

                        // Generate a deterministic random seed for variety in Picsum
                        String seed = categorySeed + "-" + random.nextInt(100000);
                        String imageUrl = "https://picsum.photos/seed/" + seed + "/600/400";

                        Image image = new Image(null, imageUrl, isPrimary, event);
                        image.setEvent(event); // link back to event
                        images.add(image);
                    }

                    // link images to event
                    event.setImages(images);

                    allEvents.add(event);
                    daysOffset++;
                }
            }
        }

        // Save all events once after creating everything
        eventRepository.saveAll(allEvents);
        System.out.println("Seeded events");

    }
}
