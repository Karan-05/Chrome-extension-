
### **Project Title: Gemini Cloud Analytics Chrome Extension**

**Project URL:** [GitHub Repository URL](https://github.com/Karan-05/Chrome-extension-)

**Video Demonstration:** [YouTube/Vimeo Video URL]

#### **Description:**

**Gemini Cloud Analytics** is a Chrome Extension designed to enhance user productivity by giving real-time Cloud Analytics powered by AI text summarization. It leverages Chrome’s built-in AI models, Gemini, and Google Cloud's Monitoring APIs, providing users with concise summaries of their inputted text alongside insightful CPU utilization metrics. 

_**NOTE: This can be scaled with additional metrics from Cloud, but for the demonstration of idea, we built the pipeline for only CPU Utilization metric.**_

To demonstrate this concept, we initiated a VM instance on our Google Cloud Platform (GCP) project and summarized its CPU utilization. This approach showcases how complex cloud analytics metric details, which can often be cumbersome to understand, can be transformed into simple, understandable, and readable formats. We created a service account in our cloud project to facilitate data access securely. The core framework follows a process where cloud metrics are fetched and summarized using suitable APIs. The data is processed through the main.py script, which runs the server and fetches the data from the cloud.

#### **APIs and Technologies Used:**

1. **Chrome Extensions APIs:**
   - **Prompt API for Web and Extensions:** Facilitates interaction between the extension and the browser's native features.
   - **Summarization API:** Utilizes Gemini to generate concise summaries of user-provided text.
   - **Write API & Rewrite API:** Enables dynamic content generation and modification within the extension.

2. **Google Cloud Platform:**
   - **Cloud Functions:** Hosts the backend service responsible for fetching CPU utilization metrics.
   - **Cloud Monitoring API:** Retrieves real-time CPU performance data from Google Cloud resources.

3. **Libraries and Frameworks:**
   - **CryptoJS:** Implements cryptographic functions to secure data transmission.
   - **Flask:** Powers the Python-based Cloud Function for handling HTTP requests.

#### **Problem Statement:**

In today’s fast-paced digital environment, users often need to process large amounts of text quickly while also keeping an eye on their system's performance. Existing tools typically address either content summarization or system monitoring separately. **Gemini Cloud Analytics** bridges this gap by providing an integrated solution that offers both functionalities within a single Chrome Extension. This dual capability enhances user efficiency by delivering actionable insights into both textual data and system performance metrics.

#### **Key Features:**

- **Seamless Text Summarization:** Users can input any text, and the extension will provide a concise summary, saving time and improving information digestion.
- **Real-Time CPU Monitoring:** Fetches and displays CPU utilization metrics, helping users monitor system performance directly from their browser.
- **Summarized Metrics:** Beyond raw data, the extension offers summarized insights into CPU performance, making it easier to understand and act upon.
- **User-Friendly Interface:** Intuitive design ensures that both summarization and monitoring features are easily accessible and understandable.
