// app.js

document.addEventListener("DOMContentLoaded", () => {
  const userList = document.querySelector(".user-list");
  const portfolioList = document.querySelector(".portfolio-list");

  // Sample data for users and stocks
  const users = [
      { id: 1, firstname: "John", lastname: "Doe", address: "123 Main St", city: "Anytown", email: "john@example.com" },
      { id: 2, firstname: "Jane", lastname: "Smith", address: "456 Elm St", city: "Othertown", email: "jane@example.com" }
  ];

  const stocks = [
      { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", industry: "Consumer Electronics", address: "1 Infinite Loop, Cupertino, CA", shares: 10 },
      { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Communication Services", industry: "Internet Content & Information", address: "1600 Amphitheatre Parkway, Mountain View, CA", shares: 5 }
  ];

  // Function to display users in the user list
  function displayUsers() {
      users.forEach(user => {
          const userItem = document.createElement("li");
          userItem.textContent = `${user.firstname} ${user.lastname}`;
          userItem.dataset.userId = user.id;
          userList.appendChild(userItem);
      });
  }

  // Display users on page load
  displayUsers();

  // Event listener for user selection
  userList.addEventListener("click", (event) => {
      const userId = event.target.dataset.userId;
      const selectedUser = users.find(user => user.id == userId);

      // Populate the user information form
      if (selectedUser) {
          document.getElementById("userID").value = selectedUser.id;
          document.getElementById("firstname").value = selectedUser.firstname;
          document.getElementById("lastname").value = selectedUser.lastname;
          document.getElementById("address").value = selectedUser.address;
          document.getElementById("city").value = selectedUser.city;
          document.getElementById("email").value = selectedUser.email;

          // Display the user's portfolio
          displayPortfolio(selectedUser.id);
      }
  });

  // Function to display the user's stock portfolio
  function displayPortfolio(userId) {
      portfolioList.innerHTML = ''; // Clear previous portfolio
      stocks.forEach(stock => {
          const stockRow = document.createElement("div");
          stockRow.innerHTML = `
              <span>${stock.symbol}</span> 
              <span>${stock.shares} shares</span>
              <button data-symbol="${stock.symbol}">View Details</button>
          `;
          portfolioList.appendChild(stockRow);
      });

      // Add event listener for viewing stock details
      portfolioList.addEventListener("click", (event) => {
          const stockButton = event.target.closest("button");
          if (stockButton) {
              const selectedSymbol = stockButton.dataset.symbol;
              const stock = stocks.find(s => s.symbol === selectedSymbol);
              displayStockDetails(stock);
          }
      });
  }

  // Function to display stock details
  function displayStockDetails(stock) {
      if (stock) {
          document.getElementById("stockName").textContent = stock.name;
          document.getElementById("stockSector").textContent = stock.sector;
          document.getElementById("stockIndustry").textContent = stock.industry;
          document.getElementById("stockAddress").textContent = stock.address;
          document.querySelector(".StockDetails").style.display = "block";
      } else {
          document.querySelector(".StockDetails").style.display = "none";
      }
  }

  // Save user information
  document.getElementById("btnSave").addEventListener("click", (event) => {
      event.preventDefault(); 

      const userId = document.getElementById("userID").value;
      const updatedUser = {
          id: userId,
          firstname: document.getElementById("firstname").value,
          lastname: document.getElementById("lastname").value,
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          email: document.getElementById("email").value
      };

      // Update the user information in the users array
      const userIndex = users.findIndex(user => user.id == userId);
      if (userIndex !== -1) {
          users[userIndex] = updatedUser; // Update user data
          console.log("User Updated:", updatedUser);
      }
  });

  // Delete user from the list
  document.getElementById("btnDelete").addEventListener("click", (event) => {
      event.preventDefault();   
      const userId = document.getElementById("userID").value;

      // Remove user from users array
      const userIndex = users.findIndex(user => user.id == userId);
      if (userIndex !== -1) {
          users.splice(userIndex, 1); // Remove user
          document.querySelector(`.user-list li[data-user-id="${userId}"]`).remove(); // Remove from UI
          portfolioList.innerHTML = ''; // Clear portfolio
          document.querySelector(".StockDetails").style.display = "none"; // Hide stock details
          document.querySelector(".userEntry").reset(); // Reset form
      }
  });
});
