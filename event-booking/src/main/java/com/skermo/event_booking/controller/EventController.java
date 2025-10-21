package com.skermo.event_booking.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skermo.event_booking.dto.EventDto;
import com.skermo.event_booking.service.EventService;

@RestController
@CrossOrigin
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/{id}")
    public EventDto getEventById(@PathVariable(name = "id") UUID id) {
        return eventService.getEventById(id);
    }

    @GetMapping("/search")
    public Page<EventDto> searchEvents(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID cityId,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "startDate") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return eventService.search(title, categoryId, cityId, startDate, pageNo, pageSize, sortBy, sortDir);
    }

    @PostMapping("/{id}/book")
    public void bookTickets(@PathVariable UUID id, @RequestParam int numberOfTickets) {
        eventService.bookTickets(id, numberOfTickets);
    }

    @GetMapping("/{id}/similar")
    public List<EventDto> getSimilarEvents(@PathVariable UUID id) {
        return eventService.getSimilarEvents(id);
    }

    @GetMapping("/featured")
    public List<EventDto> getFeaturedEvents() {
        return eventService.getFeaturedEvents();
    }

    @GetMapping("/future")
    public Page<EventDto> getFutureEvents(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize) {
        return eventService.getFutureEvents(pageNo, pageSize);
    }

}
