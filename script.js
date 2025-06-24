// Money Tracker JS with Budget Check Alert
let expenses = [];
let totalAmount = 0;
let budget = 0;

const categoryInput = document.getElementById('category-input');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const balanceCell = document.getElementById('display-balance');

const userNameInput = document.getElementById('user-name');
const userBudgetInput = document.getElementById('user-budget');
const setBudgetBtn = document.getElementById('set-budget-btn');
const displayUser = document.getElementById('display-user');
const displayBudget = document.getElementById('display-budget');

// Set user and budget
setBudgetBtn.addEventListener('click', () => {
    const user = userNameInput.value.trim();
    const budgetValue = Number(userBudgetInput.value);

    if (user === '') {
        alert('Please enter your name.');
        return;
    }
    if (isNaN(budgetValue) || budgetValue <= 0) {
        alert('Please enter a valid budget amount.');
        return;
    }
    displayUser.textContent = user;
    displayBudget.textContent = budgetValue;
    budget = budgetValue;
    updateBalance();
});

// Add expense
addBtn.addEventListener('click', function () {
    const category = categoryInput.value.trim();
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please enter a category.');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    if (date === '') {
        alert('Please select a date.');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;
    updateBalance();
    updateTable(expense);

    if (totalAmount > budget) {
        alert("⚠ Warning: Your expenses have exceeded the budget!");
    }
});

// Update balance
function updateBalance() {
    totalAmountCell.textContent = totalAmount;
    const balance = budget - totalAmount;
    balanceCell.textContent = balance >= 0 ? balance : 0;
}

// Add expense row to table
function updateTable(expense) {
    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        updateBalance();
        expenseTableBody.removeChild(newRow);
    });

    deleteCell.appendChild(deleteBtn);
}