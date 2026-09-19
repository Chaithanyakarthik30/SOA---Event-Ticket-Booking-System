package com.eventgenie.eventservice.controller;

import com.eventgenie.eventservice.entity.Event;
import com.eventgenie.eventservice.repository.EventRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventRepository eventRepository;

    public EventController(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // GET all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // POST - create a new event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    // GET event by ID
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    // DELETE event by ID
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }

    // PUT - update event by ID
    @PutMapping("/{id}")
    public Event updateEvent(
            @PathVariable Long id,
            @RequestBody Event event) {

        Event existingEvent = eventRepository.findById(id).orElse(null);

        if (existingEvent != null) {
            existingEvent.setName(event.getName());
            existingEvent.setDescription(event.getDescription());
            existingEvent.setLocation(event.getLocation());
            existingEvent.setDate(event.getDate());
            existingEvent.setAvailableSeats(event.getAvailableSeats());
            existingEvent.setPrice(event.getPrice());

            return eventRepository.save(existingEvent);
        }

        return null;
    }
}