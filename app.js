/* add your code here */
document.addEventListener("DOMContentLoaded", () => {
    const userList = document.querySelector(".user-list");
    const portfolioList = document.querySelector(".portfolio-list");
  
    const users = [
      { id: 1, firstname: "John", lastname: "Doe", address: "123 Main St", city: "Anytown", email: "john@example.com" },
        ];
  
     users.forEach(user => {
      const userItem = document.createElement("li");
      userItem.textContent = `${user.firstname} ${user.lastname}`;
      userItem.dataset.userId = user.id;
      userList.appendChild(userItem);
    });
  
     userList.addEventListener("click", (event) => {
      const userId = event.target.dataset.userId;
      const selectedUser = users.find(user => user.id == userId);
  
      document.getElementById("userID").value = selectedUser.id;
      document.getElementById("firstname").value = selectedUser.firstname;
      document.getElementById("lastname").value = selectedUser.lastname;
      document.getElementById("address").value = selectedUser.address;
      document.getElementById("city").value = selectedUser.city;
      document.getElementById("email").value = selectedUser.email;
  
      
      portfolioList.innerHTML = ''; 
      const stocks = [
        { symbol: "AAPL", shares: 10 },
        
      ];
      stocks.forEach(stock => {
        const stockRow = document.createElement("div");
        stockRow.innerHTML = `<span>${stock.symbol}</span><span>${stock.shares}</span><button>Delete</button>`;
        portfolioList.appendChild(stockRow);
      });
    });
  }); 

  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", industry: "Consumer Electronics", address: "1 Apple Park Way, Cupertino, CA" },
  ];
  
  document.querySelector(".portfolio-list").addEventListener("click", (event) => {
    const selectedSymbol = event.target.closest("div").querySelector("span").textContent;
    const stock = stocks.find(s => s.symbol === selectedSymbol);
  
    document.getElementById("stockName").textContent = stock.name;
    document.getElementById("stockSector").textContent = stock.sector;
    document.getElementById("stockIndustry").textContent = stock.industry;
    document.getElementById("stockAddress").textContent = stock.address;
  });

  function displayStockDetails(stock) {
    const stockDetailsElement = document.querySelector(".StockDetails");
    
    if (stock) {
        
        document.getElementById("stockName").textContent = stock.name;
        document.getElementById("stockSector").textContent = stock.sector;
        document.getElementById("stockIndustry").textContent = stock.industry;
        document.getElementById("stockAddress").textContent = stock.address;
        
       
        stockDetailsElement.style.display = "block";
    } else {
        stockDetailsElement.style.display = "none"; 
    }
}


function getStockBySymbol(symbol) {
    return stocks.find(stock => stock.symbol === symbol);
}

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
    
     console.log("User Updated:", updatedUser);
  });

  
  document.getElementById("btnDelete").addEventListener("click", (event) => {
    event.preventDefault();   
    const userId = document.getElementById("userID").value;
    
      document.querySelector(`.user-list li[data-user-id="${userId}"]`).remove();
    portfolioList.innerHTML = ''; 

    document.querySelector(".portfolio-list").addEventListener("click", function(event) {
        const selectedSymbol = event.target.dataset.symbol; 
        const selectedStock = getStockBySymbol(selectedSymbol);
        displayStockDetails(selectedStock);
    });
  
    // Clear user form
    document.querySelector(".userEntry").reset();
  });
  
  
