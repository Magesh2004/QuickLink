document.getElementById('searchQuery').addEventListener('input', function() {
    fetch(`/?search=${encodeURIComponent(this.value)}`)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            document.getElementById('linkList').innerHTML = doc.getElementById('linkList').innerHTML;
        })
        .catch(error => console.error('Error:', error));
});