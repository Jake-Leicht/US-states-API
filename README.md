# US States Distance API
## About

This project is a nice simple project to become more familiar with REST API's and handling data from them. This API takes two (A and B) states as inputs and calculates the distance in miles/kilometers of their respective capitals.
The program does this by pulling latitude and longitude coordinates from the API using the inputs, then uses those coordinates for the haversine formula to get the distance between point A and B.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* HTML
* CSS
* JavaScript
* RapidAPI

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* I used VS Code's 'Live Server' extension to compile my code

### Installation
If you wish to use this code for your own purpose, I suggest getting your own API Key

1. Get a free API Key at [https://rapidapi.com/hub)
2. Clone the repo
   ```sh
   git clone https://github.com/Jake-Leicht/US-states-API.git
   ```
4. Enter your API in `config.js`
   ```js
   const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ENTER KEY HERE',
		'X-RapidAPI-Host': 'us-states.p.rapidapi.com'
	}

<p align="right">(<a href="#readme-top">back to top</a>)</p>
