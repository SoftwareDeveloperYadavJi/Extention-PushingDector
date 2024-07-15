browser.webNavigation.onCompleted.addListener(function(details) {
  const url = details.url;
  checkUrl(url);
}, {url: [{schemes: ['http', 'https']}]});

function checkUrl(url) {
  fetch('http://127.0.0.1:5000/check-url', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      if (data.isPhishing) {
          browser.notifications.create({
              "type": "basic",
              "iconUrl": browser.extension.getURL("icons/phishing_icon.png"),
              "title": "Phishing Alert",
              "message": "Warning: This URL is a phishing site!"
          });
      }
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      browser.notifications.create({
          "type": "basic",
          "iconUrl": browser.extension.getURL("icons/error_icon.png"),
          "title": "Error",
          "message": "Unable to check the URL. Please try again later."
      });
  });
}
