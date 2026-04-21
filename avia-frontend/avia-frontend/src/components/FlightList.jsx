import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plane, Calendar, Clock, ArrowRight, CornerDownRight, Zap } from 'lucide-react';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // Фейковые данные на случай, если бэкенд спит
  const mockFlights = [
    { id: 1, from_city: 'TASH', to_city: 'NYC', number_of_race: 'HY-101', flight_date: '2026-04-22', flight_time: '10:30' },
    { id: 2, from_city: 'LDN', to_city: 'TASH', number_of_race: 'UZ-202', flight_date: '2026-04-23', flight_time: '14:15' }
  ];

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/flights/list/')
      .then(res => {
        setFlights(res.data.results.length > 0 ? res.data.results : mockFlights);
        setLoading(false);
      })
      .catch(err => {
        console.log("Бэкенд не ответил, грузим демо-рейсы");
        setFlights(mockFlights);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-skyflow font-bold animate-pulse">Ищем лучшие предложения...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {flights.map((flight) => (
        <div key={flight.id} className="bg-white rounded-[32px] p-9 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-sky-500/20 hover:shadow-sky-500/10 transition-all duration-500 group">
          <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 bg-slate-50 rounded-[18px] flex items-center justify-center group-hover:bg-[#0C73FE] group-hover:text-white transition-all duration-500 border border-slate-100">
              <Plane className="w-7 h-7 rotate-45" />
            </div>
            <div className="text-right">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Race</p>
                <p className="font-bold text-slate-950 text-xl tracking-tight bg-slate-100 px-4 py-1.5 rounded-xl">{flight.number_of_race}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-10">
            <div className="text-center">
              <p className="text-5xl font-black text-slate-950 tracking-[-0.07em]">{flight.from_city}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase">Departure</p>
            </div>
            <div className="flex-1 flex justify-center px-6 text-slate-200 group-hover:text-[#0C73FE] transition-colors">
                <ArrowRight className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="text-5xl font-black text-slate-950 tracking-[-0.07em]">{flight.to_city}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase">Arrival</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-7 border-t border-slate-50 mb-9 bg-slate-50 rounded-2xl p-6">
            <div className="flex items-center gap-3.5">
              <Calendar className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-bold text-slate-900">{flight.flight_date}</span>
            </div>
            <div className="flex items-center gap-3.5">
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-bold text-slate-900">{flight.flight_time}</span>
            </div>
          </div>

          <button className="w-full bg-slate-950 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#0C73FE] transition-all active:scale-95 shadow-lg shadow-slate-900/10">
            Book ticket &rarr;
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
