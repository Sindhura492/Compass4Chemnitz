import threading
import time
from django.core.management import call_command
from django.core.management.commands.runserver import Command as RunServerCommand

class Command(RunServerCommand):
    help = 'Starts the Django development server and runs the update tasks for all models'

    def start_update_tasks(self):
        def start_update_task(command_name):
            def update_task():
                while True:
                    print(f"Running {command_name} update task")
                    call_command(command_name)
                    time.sleep(60)  # Run every 60 seconds

            thread = threading.Thread(target=update_task)
            thread.daemon = True
            thread.start()

        start_update_task('update_jugendberufshilfen')
        start_update_task('update_schulen')
        start_update_task('update_kindergarten')
        start_update_task('update_schulsozialarbeit')

    def handle(self, *args, **options):
        self.start_update_tasks()
        super().handle(*args, **options)
