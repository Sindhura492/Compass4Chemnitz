import schedule
import time
import requests
from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from chemnitz_api_backend.models import Schulen
from django.core.exceptions import MultipleObjectsReturned

class Command(BaseCommand):
    help = 'Updates the Schulen model every 5 minutes'

    def handle(self, *args, **options):
        print("Scheduling Schulen update task...")
        schedule.every(60).seconds.do(self.update_model)

        print("Starting scheduled tasks...")
        while True:
            schedule.run_pending()
            time.sleep(1)

    def update_model(self):
        print("Running Schulen update task...")
        url = 'https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
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
                    existing_object = Schulen.objects.get(OBJECTID=object_id)
                    print(f"Object with OBJECTID {object_id} already exists. Skipping...")
                except ObjectDoesNotExist:
                    new_object = Schulen.objects.create(
                        X=x,
                        Y=y,
                        OBJECTID=object_id,
                        TYP=attributes.get('TYP', ''),
                        ART=attributes.get('ART', ''),
                        STANDORTTYP=attributes.get('STANDORTTYP', ''),
                        BEZEICHNUNG=attributes.get('BEZEICHNUNG', ''),
                        BEZEICHNUNGZUSATZ=attributes.get('BEZEICHNUNGZUSATZ', ''),
                        KURZBEZEICHNUNG=attributes.get('KURZBEZEICHNUNG', ''),
                        STRASSE=attributes.get('STRASSE', ''),
                        PLZ=attributes.get('PLZ', ''),
                        ORT=attributes.get('ORT', ''),
                        TELEFON=attributes.get('TELEFON', ''),
                        EMAIL=attributes.get('EMAIL', ''),
                        FAX=attributes.get('FAX', ''),
                        PROFILE=attributes.get('PROFILE', ''),
                        SPRACHEN=attributes.get('SPRACHEN', ''),
                        WWW=attributes.get('WWW', ''),
                        TRAEGER=attributes.get('TRAEGER', ''),
                        TRAEGERTYP=attributes.get('TRAEGERTYP', ''),
                        BEZUGNR=attributes.get('BEZUGNR', ''),
                        GEBIETSARTNUMMER=attributes.get('GEBIETSARTNUMMER', ''),
                        SNUMMER=attributes.get('SNUMMER', ''),
                        NUMMER=attributes.get('NUMMER', ''),
                        GlobalID=attributes.get('GlobalID', ''),
                        CreationDate=attributes.get('CreationDate', ''),
                        Creator=attributes.get('Creator', ''),
                        EditDate=attributes.get('EditDate', ''),
                        Editor=attributes.get('Editor', ''),
                    )
                    print("New object created in Schulen")
                except MultipleObjectsReturned:
                    print(f"Multiple objects returned for OBJECTID {object_id}. Skipping...")
        else:
            print("No features found in the fetched data")
