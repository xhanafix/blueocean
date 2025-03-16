# Blue Ocean Sales Script Generator

A web-based application that generates compelling sales scripts for products or services using the Blue Ocean Strategy technique. The application is powered by the Google/LearnLM-1.5-Pro-Experimental model via the OpenRouter API.

## Features

- Clean and modern user interface
- Secure storage of OpenRouter API key in browser's local storage
- Generate sales scripts based on product/service descriptions
- Edit generated sales scripts
- Copy sales scripts to clipboard
- Responsive design for all devices
- Bilingual support for English and Bahasa Malaysia
- Markdown formatting for scannable, easy-to-read sales scripts
- Customizable output format options (headings, bullet points, bold emphasis)
- Toggle between formatted view and raw markdown
- Helpful tooltips for guidance
- Personalized Blue Ocean Strategy analysis specific to your product or service
- Dark/light theme toggle with persistent preference
- Smooth scrolling for better user experience

## How to Use

1. **Choose Your Language and Theme**
   - Select your preferred language (English or Bahasa Malaysia) from the dropdown menu
   - Toggle between light and dark theme using the switch in the top-right corner

2. **Set Up Your API Key**
   - Sign up for an account at [OpenRouter](https://openrouter.ai/)
   - Generate an API key from your OpenRouter dashboard
   - Enter your API key in the application and click "Save API Key"

3. **Customize Format Options**
   - Choose which formatting elements to include in your sales script:
     - Headings: Organize content with clear section titles
     - Bullet Points: Present key points in easy-to-scan lists
     - Bold Emphasis: Highlight important information with bold text

4. **Generate a Sales Script**
   - Enter a detailed description of your product or service in the text area
   - Click the "Generate Sales Script" button
   - Wait for the AI to generate your sales script (this may take a few seconds)

5. **View and Use Your Sales Script**
   - Review the generated sales script in the formatted view
   - Read the personalized Blue Ocean Strategy note at the end to understand how your specific product/service creates uncontested market space
   - Toggle between formatted view and raw markdown using the "Show Raw Markdown" button
   - Edit the script if needed
   - Copy to clipboard for use elsewhere

## Blue Ocean Strategy

The Blue Ocean Strategy is a business theory that suggests companies are better off searching for ways to gain "uncontested market space" rather than competing with similar businesses. This application uses this strategy to create sales scripts that:

- Highlight unique value propositions
- Eliminate pain points
- Create new demand
- Make your offering irresistible to potential customers

Each generated script includes a personalized analysis explaining how your specific product or service applies Blue Ocean Strategy principles to create its own market space and differentiate from competitors.

## Technical Details

- Built with HTML, CSS, and JavaScript
- Uses the Fetch API to communicate with the OpenRouter API
- Securely stores API keys in the browser's local storage
- Implements error handling for API requests
- Supports both English and Bahasa Malaysia languages
- Uses Marked.js for markdown parsing and rendering
- Uses Tippy.js for interactive tooltips
- Implements CSS variables for theme switching
- Uses smooth scrolling for better navigation

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Select your preferred language and theme
4. Enter your OpenRouter API key
5. Customize format options
6. Start generating compelling sales scripts!

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Powered by OpenRouter API with Google/LearnLM-1.5-Pro-Experimental model
- Inspired by the Blue Ocean Strategy by W. Chan Kim and Renée Mauborgne
- Uses [Marked.js](https://marked.js.org/) for markdown parsing
- Uses [Tippy.js](https://atomiks.github.io/tippyjs/) for tooltips

## Copyright

© [hanafihassan.com](https://hanafihassan.com) 2025. All rights reserved.  
GitHub: [github.com/xhanafix](https://github.com/xhanafix) 