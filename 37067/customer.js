document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    let errorMessage = '';

    // Basic form validation
    if (password !== confirmPassword) {
        errorMessage = "Passwords do not match!";
    } else if (name.trim() === '' || email.trim() === '' || password.trim() === '' || phone.trim() === '' || address.trim() === '') {
        errorMessage = "Please fill in all fields!";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        errorMessage = "Name must only contain letters!";
    } else if (!/^\d{10}$/.test(phone)) {
        errorMessage = "Phone number must be 10 digits!";
    }

    // Display error message if validation fails
    if (errorMessage) {
        document.getElementById("error-message").innerText = errorMessage;
    } else {
        document.getElementById("error-message").innerText = '';
        
        // Save customer data to localStorage
        let customers = JSON.parse(localStorage.getItem('customers')) || [];
        customers.push({
            name: name,
            email: email,
            phone: phone,
            address: address
        });
        localStorage.setItem('customers', JSON.stringify(customers));

        alert("Registration Successful!");
        document.getElementById("registration-form").reset(); // Reset the form
    }
});

// View customers
function viewData() {
    let customers = JSON.parse(localStorage.getItem('customers')) || [];

    if (customers.length === 0) {
        alert("No customers registered.");
        return;
    }

    const customerList = document.getElementById("customer-list");
    customerList.innerHTML = ''; // Clear existing list

    customers.forEach(customer => {
        let li = document.createElement("li");
        li.innerHTML = `<span>Name: ${customer.name}</span><span>Email: ${customer.email}</span><span>Phone: ${customer.phone}</span><span>Address: ${customer.address}</span>`;
        customerList.appendChild(li);
    });

    document.getElementById("view-container").style.display = 'block'; // Show the view container
}
