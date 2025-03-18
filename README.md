
# Vehicle Valuation Explorer - Chrome Extension

A beautifully designed Chrome extension that allows you to quickly retrieve vehicle valuations based on registration numbers.

## Features

- Clean, minimalist interface inspired by Apple design principles
- Smooth animations and transitions
- Registration number validation
- Optional mileage input for more accurate valuations
- Recent search history
- API key management

## Installation

### From Source Code

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run build
   ```
4. In Chrome, go to `chrome://extensions/`
5. Enable "Developer mode" in the top right
6. Click "Load unpacked" and select the `dist` folder from this project

## Development

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. In Chrome, load the extension as described in the Installation section
4. Make changes to the code and see them reflected after refreshing the extension

## API Key

This extension requires an API key from [Vehicle Search](https://api.vehicle-search.co.uk/). You can enter your API key in the extension's settings.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
