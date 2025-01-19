document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    alert('Form submitted successfully!'); // Feedback for the user

    // Redirect to the home page
    window.location.href = '/home.html';
});

// Add the submit event listener for the login form
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    alert('Login successful! Redirecting to home page.'); // Feedback for the user

    // Redirect to the home page
    window.location.href = '/home.html';
});
