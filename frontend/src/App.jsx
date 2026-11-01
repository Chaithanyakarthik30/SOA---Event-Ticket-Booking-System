
import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/events'

const fallbackImage =
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80'

const eventImages = {
  'Updated AI Conference':
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  'Direct Test Event':
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  'Anirudh Live Music Concert':
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  'Arijit Singh Live Concert':
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  'Craft and Handicrafts Exhibition':
    'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80',
  'Classical Dance and Music Evening':
    'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80',
  'AI and Technology Conference':
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  'Stand-Up Comedy Night':
    'https://images.pexels.com/photos/10078868/pexels-photo-10078868.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Indian Art and Culture Exhibition':
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80',
  'Food and Cultural Festival':
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
  'Photography and Creative Arts':
    'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
  'Startup and Innovation Expo':
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
}

function getEventImage(event) {
  return event.image || eventImages[event.name] || fallbackImage
}

function formatEventDate(date) {
  if (!date) return 'Date to be announced'

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date)

  if (match) {
    return new Date(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3])
    ).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return date
}

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [ticketCount, setTicketCount] = useState('1')

  const [transport, setTransport] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Demo payment')
  const [formError, setFormError] = useState('')
  const [stage, setStage] = useState('details')
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('The events API did not return a list.')
        }

        const uniqueEvents = data.filter(
          (event, index, list) =>
            list.findIndex(
              (item) =>
                item.name?.trim().toLowerCase() ===
                event.name?.trim().toLowerCase()
            ) === index
        )

        setEvents(uniqueEvents)
      } catch (err) {
        console.error('Failed to load events:', err)
        setError(
          'Unable to load events. Check the API Gateway and backend services.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const filteredEvents = events.filter((event) => {
    const query = search.trim().toLowerCase()

    return (
      !query ||
      (event.name || '').toLowerCase().includes(query) ||
      (event.category || '').toLowerCase().includes(query) ||
      (event.location || '').toLowerCase().includes(query) ||
      (event.description || '').toLowerCase().includes(query)
    )
  })

  const totalAmount =
    Number(selectedEvent?.price || 0) * Number(ticketCount || 0)

  const openBooking = (event) => {
    setSelectedEvent(event)
    setFullName('')
    setEmail('')
    setPhone('')
    setTicketCount('1')
    setTransport('')
    setVehicleNumber('')
    setPaymentMethod('Demo payment')
    setFormError('')
    setStage('details')
    setConfirmation(null)
  }

  const closeBooking = () => {
    setSelectedEvent(null)
    setFormError('')
    setStage('details')
    setConfirmation(null)
  }

  const handleDetailsSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (fullName.trim().length < 2) {
      setFormError('Please enter your full name.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setFormError('Please enter a valid email address.')
      return
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setFormError(
        'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.'
      )
      return
    }

    const count = Number(ticketCount)
    const availableSeats = Number(selectedEvent.availableSeats)

    if (!Number.isInteger(count) || count < 1) {
      setFormError('Please select at least one ticket.')
      return
    }

    if (Number.isFinite(availableSeats) && count > availableSeats) {
      setFormError(`Only ${availableSeats} seats are available.`)
      return
    }

    setStage('transport')
  }

  const handleTransportSubmit = (e) => {
    e.preventDefault()
    setFormError('')

    if (!transport) {
      setFormError('Please select your mode of transport.')
      return
    }

    if (
      (transport === 'Car' || transport === 'Bike') &&
      !vehicleNumber.trim()
    ) {
      setFormError('Please enter your vehicle registration number.')
      return
    }

    setStage('payment')
  }

  const handleDemoPayment = () => {
    // Demo-only confirmation: no payment is processed and no backend booking
    // or real parking reservation is created by this frontend action.
    const demoId = `DEMO-${Date.now().toString().slice(-8)}`
    const needsParking = transport === 'Car' || transport === 'Bike'

    setConfirmation({
      id: demoId,
      event: selectedEvent,
      name: fullName.trim(),
      email: email.trim(),
      phone,
      tickets: Number(ticketCount),
      amount: totalAmount,
      transport,
      vehicleNumber: needsParking ? vehicleNumber.trim().toUpperCase() : '',
      paymentMethod,
      status: 'DEMO CONFIRMATION — NOT A REAL BOOKING',
      parking: needsParking
        ? {
            area: 'Block B, 2nd Road',
            slot: '2A (illustrative demo slot)',
            fee: 'Free in this demo',
            time: 'Event parking time must be configured',
          }
        : null,
    })

    setStage('confirmation')
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          Event<span>Booking</span>
        </div>

        <div className="location">📍 Hyderabad</div>

        <input
          className="search"
          type="search"
          placeholder="Search for events, concerts, exhibitions..."
          aria-label="Search events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="login-btn"
          onClick={() => alert('Login and registration will be added next.')}
        >
          Login
        </button>
      </nav>

      <section className="hero">
        <h1>Discover Events You'll Love</h1>
        <p>
          Concerts, workshops, exhibitions, technology events and
          cultural experiences across India.
        </p>
        <button
          className="hero-btn"
          onClick={() =>
            document.querySelector('.section-title')?.scrollIntoView({
              behavior: 'smooth',
            })
          }
        >
          Explore Events
        </button>
      </section>

      <main className="container">
        <div className="categories">
          <div className="category">🎵 Music</div>
          <div className="category">🎨 Arts</div>
          <div className="category">🪔 Culture</div>
          <div className="category">💻 Technology</div>
          <div className="category">😂 Comedy</div>
          <div className="category">🍴 Food</div>
          <div className="category">🏢 Business</div>
        </div>

        <h2 className="section-title">Popular Events</h2>

        {loading && <p>Loading events from the server...</p>}
        {!loading && error && <p role="alert">{error}</p>}
        {!loading && !error && filteredEvents.length === 0 && (
          <p>No events found. Try another search.</p>
        )}

        <div className="events">
          {filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <img
                className="event-image"
                src={getEventImage(event)}
                alt={event.name || 'Event'}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = fallbackImage
                }}
              />

              <div className="event-info">
                <span className="event-category">
                  {event.category || 'EVENT'}
                </span>
                <h3>{event.name || 'Untitled Event'}</h3>
                <p>📍 {event.location || 'Location to be announced'}</p>
                <p>📅 {formatEventDate(event.date)}</p>

                <p className="price">
                  {Number(event.price) === 0
                    ? 'FREE ENTRY'
                    : event.price != null
                      ? `From ₹${Number(event.price).toLocaleString('en-IN')}`
                      : 'Price to be announced'}
                </p>

                <button className="book-btn" onClick={() => openBooking(event)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <section className="ai-section">
          <h2>🤖 Recommended For You</h2>
          <p>
            Our planned AI recommendation feature will suggest events based
            on your interests and previous bookings.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 AI-Driven Event Ticket Booking System</p>
      </footer>

      {selectedEvent && (
        <div
          role="presentation"
          onClick={closeBooking}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              color: '#222',
              width: '100%',
              maxWidth: '580px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '12px',
              padding: '28px',
              margin: 'auto',
            }}
          >
            <h2
              id="booking-title"
              style={{ textAlign: 'center', marginBottom: '14px' }}
            >
              {stage === 'details' && 'Personal Details'}
              {stage === 'transport' && 'Transport Details'}
              {stage === 'payment' && 'Review & Demo Payment'}
              {stage === 'confirmation' && 'Booking Summary'}
            </h2>

            {stage !== 'confirmation' ? (
              <>
                <p style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <strong>{selectedEvent.name}</strong>
                </p>
                <p style={{ textAlign: 'center', marginBottom: '6px' }}>
                  📍 {selectedEvent.location || 'Location to be announced'}
                </p>
                <p style={{ textAlign: 'center', marginBottom: '6px' }}>
                  📅 {formatEventDate(selectedEvent.date)}
                </p>
                <p style={{ textAlign: 'center', marginBottom: '6px' }}>
                  🎟️ Available seats: {selectedEvent.availableSeats ?? 'Not specified'}
                </p>
                <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>
                  Ticket price: ₹{Number(selectedEvent.price || 0).toLocaleString('en-IN')}
                </p>
              </>
            ) : null}

            {stage === 'details' && (
              <form onSubmit={handleDetailsSubmit} noValidate>
                <label htmlFor="full-name">Full Name</label>
                <input
                  id="full-name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  style={inputStyle}
                />

                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  style={inputStyle}
                />

                <label htmlFor="phone">Indian Mobile Number</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  required
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  placeholder="10-digit mobile number"
                  style={inputStyle}
                />

                <label htmlFor="ticket-count">Number of Tickets</label>
                <input
                  id="ticket-count"
                  type="number"
                  min={1}
                  max={Math.max(1, Number(selectedEvent.availableSeats || 10))}
                  required
                  value={ticketCount}
                  onChange={(e) => setTicketCount(e.target.value)}
                  style={inputStyle}
                />

                <p style={{ fontWeight: 'bold', margin: '12px 0 18px' }}>
                  Total: ₹{totalAmount.toLocaleString('en-IN')}
                </p>

                {formError && <p role="alert" style={errorStyle}>{formError}</p>}

                <button type="submit" className="book-btn">
                  Continue
                </button>
                <button type="button" className="book-btn" onClick={closeBooking} style={secondaryButtonStyle}>
                  Cancel
                </button>
              </form>
            )}

            {stage === 'transport' && (
              <form onSubmit={handleTransportSubmit}>
                <p style={{ marginBottom: '12px' }}>
                  How will you travel to the event?
                </p>

                {['RTC / Bus', 'Metro', 'Cab / Taxi', 'Bike', 'Car'].map((mode) => (
                  <label key={mode} style={{ display: 'block', margin: '12px 0' }}>
                    <input
                      type="radio"
                      name="transport"
                      value={mode}
                      checked={transport === mode}
                      onChange={(e) => {
                        setTransport(e.target.value)
                        setVehicleNumber('')
                      }}
                      required
                    />{' '}
                    {mode}
                  </label>
                ))}

                {(transport === 'Bike' || transport === 'Car') && (
                  <>
                    <label htmlFor="vehicle-number">Vehicle Registration Number</label>
                    <input
                      id="vehicle-number"
                      type="text"
                      required
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                      placeholder="e.g. TS09AB1234"
                      style={inputStyle}
                    />
                    <p style={{ color: '#666', margin: '8px 0 12px' }}>
                      Parking shown later is illustrative demo information only.
                    </p>
                  </>
                )}

                {formError && <p role="alert" style={errorStyle}>{formError}</p>}

                <button type="submit" className="book-btn">Continue to Payment</button>
                <button type="button" className="book-btn" onClick={() => setStage('details')} style={secondaryButtonStyle}>
                  Back
                </button>
              </form>
            )}

            {stage === 'payment' && (
              <div>
                <p><strong>Attendee:</strong> {fullName}</p>
                <p style={{ marginTop: '8px' }}><strong>Email:</strong> {email}</p>
                <p style={{ marginTop: '8px' }}><strong>Phone:</strong> {phone}</p>
                <p style={{ marginTop: '8px' }}><strong>Tickets:</strong> {ticketCount}</p>
                <p style={{ marginTop: '8px' }}><strong>Transport:</strong> {transport}</p>
                {(transport === 'Bike' || transport === 'Car') && (
                  <p style={{ marginTop: '8px' }}><strong>Vehicle:</strong> {vehicleNumber}</p>
                )}
                <h3 style={{ margin: '18px 0' }}>
                  Total amount: ₹{totalAmount.toLocaleString('en-IN')}
                </h3>

                <label htmlFor="payment-method">Payment Mode</label>
                <select
                  id="payment-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={inputStyle}
                >
                  <option>Demo payment</option>
                  <option>Demo UPI</option>
                  <option>Demo card</option>
                </select>

                <p style={{ color: '#8a4b00', background: '#fff3cd', padding: '12px', borderRadius: '6px', margin: '12px 0' }}>
                  Demo only: no real payment will be charged. This step does not save a booking to the backend.
                </p>

                <button type="button" className="book-btn" onClick={handleDemoPayment}>
                  Complete Demo Booking
                </button>
                <button type="button" className="book-btn" onClick={() => setStage('transport')} style={secondaryButtonStyle}>
                  Back
                </button>
              </div>
            )}

            {stage === 'confirmation' && confirmation && (
              <div>
                <h3 style={{ color: '#16803c', marginBottom: '12px' }}>
                  Demo Confirmation Created
                </h3>
                <p><strong>Reference:</strong> {confirmation.id}</p>
                <p style={{ marginTop: '8px' }}><strong>Event:</strong> {confirmation.event.name}</p>
                <p style={{ marginTop: '8px' }}><strong>Venue:</strong> {confirmation.event.location || 'To be announced'}</p>
                <p style={{ marginTop: '8px' }}><strong>Date:</strong> {formatEventDate(confirmation.event.date)}</p>
                <p style={{ marginTop: '8px' }}><strong>Attendee:</strong> {confirmation.name}</p>
                <p style={{ marginTop: '8px' }}><strong>Tickets:</strong> {confirmation.tickets}</p>
                <p style={{ marginTop: '8px' }}><strong>Amount:</strong> ₹{confirmation.amount.toLocaleString('en-IN')}</p>
                <p style={{ marginTop: '8px' }}><strong>Transport:</strong> {confirmation.transport}</p>

                {confirmation.parking && (
                  <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '14px', marginTop: '16px' }}>
                    <h3>Illustrative Parking Details</h3>
                    <p style={{ marginTop: '8px' }}><strong>Area:</strong> {confirmation.parking.area}</p>
                    <p style={{ marginTop: '8px' }}><strong>Slot:</strong> {confirmation.parking.slot}</p>
                    <p style={{ marginTop: '8px' }}><strong>Vehicle:</strong> {confirmation.vehicleNumber}</p>
                    <p style={{ marginTop: '8px' }}><strong>Fee:</strong> {confirmation.parking.fee}</p>
                    <p style={{ marginTop: '8px' }}><strong>Time:</strong> {confirmation.parking.time}</p>
                  </div>
                )}

                <p style={{ color: '#a33', margin: '16px 0' }}>
                  {confirmation.status}. No real payment, booking, or parking slot has been reserved.
                </p>

                <button type="button" className="book-btn" onClick={closeBooking}>
                  Close
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  display: 'block',
  width: '100%',
  boxSizing: 'border-box',
  padding: '12px',
  margin: '6px 0 16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '15px',
}

const errorStyle = {
  color: '#c62828',
  margin: '10px 0 14px',
}

const secondaryButtonStyle = {
  background: '#666',
  marginTop: '10px',
}

export default App
