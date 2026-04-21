import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plane, Calendar, Clock, ArrowRight, CornerDownRight, Zap } from 'lucide-react';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Подключаемся к твоему Django API
    axios.get('http://127.0.0.1:8000/api/flights/list/')
      .then(res => {
        setFlights(res.data.results);
        setLoading(false);
      })
      .catch(err => console.error("Ошибка API:", err));
  }, []);

  if (loading) return (
    <div className="text-center py-20 text-sky-600 font-bold animate-pulse text-sm">
        <Plane className="w-12 h-12 mx-auto mb-5 rotate-45" />
        Ищем лучшие предложения...
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {flights.map((flight) => (
        <div key={flight.id} className="bg-white rounded-[32px] p-9 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-sky-100 hover:shadow-sky-500/10 transition-all duration-500 group flex flex-col justify-between">
          <div>
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
                <div className="w-14 h-14 bg-slate-50 rounded-[18px] flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-sm shadow-slate-200/50 border border-slate-100">
                  <Plane className="w-7 h-7 rotate-45" />
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Race</p>
                    <p className="font-bold text-slate-950 text-xl tracking-tight bg-slate-100 px-4 py-1.5 rounded-xl">{flight.number_of_race}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-10 pt-2">
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-950 tracking-[-0.07em]">{flight.from_city}</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase flex items-center justify-center gap-1.5"><CornerDownRight className="w-3.5 h-3.5"/> Departure</p>
                </div>
                
                <div className="flex-1 flex justify-center px-6">
                    <div className="w-full border-t-2 border-dashed border-slate-100 relative">
                        <ArrowRight className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 text-slate-200 group-hover:text-sky-500 transition-colors" />
                    </div>
                </div>
                
                <div className="text-center">
                  <p className="text-5xl font-black text-slate-950 tracking-[-0.07em]">{flight.to_city}</p>
                  <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase flex items-center justify-center gap-1.5">Arrival <Zap className="w-3.5 h-3.5 text-sky-500/50"/></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-7 border-t border-slate-50 mb-9 bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center gap-3.5 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100"><Calendar className="w-5 h-5" /></div>
                  <div>
                      <span className="text-xs text-slate-400 font-medium">Date</span>
                      <span className="block text-sm font-bold text-slate-900">{flight.flight_date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 text-slate-600">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-100"><Clock className="w-5 h-5" /></div>
                  <div>
                      <span className="text-xs text-slate-400 font-medium">Time</span>
                      <span className="block text-sm font-bold text-slate-900">{flight.flight_time}</span>
                  </div>
                </div>
              </div>
          </div>

          <button className="w-full bg-slate-950 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-sky-600 hover:shadow-sky-500/30 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
            Book ticket &rarr;
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
