package com.skermo.event_booking.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.skermo.event_booking.dto.CategoryDto;
import com.skermo.event_booking.dto.CityDto;
import com.skermo.event_booking.dto.EventDto;
import com.skermo.event_booking.dto.ImageDto;
import com.skermo.event_booking.entity.Event;
import com.skermo.event_booking.repository.EventRepository;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public EventDto getEventById(UUID id) {
        Event event = eventRepository.findById(id).get();
        return mapToDto(event);
    }

    public void bookTickets(UUID id, int numberOfTickets) {
        Event event = eventRepository.findById(id).get();

        if (numberOfTickets <= 0) {
            throw new IllegalArgumentException("Number of tickets must be greater than zero");
        }

        if (event.getNumberOfTicketsLeft() < numberOfTickets) {
            throw new IllegalArgumentException("Not enough tickets left for this event");
        }

        event.setNumberOfTicketsLeft(event.getNumberOfTicketsLeft() - numberOfTickets);
        eventRepository.save(event);
    }

    public Page<EventDto> search(String name, UUID category_id, UUID cityId, Date startDate, int pageNo, int pageSize,
            String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Event> events = eventRepository.search(name, category_id, cityId, startDate, pageable);
        return events.map(this::mapToDto);
    }

    public List<EventDto> getSimilarEvents(UUID id) {
        Sort sort = Sort.by(Sort.Direction.ASC, "startDate");
        Pageable pageable = PageRequest.of(1, 6, sort);
        Event event = eventRepository.findById(id).get();
        Date today = Date.valueOf(LocalDate.now());

        List<Event> similarEvents = eventRepository.findSimilarEvents(
                event.getId(),
                event.getCity().getId(),
                event.getCategory().getId(),
                today, pageable);

        return similarEvents.stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<EventDto> getFeaturedEvents() {
        Sort sort = Sort.by(Sort.Direction.ASC, "numberOfTicketsLeft");
        Pageable pageable = PageRequest.of(1, 6, sort);
        Date today = Date.valueOf(LocalDate.now());
        Page<Event> similarEvents = eventRepository.findFutureEvents(today, pageable);

        return similarEvents.stream()
                .map(this::mapToDto)
                .toList();
    }

    public Page<EventDto> getFutureEvents(int pageNo, int pageSize) {
        Sort sort = Sort.by(Sort.Direction.ASC, "startDate");
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Date today = Date.valueOf(LocalDate.now());
        Page<Event> events = eventRepository.findFutureEvents(today, pageable);

        return events.map(this::mapToDto);
    }

    private EventDto mapToDto(Event event) {
        CategoryDto categoryDto = new CategoryDto(event.getCategory().getId(), event.getCategory().getName());
        CityDto cityDto = new CityDto(event.getCity().getId(), event.getCity().getName());
        List<ImageDto> imageDtos = event.getImages().stream()
                .map(image -> new ImageDto(image.getId(), image.getUrl(), image.getIsPrimary()))
                .collect(Collectors.toList());

        return new EventDto(event.getId(), event.getTitle(), event.getDescription(), event.getStartDate(),
                event.getStartTime(), event.getDurationInMinutes(), event.getAddress(), event.getNumberOfTicketsLeft(),
                event.getPriceInBAM(), categoryDto, cityDto, imageDtos);
    }
}
