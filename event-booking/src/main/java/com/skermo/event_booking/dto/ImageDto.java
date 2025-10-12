package com.skermo.event_booking.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ImageDto {
    private UUID id;
    private String url;
    private Boolean isPrimary;
}