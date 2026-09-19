import './App.css'

const events = [
  {
    id: 1,
    name: 'Anirudh Live Music Concert',
    category: 'Music',
    location: 'Bengaluru, Karnataka',
    date: '20 Dec 2026',
    price: 2000,
    image:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Arijit Singh Live Concert',
    category: 'Music',
    location: 'Mumbai, Maharashtra',
    date: '25 Dec 2026',
    price: 2500,
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Craft & Handicrafts Exhibition',
    category: 'Arts & Crafts',
    location: 'Shilpakala Vedika, Hyderabad',
    date: '28 Dec 2026',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Classical Dance & Music Evening',
    category: 'Culture',
    location: 'Ravindra Bharathi, Hyderabad',
    date: '30 Dec 2026',
    price: 499,
    image:
      'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'AI & Technology Conference',
    category: 'Technology',
    location: 'HICC, Hyderabad',
    date: '5 Jan 2027',
    price: 2499,
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Stand-Up Comedy Night',
    category: 'Comedy',
    location: 'Bengaluru, Karnataka',
    date: '8 Jan 2027',
    price: 799,
    image:
     'https://images.pexels.com/photos/10078868/pexels-photo-10078868.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 7,
    name: 'Indian Art & Culture Exhibition',
    category: 'Arts',
    location: 'New Delhi, India',
    date: '15 Jan 2027',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    name: 'Food & Cultural Festival',
    category: 'Food & Culture',
    location: 'Mumbai, Maharashtra',
    date: '20 Jan 2027',
    price: 599,
    image:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 9,
    name: 'Photography & Creative Arts',
    category: 'Arts',
    location: 'Chennai, Tamil Nadu',
    date: '25 Jan 2027',
    price: 250,
    image:
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 10,
    name: 'Startup & Innovation Expo',
    category: 'Business',
    location: 'Bengaluru, Karnataka',
    date: '30 Jan 2027',
    price: 999,
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
  },
]

function App() {
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          Event<span>Booking</span>
        </div>

        <div className="location">
          📍 Hyderabad
        </div>

        <input
          className="search"
          type="text"
          placeholder="Search for events, concerts, exhibitions..."
        />

        <button className="login-btn">
          Login
        </button>
      </nav>

      <section className="hero">
        <h1>Discover Events You'll Love</h1>

        <p>
          Concerts, workshops, exhibitions, technology events and
          cultural experiences across India.
        </p>

        <button className="hero-btn">
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

        <h2 className="section-title">
          Popular Events
        </h2>

        <div className="events">

          {events.map((event) => (
            <div className="event-card" key={event.id}>

              <img
                className="event-image"
                src={event.image}
                alt={event.name}
              />

              <div className="event-info">

                <span className="event-category">
                  {event.category}
                </span>

                <h3>
                  {event.name}
                </h3>

                <p>
                  📍 {event.location}
                </p>

                <p>
                  📅 {event.date}
                </p>

                <p className="price">
                  {event.price === 0
                    ? 'FREE ENTRY'
                    : `From ₹${event.price}`}
                </p>

                <button className="book-btn">
                  Book Now
                </button>

              </div>

            </div>
          ))}

        </div>

        <section className="ai-section">
          <h2>
            🤖 Recommended For You
          </h2>

          <p>
            Our AI assistant will recommend events based on your
            previous bookings, interests and preferences.
          </p>
        </section>

      </main>

      <footer className="footer">
        <p>
          © 2026 AI-Driven Event Ticket Booking System
        </p>
      </footer>

    </div>
  )
}

export default App