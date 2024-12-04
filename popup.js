// popup.js

/* __BEGIN_ORIGIN_TRIAL__
AgbriD294+3bh8PeluBqJr2xPP69aFBKPWr0v+UnhPbo+jL8sNIbK0ElzFKOTEstKEriiCq2lDrXp+Xnb3GzrwcAAABzeyJvcmlnaW4iOiJjaHJvbWUtZXh0ZW5zaW9uOi8vZHBrZWNjYmFwcG9wYWFwYmhrYmhraW1jZ2prb2hrb2MiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ==
__END_ORIGIN_TRIAL__ */

document.getElementById('summarizeButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value.trim();
    const summaryElement = document.getElementById('summary');
    const statusElement = document.getElementById('status');
  
    summaryElement.innerText = '';
    statusElement.innerText = '';
  
    if (!inputText) {
      statusElement.innerText = 'Please enter text to summarize.';
      return;
    }
  
    // Feature detection
    if (!('ai' in window) || !('summarizer' in window.ai)) {
      statusElement.innerText = 'Summarizer API is not supported in this browser.';
      return;
    }
  
    try {
      // Check if the model is available
      const capabilities = await window.ai.summarizer.capabilities();
  
      let summarizer;
      if (capabilities.available === 'no') {
        statusElement.innerText = 'Summarizer API is not available.';
        return;
      } else if (capabilities.available === 'readily') {
        summarizer = await window.ai.summarizer.create();
      } else if (capabilities.available === 'after-download') {
        statusElement.innerText = 'Downloading the model...';
        summarizer = await window.ai.summarizer.create({
          monitor: (monitor) => {
            monitor.addEventListener('downloadprogress', (e) => {
              const percent = ((e.loaded / e.total) * 100).toFixed(2);
              statusElement.innerText = `Downloading model: ${percent}%`;
            });
          },
        });
        await summarizer.ready;
        statusElement.innerText = 'Model downloaded. Summarizing...';
      }
  
      // Perform summarization
      statusElement.innerText = 'Summarizing...';
      const summary = await summarizer.summarize(inputText);
      summaryElement.innerText = summary;
      statusElement.innerText = 'Summarization complete.';
    } catch (error) {
      console.error('Error during summarization:', error);
      statusElement.innerText = 'Error: ' + error.message;
    }
  });
  