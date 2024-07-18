document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItem');
    const clearListButton = document.getElementById('clearList');
    const markPurchasesButton = document.getElementById('markPurchases');
    const listContainer = document.getElementById('listContainer');
    let shoppingList = [];

    // Function to render the shopping list
    function renderList() {
        listContainer.innerHTML = '';
        shoppingList.forEach((item, index) => {
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
            shoppingList.push({ name: newItem, purchased: false });
            itemInput.value = '';
            renderList();
        }
    }

    // Function to toggle the purchased state of an item
    function togglePurchased(index) {
        shoppingList[index].purchased = !shoppingList[index].purchased;
        renderList();
    }

    // Function to clear the list
    function clearList() {
        shoppingList = [];
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