 <div class="search-box d-none ">
    <div class="row mb-4 align-items-end">
      <!-- Location Multi-Select -->
      <div class="col-md-4 position-relative">
        <label class="form-label">Location</label>
        <i class="fas fa-map-marker-alt form-control-icon"></i>
        <select class="form-select icon-input" id="locationSelect" multiple>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Chennai</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Pune</option>
        </select>
        <label class="form-label">Location</label>
  <div class="mylocation-search-wrapper">
    <i class="bi bi-geo-alt-fill mylocation-search-icon"></i>
    <div class="mylocation-search" id="tagInputWrapper" onclick="focusInput()">
      <input type="text" id="locationInput" placeholder="Type location..."  />
    </div>
    <div id="suggestions" class="mylocation-suggestions d-none"></div>
  </div>
      </div>
   <!-- here old script -->

      <!-- Property Type Button -->
      <div class="col-md-4">
        <label class="form-label">Property Type</label>
        <button class="btn btn-outline-danger w-100 py-2" id="togglePropertyType">
          <i class="fas fa-home me-2"></i> Residential
        </button>
      </div>

      <!-- Budget -->
      <div class="col-md-2">
        <label class="form-label">Budget</label>
        <select class="form-select">
          <option selected>Budget</option>
          <option>Under ₹10,000</option>
          <option>₹10,000 - ₹20,000</option>
          <option>₹20,000 - ₹50,000</option>
          <option>Above ₹50,000</option>
        </select>
      </div>

      <!-- Search Button -->
      <div class="col-md-2">
        <button class="btn btn-danger w-100 search-btn">
          <i class="fas fa-search me-1"></i> Search
        </button>
      </div>
    </div>

    <!-- Property Type Section -->
    <div class="property-type-section" id="propertyTypeSection">
      <!-- Residential -->
      <div class="property-category">
        <div class="property-category-title"><i class="fas fa-building me-2"></i>Residential</div>
        <div class="property-options" id="residentialOptions">
          <div class="property-option" data-type="flat"><i class="fas fa-city"></i> Flat</div>
          <div class="property-option" data-type="house"><i class="fas fa-home"></i> House/Villa</div>
          <div class="property-option" data-type="plot"><i class="fas fa-draw-polygon"></i> Plot</div>
        </div>
      </div>

      <!-- BHK Options -->
      <div class="property-category">
        <div class="property-category-title"><i class="fas fa-bed me-2"></i>BHK Options</div>
        <div class="property-options">
          <div class="property-option">1 BHK</div>
          <div class="property-option">2 BHK</div>
          <div class="property-option">3 BHK</div>
          <div class="property-option">4 BHK</div>
          <div class="property-option">5 BHK</div>
          <div class="property-option">5+ BHK</div>
        </div>
      </div>

      <!-- Commercial -->
      <div class="property-category">
        <div class="property-category-title"><i class="fas fa-briefcase me-2"></i>Commercial</div>
        <div class="property-options">
          <div class="property-option"><i class="fas fa-building-circle-check"></i> Office Space</div>
          <div class="property-option"><i class="fas fa-store"></i> Shop/Showroom</div>
          <div class="property-option"><i class="fas fa-map-marked-alt"></i> Commercial Land</div>
          <div class="property-option"><i class="fas fa-warehouse"></i> Warehouse</div>
          <div class="property-option"><i class="fas fa-industry"></i> Industrial Building</div>
          <div class="property-option"><i class="fas fa-tools"></i> Industrial Shed</div>
        </div>
      </div>

      <!-- Other Property Types -->
      <div class="property-category">
        <div class="property-category-title"><i class="fas fa-tree me-2"></i>Other</div>
        <div class="property-options">
          <div class="property-option"><i class="fas fa-tractor"></i> Agricultural Land</div>
          <div class="property-option"><i class="fas fa-house-damage"></i> Farm House</div>
        </div>
      </div>
    </div>
  </div>
  const cities = [
    "Delhi", "Mumbai", "Bengaluru", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const input = document.getElementById('locationInput');
  const suggestionsBox = document.getElementById('suggestions');
  const wrapper = document.getElementById('tagInputWrapper');
  const selectedTags = [];

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();
    suggestionsBox.innerHTML = '';

    if (!val) {
      suggestionsBox.classList.add('d-none');
      return;
    }

    const filtered = cities.filter(city =>
      city.toLowerCase().includes(val) &&
      !selectedTags.includes(city)
    );

    if (filtered.length === 0) {
      suggestionsBox.classList.add('d-none');
      return;
    }

    filtered.forEach(city => {
      const div = document.createElement('div');
      div.textContent = city;
      div.addEventListener('click', () => {
        selectedTags.push(city);
        renderTags();
        input.value = '';
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.add('d-none');
      });
      suggestionsBox.appendChild(div);
    });

    suggestionsBox.classList.remove('d-none');
  });

  function renderTags() {
    wrapper.querySelectorAll('.mylocation-tag').forEach(tag => tag.remove());

    selectedTags.forEach((city, index) => {
      const span = document.createElement('span');
      span.className = 'mylocation-tag';
      span.innerHTML = `${city} <i class="bi bi-x" onclick="removeTag(${index})"></i>`;
      wrapper.insertBefore(span, input);
    });
  }

  function removeTag(index) {
    selectedTags.splice(index, 1);
    renderTags();
  }

  function focusInput() {
    input.focus();
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mylocation-search-wrapper')) {
      suggestionsBox.classList.add('d-none');
    }
  });