// script.js

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous messages
    document.getElementById('username-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('form-message').textContent = '';

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validation
    let valid = true;
    if (!username || !/\S+@\S+\.\S+/.test(username)) {
        document.getElementById('username-error').textContent = 'Please enter a valid email.';
        valid = false;
    }

    if (!password || password.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters long.';
        valid = false;
    }

    if (!valid) return;

    // API request
    document.getElementById('form-message').innerHTML = '<div class="spinner"></div>';

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('form-message').textContent = 'Login successful!';
    })
    .catch(error => {
        document.getElementById('form-message').textContent = 'Login failed. Please try again.';
    });
});

// Show/Hide Password
document.getElementById('toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = 'Show';
    }
});
