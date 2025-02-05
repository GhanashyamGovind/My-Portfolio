document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Basic validation
    const nameInput = document.getElementById("name").value.trim();
    const emailInput = document.getElementById("email").value.trim();

    // Check if name is empty or contains numbers
    if (nameInput === '' || /\d/.test(nameInput)) {
        alert("Please enter a valid name without numbers.");
        return;
    }

    // Check if email is empty
    if (emailInput === '') {
        alert("Please enter a valid email.");
        return;
    }

    // Show loading indicator
    document.getElementById("loading").style.display = "block";

    // Create a FormData object to capture the form data
    const formData = new FormData(this);

    // Send the form data using Fetch API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        document.getElementById("loading").style.display = "none"; // Hide loading indicator

        if (response.ok) {
            // Display success message
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("errorMessage").style.display = "none";
            this.reset(); // Clear form fields
        } else {
            // Display error message for response issues
            document.getElementById("errorMessage").style.display = "block";
        }
    })
    .catch(error => {
        document.getElementById("loading").style.display = "none"; // Hide loading indicator

        // Display error message for network issues
        document.getElementById("errorMessage").style.display = "block";
        console.error("Error:", error); // Log detailed error to the console
    });
});
        