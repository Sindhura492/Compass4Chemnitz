import schedule
import time
import requests
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from chemnitz_api_backend.models import Jugendberufshilfen
from django.core.exceptions import MultipleObjectsReturned

class Command(BaseCommand):
    help = 'Updates the Jugendberufshilfen model every 5 minutes'

    def handle(self, *args, **options):
        print("Scheduling Jugendberufshilfen update task...")
        schedule.every(60).seconds.do(self.update_model)

        print("Starting scheduled tasks...")
        while True:
            schedule.run_pending()
            time.sleep(1)

    def update_model(self):
        print("Running Jugendberufshilfen update task...")
        url = 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
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
                    existing_object = Jugendberufshilfen.objects.get(OBJECTID=object_id)
                    print(f"Object with OBJECTID {object_id} already exists. Skipping...")
                except ObjectDoesNotExist:
                    new_object = Jugendberufshilfen.objects.create(
                        X=x,
                        Y=y,
                        OBJECTID=object_id,
                        TRAEGER=attributes.get('TRAEGER', ''),
                        LEISTUNGEN=attributes.get('LEISTUNGEN', ''),
                        BEZEICHNUNG=attributes.get('BEZEICHNUNG', ''),
                        KURZBEZEICHNUNG=attributes.get('KURZBEZEICHNUNG', ''),
                        STRASSE=attributes.get('STRASSE', ''),
                        PLZ=attributes.get('PLZ', ''),
                        ORT=attributes.get('ORT', ''),
                        TELEFON=attributes.get('TELEFON', ''),
                        EMAIL=attributes.get('EMAIL', ''),
                        FAX=attributes.get('FAX', ''),
                    )
                    print("New object created in Jugendberufshilfen")
                except MultipleObjectsReturned:
                    print(f"Multiple objects returned for OBJECTID {object_id}. Skipping...")
        else:
            print("No features found in the fetched data")
