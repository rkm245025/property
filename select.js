
  let minPrice = null;
  let maxPrice = null;

  function toggleDropdown() {
    document.getElementById("dropdownContent").classList.toggle("active");
  }

  function showTab(tab) {
    const minTab = document.querySelector(".price-tab:nth-child(1)");
    const maxTab = document.querySelector(".price-tab:nth-child(2)");
    const minList = document.getElementById("minPriceList");
    const maxList = document.getElementById("maxPriceList");

    if (tab === "min") {
      minTab.classList.add("active");
      maxTab.classList.remove("active");
      minList.classList.remove("d-none");
      maxList.classList.add("d-none");
    } else {
      maxTab.classList.add("active");
      minTab.classList.remove("active");
      maxList.classList.remove("d-none");
      minList.classList.add("d-none");
    }
  }

  function setMinPrice(value) {
    minPrice = value;
    updateDisplay();
  }

  function setMaxPrice(value) {
    maxPrice = value;
    updateDisplay();
  }

  function updateDisplay() {
    const label = document.getElementById("selectedBudget");

    if (minPrice && maxPrice) {
      label.innerHTML = `<i class="bi bi-currency-rupee"></i> ${minPrice} - ${maxPrice}`;
    } else if (minPrice) {
      label.innerHTML = `<i class="bi bi-currency-rupee"></i> From ${minPrice}`;
    } else if (maxPrice) {
      label.innerHTML = `<i class="bi bi-currency-rupee"></i> Up to ${maxPrice}`;
    } else {
      label.innerHTML = `<i class="bi bi-currency-rupee"></i> Budget`;
    }
  }

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (e) {
    const dropdown = document.querySelector(".budget-dropdown");
    if (!dropdown.contains(e.target)) {
      document.getElementById("dropdownContent").classList.remove("active");
    }
  });
