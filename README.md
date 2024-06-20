# Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) and npm
- [Python](https://www.python.org/) and pip
- [MySQL Server](https://dev.mysql.com/downloads/installer/)
  
# Installation and Setup


## React(Frontend) Setup

#### 1. Navigate to the frontend directory:
        cd frontend


#### 2. Install the required packages:
        npm install

#### 3. Configure environment variables:
   Navigate to .env file in the frontend directory replace your_google_maps_api_key with your actual API key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
### Running the Application

#### 1. Start the frontend development server:
        npm run dev

#### 2. Access the application:
Open your browser and go to http://localhost:5173 (or the URL provided by Vite).

## Django(Backend) Setup

#### 1. In the new terminal, navigate to the backend directory:
          cd backend

  
#### 2. Install the required packages:
          pip install -r requirements.txt


#### 3. Configure the database settings: 
Open backend/chemnitz_project/chemnitz_project/settings.py and update the DATABASES section to connect to your MySQL database:

      DATABASES = {
          'default': {
              'ENGINE': 'django.db.backends.mysql',
              'NAME': 'your_database_name',
              'USER': 'your_username',
              'PASSWORD': 'your_password',
              'HOST': 'localhost',
              'PORT': '3306',
          }
      }

#### 4. Create database in Mysql


#### 5. Apply database migrations:
        python manage.py migrate

#### 6. Start the Django development server:
          python manage.py runserver_compass4chemnitz














          
