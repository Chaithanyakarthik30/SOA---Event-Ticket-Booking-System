
package com.eventgenie.bookingservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventgenie.bookingservice.entity.Booking;
import com.eventgenie.bookingservice.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Create a booking before payment
    public Booking createBooking(Booking booking) {

        if (booking.getNumberOfTickets() <= 0) {
            throw new IllegalArgumentException(
                "Number of tickets must be greater than zero"
            );
        }

        if (booking.getEventId() == null) {
            throw new IllegalArgumentException(
                "Event ID is required"
            );
        }

        booking.setPaymentStatus("PENDING");
        booking.setBookingStatus("PENDING");

        return bookingRepository.save(booking);
    }

    // Simulate payment success or failure
    public Booking processDemoPayment(Long id, boolean success) {

        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException("Booking not found")
            );

        if (!"PENDING".equals(booking.getPaymentStatus())
                || !"PENDING".equals(booking.getBookingStatus())) {
            throw new IllegalStateException(
                "This booking has already been processed"
            );
        }

        if (success) {
            booking.setPaymentStatus("DEMO_SUCCESS");
            booking.setBookingStatus("CONFIRMED");
        } else {
            booking.setPaymentStatus("DEMO_FAILED");
            booking.setBookingStatus("CANCELLED");
        }

        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
}
