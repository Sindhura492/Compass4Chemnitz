import schedule
import time
import requests
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from chemnitz_api_backend.models import Kindergarten

class Command(BaseCommand):
    help = 'Updates the Kindergarten model every 5 minutes'

    def handle(self, *args, **options):
        print("Scheduling Kindergarten update task...")
        schedule.every(60).seconds.do(self.update_model)

        print("Starting scheduled tasks...")
        while True:
            schedule.run_pending()
            time.sleep(1)

    def update_model(self):
        print("Running Kindergarten update task...")
        url = 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            self.process_data(data)
        else:
            print("Failed to fetch data")

    def process_data(self, data):
        print("Processing fetched data...")
        if 'features' in data:
            for feature in data['features']:
                attributes = feature.get('attributes', {})
                geometry = feature.get('geometry', {})
                x = geometry.get('x', 0)
                y = geometry.get('y', 0)
                object_id = attributes.get('OBJECTID', '')
                try:
                    existing_object = Kindergarten.objects.get(OBJECTID=object_id)
                    print(f"Object with OBJECTID {object_id} already exists. Skipping...")
                except ObjectDoesNotExist:
                        new_object = Kindergarten.objects.create(
                        X=x,
                        Y=y,
                        OBJECTID=object_id,
                        TRAEGER=attributes.get('TRAEGER', ''),
                        BEZEICHNUNG=attributes.get('BEZEICHNUNG', ''),
                        KURZBEZEICHNUNG=attributes.get('KURZBEZEICHNUNG', ''),
                        STRASSE=attributes.get('STRASSE', ''),
                        STRSCHL=attributes.get('STRSCHL', ''),
                        HAUSBEZ=attributes.get('HAUSBEZ', ''),
                        PLZ=attributes.get('PLZ', ''),
                        ORT=attributes.get('ORT', ''),
                        HORT=attributes.get('HORT', ''),
                        KITA=attributes.get('KITA', ''),
                        URL=attributes.get('URL', ''),
                        TELEFON=attributes.get('TELEFON', ''),
                        FAX=attributes.get('FAX', ''),
                        EMAIL=attributes.get('EMAIL', ''),
                        BARRIEREFREI=attributes.get('BARRIEREFREI', True),
                        INTEGRATIV=attributes.get('INTEGRATIV', True),
                    )
                print("New object created in Kindergarten")
        else:
            print("No features found in the fetched data")
