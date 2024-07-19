document.getElementById('auth-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/list-files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';
        data.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.textContent = `File: ${file.name} (ID: ${file.id})`;
            fileList.appendChild(fileItem);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});