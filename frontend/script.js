const API_URL = "http://localhost:3000/api";

// Add car
async function addCar() {
  const name = document.getElementById("name").value.trim();
  const brand = document.getElementById("brand").value.trim();
  const price = document.getElementById("price").value.trim();

  // basic validation
  if (!name || !brand || !price) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/add-car`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, brand, price })
    });

    if (!response.ok) {
      throw new Error("Failed to add car");
    }

    const data = await response.json();

    // ✅ SUCCESS POPUP
    alert("Car added successfully!");

    // clear form
    document.getElementById("name").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("price").value = "";

    // reload cars
    loadCars();

  } catch (error) {
    console.error(error);
    alert("Error adding car. Check backend.");
  }
}

// Load cars
async function loadCars() {
  try {
    const response = await fetch(`${API_URL}/cars`);
    const cars = await response.json();

    const list = document.getElementById("carList");
    list.innerHTML = "";

    cars.forEach(car => {
      const li = document.createElement("li");
      li.textContent = `${car.name} (${car.brand}) - ₹${car.price}`;
      list.appendChild(li);
    });

  } catch (error) {
    console.error(error);
    alert("Error loading cars");
  }
}

// Load cars on page load
loadCars();
