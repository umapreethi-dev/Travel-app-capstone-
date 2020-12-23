# Travel-app-capstone



## Table of content
* Description
* Prerequisites
* Installation
* To Run the server
* To Run the test
* To view the application


## Description
This project is a travel app that,  obtains a desired trip location & date from the user, 
and displays weather and an image of the location using information obtained from external APIs. 
The app has a form that gets arrival,departure place from user and also departure and return date.
The user can will get the details of image of the location , duration of the travel, days for the travel and weather information for the future 16 days of the place.
Additionally, the user can also get to know the flight details.

## Prerequisites
The project runs on a local server using Node.
The following are needed for the website:
 * Webserver - Node
 * Web application for routing - Express
 * Build tool - Webapack
 * Jest for unit testing
 * External script - Service worker(for offline functionalities)
 * External API
     ```
     Geonames API - to get latitudes,logitudes and country information
     Weatherbit API - to get weather for next 16 days
     Pixabay API - to get free image related to city
     Aviation stock - to get flight details
     ```
Create a .env file in the root of your project, which will allow not to reveal personal api keys to the public.
Save the api_key in .env file and to use it need to install
 `npm install dotenv`
Save your api keys like:
```
geoname_api_key = *****************
weather_api_key = *****************
```

## Installation
If node is installed already, use
```
npm install
```

## To run the server
Production mode:
```
npm run build-prod
npm start
```
Development mode:
```
npm run build-dev
```
## To view the application
```
http://localhost:5000
```
## Demo screenshot
![Demo_screenshot](/demo_screen/App-screenshot.png)
