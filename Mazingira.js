document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItem');
    const clearListButton = document.getElementById('clearList');
    const markPurchasesButton = document.getElementById('markPurchases');
    const listContainer = document.getElementById('listContainer');
    let seedlings = [];
    //navigation links
    document.addEventListener('DOMContentLoaded', () => {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.navbar a');
    
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.currentTarget.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
    
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    
        // Form validation and submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
    
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
    
            // Prepare data for submission
            const contactData = {
                name: name,
                email: email,
                message: message
            };
    
            // Submit form data via POST request
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData)
                });
    
                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    console.log('Failed to send message:', response.statusText);
                    alert('Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    
        // Email validation function
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }
    });

    /*Function to handle form submission*/
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('loginForm');
    
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            const loginData = {
                username: username,
                password: password
            };
    
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
    
                if (response.ok) {
                    const result = await response.json();
                    // Handle successful login
                    console.log('Login successful:', result);
                    // Redirect or update the UI as needed
                    window.location.href = '/dashboard'; // Example redirect
                } else {
                    // Handle login error
                    console.log('Login failed:', response.statusText);
                    // Display error message to user
                    alert('Login failed. Please check your username and password and try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                // Display error message to user
                alert('An error occurred. Please try again later.');
            }
        });
    });

    // Function to render the shopping list
    function renderList() {
        listContainer.innerHTML = '';
        seedlings.forEach((item, index) => {
            let li = document.createElement('li');
            li.textContent = item.name;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            li.addEventListener('click', () => togglePurchased(index));
            listContainer.appendChild(li);
        });
    }

    // Function to add a new item to the list
    function addItem() {
        let newItem = itemInput.value.trim();
        if (newItem !== '') {
            seedlings.push({ name: newItem, purchased: false });
            itemInput.value = '';
            renderList();
        }
    }

    // Function to toggle the purchased state of an item
    function togglePurchased(index) {
        seedlings[index].purchased = !seedlings[index].purchased;
        renderList();
    }

    // Function to clear the list
    function clearList() {
        seedlings = [];
        renderList();
    }

    // Function to mark all items as purchased
    document.getElementById('markPurchases').addEventListener('click', function() {
        const items = document.querySelectorAll('#listContainer li');
        items.forEach(item => {
            item.classList.add('purchased');
        });
    });

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
    
        // Here you can add the code to send the data to your server using fetch or any other method
        const responseDiv = document.getElementById('formResponse');
        responseDiv.textContent = `Thank you for contacting us, ${name}. We will get back to you at ${email} soon.`;
        responseDiv.style.color = 'green';
    
        // Clear the form
        document.getElementById('contactForm').reset();
    });

    // Attach event listeners to buttons
    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);
    markPurchasesButton.addEventListener('click', markAllAsPurchased);
});