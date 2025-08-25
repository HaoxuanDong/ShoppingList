const products = [
    { id: 1, name: "apple", price: 5 },
    { id: 2, name: "banana", price: 3 },
    { id: 3, name: "orange", price: 4 },
    { id: 4, name: "milk", price: 6 },
    { id: 5, name: "bread", price: 2 },
    { id: 6, name: "egg", price: 7 }
  ];

  const cart = [];

  // create products cards
  const productList = document.getElementById("productList");
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: ￥${product.price}</p>
      <button  onclick="addToCart(${product.id})">Add to cart</button>
    `;
    productList.appendChild(card);
  });
    function getTotalQuantity() {
      let total = 0;
      cart.forEach(item => {
          total += item.quantity;
      });
      return total;
    }

  function addToCart(productId) {
    let totalQuantity = getTotalQuantity();

    if (totalQuantity >= 5) {
        document.getElementById("cartMessage").textContent = "❌ Cart limit reached！Cannot add more than 5 items.";
        console.log("Cart is full！");
        return;
    }
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        document.getElementById("cartMessage").textContent = "";
        existing.quantity++;
        console.log(`${existing.name} adds to cart!，quantity：${existing.quantity}`)
    } else {
        document.getElementById("cartMessage").textContent = "";
        cart.push({ ...product, quantity: 1 });
        console.log(`${cart[cart.length - 1].name} adds to cart!，quantity：${cart[cart.length - 1].quantity}`);
    }
    renderCart();
  }

  function renderCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        ${item.name} - ￥${item.price} × ${item.quantity}
        <div>
          <button onclick="updateQuantity(${item.id}, -1)">➖</button>
          <button onclick="updateQuantity(${item.id}, 1)">➕</button>
        </div>
      `;
      cartItems.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total amount: ￥${total}</strong>`;
    cartItems.appendChild(totalDiv);
  }

  function updateQuantity(productId, change) {
    let totalQuantity = getTotalQuantity();

    if (totalQuantity >= 5 && change=== 1) {
        document.getElementById("cartMessage").textContent = "❌ Cart limit reached！Cannot add more than 5 items.";
        console.log("Cart is full！");
        return;
    }
    const item = cart.find(p => p.id === productId);
    if (item) {
      item.quantity += change;
      if(change === 1){
        console.log(`${item.name} adds to cart!，quantity：${item.quantity}`)
      }else{
        console.log(`delete one ${item.name} from cart，quantity：${item.quantity}`)
      }
      if (item.quantity <= 0) {
        const index = cart.findIndex(p => p.id === productId);
        cart.splice(index, 1);
      }
      renderCart();
      document.getElementById("cartMessage").textContent = "";
    }
  }
  function searchCart() {
    const searchResult = document.getElementById("searchResult");
    searchResult.innerHTML="";
    const div = document.createElement("div");
    div.className = "show-result";
    div.innerHTML="";
    const keyword = document.getElementById("searchInput").value.trim();
    if (!keyword) {
    console.log(`please enter items name or ID!`)
    div.innerHTML=`please enter items name or ID!`;
      searchResult.appendChild(div);
      return;
    }

    const foundItem = cart.find(item => 
      item.name.includes(keyword) || item.id.toString() === keyword
    );

    if (foundItem) {
      console.log(`found item：${foundItem.name}, quantity：${foundItem.quantity},  price：￥${foundItem.price * foundItem.quantity}`);
      div.innerHTML=`found item：${foundItem.name}, quantity：${foundItem.quantity},  price：￥${foundItem.price * foundItem.quantity}`
      searchResult.appendChild(div);
    } else {
      console.log("no such item in your cart！");
      div.innerHTML=`no such item in your cart！`;
      searchResult.appendChild(div);
    }
  }
   


  function toggleCart() {
    const cartItems = document.getElementById("cartItems");
    cartItems.style.display = cartItems.style.display === "block" ? "none" : "block";
  }