document.addEventListener('DOMContentLoaded', function () {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0];
        checkUrl(currentTab.url);
    });
});

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
        const statusDiv = document.getElementById('status');
        if (data.isPhishing) {
            statusDiv.innerHTML = "<p class='phishing'>Warning: This URL is a phishing site!</p>";
        } else {
            statusDiv.innerHTML = "<p class='safe'>This URL is safe.</p>";
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        const statusDiv = document.getElementById('status');
        statusDiv.innerHTML = "<p class='phishing'>Error: Unable to check the URL. Please try again later.</p>";
    });
}
