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

    public Booking createBooking(Booking booking) {

        // Demo payment: ₹0
        booking.setTotalAmount(0.0);
        booking.setPaymentStatus("PAID");
        booking.setBookingStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
}