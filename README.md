
# **Gemini Cloud Analytics Chrome Extension**

**Project URL:** [GitHub Repository URL](https://github.com/Karan-05/Chrome-extension-)

**Video Demonstration:** [YouTube/Vimeo Video URL]

## **Problem Statement:**

In today’s fast-paced digital environment, users often need to process large amounts of text quickly while also keeping an eye on their system's performance. Existing tools typically address either content summarization or system monitoring separately. **Gemini Cloud Analytics** bridges this gap by providing an integrated solution that offers both functionalities within a single Chrome Extension. This dual capability enhances user efficiency by delivering actionable insights into both textual data and system performance metrics.

## **Description:**

**Gemini Cloud Analytics** is a Chrome Extension designed to enhance user productivity by giving real-time Cloud Analytics powered by AI text summarization. It leverages Chrome’s built-in AI models, Gemini, and Google Cloud's Monitoring APIs, providing users with concise summaries of their inputted text alongside insightful CPU utilization metrics. 

_**NOTE: This can be scaled with additional metrics from Cloud, but for the demonstration of idea, we built the pipeline for only CPU Utilization metric.**_

To demonstrate this concept, we initiated a VM instance on our Google Cloud Platform (GCP) project and summarized its CPU utilization. This approach showcases how complex cloud analytics metric details, which can often be cumbersome to understand, can be transformed into simple, understandable, and readable formats. We created a service account in our cloud project to facilitate data access securely. The core framework follows a process where cloud metrics are fetched and summarized using suitable APIs. The data is processed through the main.py script, which runs the server and fetches the data from the cloud.

## **APIs and Technologies Used:**

1. **Chrome Extensions APIs:**
   - **Prompt API for Web and Extensions:** Facilitates interaction between the extension and the browser's native features.
   - **Summarization API:** Utilizes Gemini to generate concise summaries of user-provided text.
   - **Write API & Rewrite API:** Enables dynamic content generation and modification within the extension.

2. **Google Cloud Platform:**
   - **Cloud Logging API**: Provides a centralized platform for managing logs and monitoring system events in Google Cloud.
   - **Cloud Monitoring API**: Enables the collection and management of performance data and system metrics across cloud services.
   - **Compute Engine API**: Provides access to virtual machine instances, allowing users to manage cloud infrastructure.
   - **Cloud Functions API**: Facilitates the creation, deployment, and management of serverless functions in Google Cloud.
   - **Artifact Registry API**: Manages storage and distribution of container images, artifacts, and other resources.
   - **Cloud Pub/Sub API**: Allows for asynchronous messaging and event-driven architecture by facilitating communication between applications.
   - **Cloud Build API**: Supports continuous integration and delivery by automating builds, tests, and deployments for applications.
   - **Identity and Access Management (IAM) API**: Manages authentication, authorization, and access control to Google Cloud resources.
   - **Cloud Run Admin API**: Provides management features for deploying and scaling containerized applications in a fully managed environment.

3. **Libraries and Frameworks:**
   - **Flask**: A lightweight WSGI web application framework in Python. Used in `main.py` to create the backend server that interacts with Google Cloud APIs.
   - **google-cloud-monitoring**: The official Python client library for Google Cloud Monitoring, used in `main.py` to fetch CPU utilization metrics from Google Cloud.
   - **google-protobuf**: A Python library for working with Protocol Buffers, used in `main.py` to convert datetime objects to protobuf Timestamps.
   - **Chrome Extensions APIs**: Used in `app.js`, `background.js`, and `content_script.js` to enable interaction between the extension and the browser, including communication with the content script and handling user actions.
   - **AI Summarizer API**: Used in `app.js` and `content_script.js` to access the Gemini AI model for text summarization.
   - **CryptoJS**: Used for cryptographic functions in securing data transmission (not directly referenced in the code provided but typically used in Chrome extensions for secure communications).
   - **CORS (Cross-Origin Resource Sharing)**: Configured in `main.py` to allow the extension to interact with the Flask server via browser-based HTTP requests.

## File Descriptions

### **main.py**
- **Function**: 
  - This file contains the Flask server that interacts with the Google Cloud Monitoring API to fetch CPU utilization metrics from Google Cloud. 
  - It listens for HTTP requests, processes the request to fetch metric data, and responds with summarized CPU utilization metrics (average, maximum, minimum) for a specified time range. 
  - The server is also set up to handle CORS headers for communication with the Chrome extension.
  - The entry point for Cloud Functions is also defined here.

### **app.js**
- **Function**: 
  - This script is used by the Chrome extension popup to initiate text summarization.
  - When the user clicks the summarize button, it checks for text input, verifies if the Summarizer API is supported in the browser, and then requests a summary using the Gemini AI model.
  - The script handles capabilities checks, monitors model download progress, and displays the summarized text to the user.

### **background.js**
- **Function**: 
  - This background script listens for messages from the Chrome extension popup and handles the process of injecting the content script into the active tab.
  - It communicates with the content script to request summarization of the text found on the current page. 
  - The background script also handles errors related to script injection and communicates the status back to the popup.

### **content_script.js**
- **Function**: 
  - This content script is injected into the active tab to extract the main content (text) from the webpage.
  - It listens for requests from the background script to perform text summarization and handles the summarization process using the Gemini Summarizer API.
  - It then sends the summarized text back to the background script, which relays it to the popup for display.

## How to Set Up Built-in Gemini Nano in Chrome

Follow these steps to enable and use Gemini Nano in Chrome:

### 1. **Install Chrome Canary**
   - Download and install **Chrome Canary version 127** or later from the official [Chrome Canary download page](https://www.google.com/chrome/canary/).

### 2. **Enable Prompt API**
   - Open Chrome and navigate to `chrome://flags/#prompt-api-for-gemini-nano`.
   - Set the flag to **Enabled**.

### 3. **Enable Optimization Guide**
   - Open Chrome and go to `chrome://flags/#optimization-guide-on-device-model`.
   - Set this flag to **Enabled BypassPerfRequirement**.
   - Restart the browser for the changes to take effect.

### 4. **Download Model**
   - Go to `chrome://components/` in the address bar.
   - Locate **"Optimization Guide On Device Model"**.
   - Ensure the model is fully downloaded. If the version shows as **0.0.0.0**, click **"Check for update"**.

### 5. **Troubleshoot**
   - If you do not see the "Optimization Guide On Device Model" option, follow these steps:
     - Disable the settings in **Step 2** and **Step 3**.
     - Restart the browser.
     - Re-enable the settings and restart Chrome again.

### 6. **Verify Setup**
   - Open any webpage in Chrome.
   - Press **F12** to open the developer tools.
   - In the console, check if `window.ai` is available to confirm that the Gemini Nano setup is complete.

## **Key Features:**

- **Seamless Text Summarization:** Users can input any text, and the extension will provide a concise summary, saving time and improving information digestion.
- **Real-Time CPU Monitoring:** Fetches and displays CPU utilization metrics, helping users monitor system performance directly from their browser.
- **Summarized Metrics:** Beyond raw data, the extension offers summarized insights into CPU performance, making it easier to understand and act upon.
- **User-Friendly Interface:** Intuitive design ensures that both summarization and monitoring features are easily accessible and understandable.
