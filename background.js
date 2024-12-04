// background.js

/* __BEGIN_ORIGIN_TRIAL__
AgbriD294+3bh8PeluBqJr2xPP69aFBKPWr0v+UnhPbo+jL8sNIbK0ElzFKOTEstKEriiCq2lDrXp+Xnb3GzrwcAAABzeyJvcmlnaW4iOiJjaHJvbWUtZXh0ZW5zaW9uOi8vZHBrZWNjYmFwcG9wYWFwYmhrYmhraW1jZ2prb2hrb2MiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ==
__END_ORIGIN_TRIAL__ */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarize') {
      // Get the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log('Tabs:', tabs);
        const tab = tabs[0];
        if (!tab || !tab.id) {
          console.error('No active tab found.');
          sendResponse({ error: 'No active tab found.' });
          return;
        }
        console.log('Active tab:', tab);
  
        // Inject content script into the active tab
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ['content_script.js'],
          },
          () => {
            if (chrome.runtime.lastError) {
              console.error('Error injecting content script:', chrome.runtime.lastError);
              sendResponse({ error: 'Error injecting content script: ' + chrome.runtime.lastError.message });
              return;
            }
  
            // Send a message to the content script to start summarization
            chrome.tabs.sendMessage(tab.id, { action: 'summarize' }, (response) => {
              if (chrome.runtime.lastError) {
                console.error('Error sending message to content script:', chrome.runtime.lastError);
                sendResponse({ error: 'Error sending message to content script: ' + chrome.runtime.lastError.message });
                return;
              }
  
              sendResponse(response);
            });
          }
        );
      });
  
      // Keep the message channel open for sendResponse
      return true;
    }
  });