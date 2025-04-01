# Currency Converter

## Description
The Currency Converter is a simple web application that allows users to convert between different currencies using real-time exchange rates. It fetches data from the Frankfurter API to ensure accurate conversion rates. Additionally, the application maintains a conversion history using local storage.

## Features
- Fetches real-time exchange rates from the Frankfurter API.
- Supports multiple international currencies.
- Provides instant conversion upon user input.
- Stores the last five conversions using local storage.
- Includes a reset button to clear inputs and history.

## Technologies Used
- HTML
- CSS
- JavaScript
- Frankfurter API

## Setup and Usage
### Prerequisites
Ensure you have a modern web browser to run the application.

### Steps to Run the Application
1. Clone the repository:
   ```sh
   git clone https://github.com/Mammet-tech/phase1-project.git
   ```
2. Navigate to the project folder:
   ```sh
   cd phase1-project
   ```
3. Open `index.html` in a web browser.

## Functionality Overview
### Currency Selection
- Users can select the currency they want to convert from and to using dropdown menus.
- The currency options are dynamically fetched from the Frankfurter API.

### Conversion
- Users enter an amount, and the conversion result is displayed instantly.
- The application automatically fetches and applies the latest exchange rates.

### Local Storage
- The last five conversions are stored in local storage and displayed on the page.
- When the page is refreshed, the conversion history remains visible.
- The reset button clears all stored conversions.

## Future Improvements
- Add more styling and animations for better user experience.
- Implement additional APIs for better accuracy and more features.
- Include a dark mode toggle.

## Author
**Edwin Mammet**

## License
This project is open-source and available under the MIT License.

