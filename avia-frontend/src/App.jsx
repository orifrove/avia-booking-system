import { useState, useEffect } from 'react'
import './index.css'

const API = 'http://127.0.0.1:8000/api'

export default function App() {
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [stats, setStats] = useState({ flights: 0, cities: 0, aircraft: 0 })

  useEffect(() => {
    fetchFlights()
  }, [page, search, fromCity, toCity])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [f, a] = await Promise.all([
        fetch(`${API}/flights/`),
        fetch(`${API}/aircraft/`)
      ])
      const fd = await f.json()
      const ad = await a.json()
      const allFlights = fd.results || fd
      const cities = new Set()
      allFlights.forEach(f => { cities.add(f.from_city); cities.add(f.to_city) })
      setStats({
        flights: fd.count || allFlights.length,
        cities: cities.size,
        aircraft: ad.count || (ad.results || ad).length
      })
    } catch {}
  }

  const fetchFlights = async () => {
    setLoading(true)
    setError(null)
    try {
      let url = `${API}/flights/?page=${page}`
      if (search) url += `&search=${search}`
      if (fromCity) url += `&from_city=${fromCity}`
      if (toCity) url += `&to_city=${toCity}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Ошибка загрузки')
      const data = await res.json()
      if (data.results) {
        setFlights(data.results)
        setTotalPages(Math.ceil(data.count / 5))
      } else {
        setFlights(data)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchFlights()
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">AVIA<span>CO</span></div>
        <ul className="nav-links">
          <li><a href="#" className="active">Рейсы</a></li>
          <li><a href="#">Бронирование</a></li>
          <li><a href="#">О нас</a></li>
        </ul>
        <button className="nav-btn">Войти</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <h1 className="hero-title">
              ЛЕТИТЕ<br />
              <span className="accent">ВЫШЕ</span><br />
              МЕЧТАЙТЕ
            </h1>
            <p className="hero-sub">
              Бронируйте рейсы по всему миру. Лучшие цены, комфортные перелёты, незабываемые путешествия.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => document.querySelector('.search-section').scrollIntoView({behavior:'smooth'})}>
                Найти рейс
              </button>
              <button className="btn-outline">Узнать больше</button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-num">{stats.flights}+</div>
              <div className="stat-label">Активных рейсов</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{stats.cities}+</div>
              <div className="stat-label">Направлений</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{stats.aircraft}+</div>
              <div className="stat-label">Воздушных судов</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section">
        <div className="search-wrap">
          <div className="search-title">— ПОИСК РЕЙСОВ</div>
          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-group">
              <label>Откуда</label>
              <input
                type="text"
                placeholder="Ташкент"
                value={fromCity}
                onChange={e => setFromCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Куда</label>
              <input
                type="text"
                placeholder="Москва"
                value={toCity}
                onChange={e => setToCity(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Поиск</label>
              <input
                type="text"
                placeholder="Номер рейса, город..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Найти</button>
          </form>
        </div>
      </section>

      {/* FLIGHTS */}
      <section className="flights-section">
        <div className="section-header">
          <h2 className="section-title">— РЕЙСЫ</h2>
          <span className="section-count">{flights.length} найдено</span>
        </div>

        {loading && (
          <div className="loading">
            <span/><span/><span/>
          </div>
        )}

        {error && <div className="error-msg">⚠ {error}</div>}

        {!loading && !error && flights.length === 0 && (
          <div className="empty-msg">Рейсы не найдены</div>
        )}

        {!loading && !error && (
          <div className="flights-grid">
            {flights.map((flight, i) => (
              <div
                key={flight.id}
                className="flight-card"
                style={{ animationDelay: `${i * 0.08}s` }}
                onClick={() => setSelected(flight)}
              >
                <div className="flight-number">{flight.number_of_race}</div>
                <div className="flight-route">
                  <div className="flight-city">{flight.from_city?.slice(0,3).toUpperCase()}</div>
                  <div className="flight-arrow">✈</div>
                  <div className="flight-city">{flight.to_city?.slice(0,3).toUpperCase()}</div>
                </div>
                <div className="flight-meta">
                  <div>
                    <div className="flight-time">{flight.flight_date}</div>
                    <div className="flight-time">{flight.flight_time}</div>
                  </div>
                  {flight.price && (
                    <div className="flight-price">${flight.price}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i+1}
                className={`page-btn ${page === i+1 ? 'active' : ''}`}
                onClick={() => setPage(i+1)}
              >
                {i+1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* MODAL */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            <div className="modal-title">ДЕТАЛИ РЕЙСА</div>
            <div className="modal-row">
              <span className="modal-label">Номер рейса</span>
              <span className="modal-value">{selected.number_of_race}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">Откуда</span>
              <span className="modal-value">{selected.from_city}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">Куда</span>
              <span className="modal-value">{selected.to_city}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">Дата</span>
              <span className="modal-value">{selected.flight_date}</span>
            </div>
            <div className="modal-row">
              <span className="modal-label">Время</span>
              <span className="modal-value">{selected.flight_time}</span>
            </div>
            {selected.price && (
              <div className="modal-price">${selected.price}</div>
            )}
            <button className="btn-primary" style={{width:'100%', marginTop:'1rem'}}>
              Забронировать
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">AVIACO</div>
        <div className="footer-copy">© 2026 AviaCo. Все права защищены.</div>
      </footer>
    </>
  )
}
