import FlightList from './components/FlightList';
import { Plane, Search, Calendar, User, LayoutGrid, BarChart3, Bell, Menu } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#FDFEFE] font-['Geist_Mono',sans-serif] text-slate-900 antialiased overflow-x-hidden">
      
      {/* ПРЕМИАЛЬНЫЙ НАВИГАТОР */}
      <nav className="fixed top-0 left-0 right-0 h-[80px] bg-white/60 backdrop-blur-3xl border-b border-slate-100 z-[100] px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[45px] h-[45px] bg-sky-600 rounded-3xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Plane className="w-5 h-5 text-white rotate-[-15deg]"/>
            </div>
            <h1 className="text-2xl font-black italic tracking-[-0.07em] uppercase">Sky<span className="text-sky-600">Flow</span></h1>
            <span className="hidden md:inline bg-sky-50 text-sky-700 text-[10px] font-bold px-2.5 py-1 rounded-full ml-1">Beta 0.8</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-100 rounded-full">
              {[ { name: 'Dashboard', icon: LayoutGrid }, { name: 'My Flights', icon: Plane }, { name: 'Statistics', icon: BarChart3 } ].map((item, idx) => (
                  <button key={item.name} className={`${idx === 0 ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'} flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold transition-all`}>
                    <item.icon className="w-4 h-4" /> {item.name}
                  </button>
              ))}
          </div>

          <div className="flex items-center gap-3">
              <button className="hidden sm:flex w-12 h-12 rounded-full bg-slate-50 border border-slate-100 items-center justify-center text-slate-400 hover:border-slate-200 transition-colors">
                  <Bell className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2.5 bg-slate-900 px-7 py-3 rounded-full text-white text-sm font-bold shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.97] transition-all">
                  <User className="w-5 h-5" /> profile
              </button>
               <button className="flex lg:hidden w-12 h-12 rounded-full bg-slate-50 border border-slate-100 items-center justify-center text-slate-600">
                  <Menu className="w-5 h-5" />
              </button>
          </div>
      </nav>

      {/* ГЛАВНЫЙ КОНТЕНТ */}
      <main className="max-w-[1700px] mx-auto pt-[130px] pb-32 px-6 md:px-12">
        <header className="mb-20 grid grid-cols-1 xl:grid-cols-[1fr,450px] gap-12 items-end">
            <div>
              <div className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em] mb-3">#AVIA.GLOBAL</div>
              <h2 className="text-6xl md:text-7xl font-black tracking-[-0.05em] leading-[0.9] max-w-[900px]">
                Найди свой идеальный <span className="text-sky-600 relative">маршрут <div className="absolute left-0 bottom-[10px] w-full h-[6px] bg-sky-200 rounded-full -z-10"></div></span>. В любое время.
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-[450px] self-end xl:mb-1">
              SkyFlow Core™ — это премиальный сервис бронирования, созданный для тех, кто ценит время, комфорт и безупречный цифровой опыт.
            </p>
        </header>

        {/* СЕКЦИЯ ПОИСКА (Бенто Дизайн) */}
        <section className="bg-white p-12 rounded-[40px] shadow-2xl shadow-slate-200/40 border border-slate-100 mb-20 grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-8">
            {[ { icon: MapPin, title: 'From', value: 'New York (JFK)', sub: 'John F. Kennedy Intl' }, { icon: MapPin, title: 'To', value: 'San Francisco (SFO)', sub: 'San Francisco Intl' }, { icon: Calendar, title: 'Date', value: 'Dec 12, 2026', sub: 'One Way' } ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start pt-1">
                    <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{item.title}</div>
                        <p className="text-xl font-bold text-slate-800">{item.value}</p>
                        <p className="text-sm font-medium text-slate-400 mt-0.5">{item.sub}</p>
                    </div>
                </div>
            ))}
            <button className="w-full md:w-auto px-10 py-5 h-[68px] bg-slate-900 rounded-[20px] text-white font-black uppercase text-xs tracking-widest hover:bg-sky-600 transition-colors flex items-center justify-center gap-3">
                <Search className="w-4 h-4" /> search flights
            </button>
        </section>
        
        {/* СПИСОК РЕЙСОВ */}
        <div className="mb-10 flex justify-between items-center">
            <h3 className="text-2xl font-black tracking-tighter">Найдено 115 рейсов</h3>
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-100 rounded-full">
                {['Price', 'Duration', 'Departure'].map((item, idx) => (
                    <button key={item} className={`${idx === 0 ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:text-slate-800'} px-5 py-2 rounded-full text-xs font-bold`}>
                        Sort by {item}
                    </button>
                ))}
            </div>
        </div>
        
        <FlightList />
      </main>
    </div>
  );
}

import { MapPin } from 'lucide-react';

export default App;
