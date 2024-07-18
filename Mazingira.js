document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItem');
    const clearListButton = document.getElementById('clearList');
    const markPurchasesButton = document.getElementById('markPurchases');
    const listContainer = document.getElementById('listContainer');
    let seedlings = [];

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
    function markAllAsPurchased() {
        shoppingList.forEach(item => item.purchased = true);
        renderList();
    }

    // Attach event listeners to buttons
    addItemButton.addEventListener('click', addItem);
    clearListButton.addEventListener('click', clearList);
    markPurchasesButton.addEventListener('click', markAllAsPurchased);
});