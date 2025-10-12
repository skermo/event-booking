package com.skermo.event_booking.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skermo.event_booking.entity.Event;

import java.sql.Date;
import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    @Query("""
            SELECT e FROM Event e
            WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :name, '%'))
              AND e.category.id = :categoryId
              AND e.city.id = :cityId
              AND e.startDate >= :startDate
            """)
    Page<Event> search(
            @Param("name") String name,
            @Param("categoryId") UUID categoryId,
            @Param("cityId") UUID cityId,
            @Param("startDate") Date startDate,
            Pageable pageable);

    @Query("""
            SELECT e FROM Event e
            WHERE e.id <> :eventId
              AND (e.city.id = :cityId OR e.category.id = :categoryId)
              AND e.startDate > :today
            """)
    List<Event> findSimilarEvents(
            @Param("eventId") UUID eventId,
            @Param("cityId") UUID cityId,
            @Param("categoryId") UUID categoryId,
            @Param("today") Date today, 
            Pageable pageable);

    @Query("""
            SELECT e FROM Event e
            WHERE e.startDate > :today
            """)
    Page<Event> findFutureEvents(Date today, Pageable pageable);

}
