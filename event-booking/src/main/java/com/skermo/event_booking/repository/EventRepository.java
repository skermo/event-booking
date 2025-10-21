package com.skermo.event_booking.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skermo.event_booking.entity.Event;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface EventRepository extends JpaRepository<Event, UUID> {
    @Query("SELECT e FROM Event e " +
            "WHERE (LOWER(e.title) LIKE LOWER(CONCAT('%', :title, '%'))) " + 
             "AND (:categoryId IS NULL OR e.category.id = :categoryId) " +
             "AND (:cityId IS NULL OR e.city.id = :cityId) " +
             "AND (CAST(:startDate AS DATE) IS NULL OR e.startDate >= :startDate)" 
)
Page<Event> search(
        @Param("title") String title,
        @Param("categoryId") UUID categoryId,
        @Param("cityId") UUID cityId,
        @Param("startDate") LocalDate startDate,
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
