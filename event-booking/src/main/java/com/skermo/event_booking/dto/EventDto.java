package com.skermo.event_booking.dto;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class EventDto {
    private UUID id;
    private String title;
    private String description;
    private Date startDate;
    private Time startTime;
    private Integer durationInMinutes;
    private String address;
    private Integer numberOfTicketsLeft;
    private Double priceInBAM;
    private CategoryDto category;
    private CityDto city;
    private List<ImageDto> images;
}