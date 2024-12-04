// content_script.js

/* __BEGIN_ORIGIN_TRIAL__
AgbriD294+3bh8PeluBqJr2xPP69aFBKPWr0v+UnhPbo+jL8sNIbK0ElzFKOTEstKEriiCq2lDrXp+Xnb3GzrwcAAABzeyJvcmlnaW4iOiJjaHJvbWUtZXh0ZW5zaW9uOi8vZHBrZWNjYmFwcG9wYWFwYmhrYmhraW1jZ2prb2hrb2MiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ==
__END_ORIGIN_TRIAL__ */

// Rest of your content script code

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'summarize') {
      // Feature detection
      if (!('ai' in window) || !('summarizer' in window.ai)) {
        chrome.runtime.sendMessage({ error: 'Summarizer API is not supported in this browser.' });
        return;
      }
  
      // Get the main content text from the page
      const bodyText = document.body.innerText;
  
      // Limit the input size if necessary
      const maxLength = 10000; // Adjust as needed
      const textToSummarize = bodyText.substring(0, maxLength);
  
      // Initialize summarizer
      let summarizer;
      try {
        const capabilities = await window.ai.summarizer.capabilities();
        if (capabilities.available === 'no') {
          chrome.runtime.sendMessage({ error: 'Summarizer API is not available.' });
          return;
        }
  
        summarizer = await window.ai.summarizer.create({
          monitor: (monitor) => {
            monitor.addEventListener('downloadprogress', (e) => {
              // You can implement progress updates if needed
              console.log(`Download progress: ${(e.loaded / e.total) * 100}%`);
            });
          },
        });
  
        // Wait for the model to be ready
        await summarizer.ready;
      } catch (error) {
        chrome.runtime.sendMessage({ error: 'Error initializing summarizer: ' + error.message });
        return;
      }
  
      // Perform summarization
      try {
        const summary = await summarizer.summarize(textToSummarize);
        // Send the summary back to the popup
        chrome.runtime.sendMessage({ summary: summary });
      } catch (error) {
        chrome.runtime.sendMessage({ error: 'Error during summarization: ' + error.message });
      }
    }
  });
  