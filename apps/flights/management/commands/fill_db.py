from django.core.management.base import BaseCommand
from apps.flights.models import Flight
import random

class Command(BaseCommand):
    help = 'Заполнение базы данных тестовыми рейсами'

    def handle(self, *args, **kwargs):
        cities = ['Tashkent', 'Moscow', 'London', 'New York', 'Tokyo', 'Dubai', 'Paris']
        flights_list = []
        
        for i in range(115):
            f_city = random.choice(cities)
            t_city = random.choice([c for c in cities if c != f_city])
            
            flight = Flight(
                number_of_race=f"AV-{1000 + i}",
                flight_date=f"2026-05-{random.randint(10, 28)}",
                flight_time=f"{random.randint(0, 23)}:{random.choice(['00', '15', '30', '45'])}",
                from_city=f_city,
                to_city=t_city,
                aircraft_id=random.randint(1, 10),
                bookings_id=random.randint(1, 50)
            )
            flights_list.append(flight)
        
        Flight.objects.bulk_create(flights_list)
        self.stdout.write(self.style.SUCCESS(f'Готово! Создано 115 записей в таблице flights.'))
