
  const input = document.getElementById('locationInput');
  const suggestionsBox = document.getElementById('suggestions');
  const wrapper = document.getElementById('tagInputWrapper');
  const selectedTags = [];

  const recentSearches = ["Buy in Bangalore", "Buy in Lucknow"];
  const locations = [
    "Banthra, Lucknow", "Bani, Lucknow", "Bangla Bazar, Lucknow",
    "Bengaluru", "Mumbai", "Hyderabad", "Pune", "Chennai", "Kolkata"
  ];

  input.addEventListener('input', showSuggestions);

  function showSuggestions() {
    const val = input.value.trim().toLowerCase();
    suggestionsBox.innerHTML = '';

    // Section: Recent Searches
    const recentDiv = document.createElement('div');
    recentDiv.className = 'suggestion-category';
    recentDiv.innerHTML = `<h6>Recent Searches</h6><div class="recent-searches"></div>`;
    const recentContainer = recentDiv.querySelector('.recent-searches');

    recentSearches.forEach(recent => {
      const item = document.createElement('div');
      item.className = 'recent-item';
      item.textContent = recent;
      item.onclick = () => {
        const city = recent.split(' in ')[1];
        if (!selectedTags.includes(city)) {
          selectedTags.push(city);
          renderTags();
        }
        input.value = '';
        suggestionsBox.classList.add('d-none');
      };
      recentContainer.appendChild(item);
    });

    suggestionsBox.appendChild(recentDiv);

    // Section: Location
    const locationMatches = locations.filter(loc =>
      loc.toLowerCase().includes(val) && !selectedTags.includes(loc)
    );

    if (locationMatches.length > 0) {
      const locDiv = document.createElement('div');
      locDiv.className = 'suggestion-category';
      locDiv.innerHTML = `<h6>Location</h6>`;
      locationMatches.forEach(loc => {
        const div = document.createElement('div');
        div.className = 'location-item';
        div.textContent = loc;
        div.onclick = () => {
          selectedTags.push(loc);
          renderTags();
          input.value = '';
          showSuggestions();
        };
        locDiv.appendChild(div);
      });
      suggestionsBox.appendChild(locDiv);
    }

    // Section: Project (placeholder)
    const projectDiv = document.createElement('div');
    projectDiv.className = 'suggestion-category';
    projectDiv.innerHTML = `<h6>Project</h6><div style="color:#999;">No Projects Found</div>`;
    suggestionsBox.appendChild(projectDiv);

    suggestionsBox.classList.remove('d-none');
  }

  function renderTags() {
    wrapper.querySelectorAll('.tag').forEach(tag => tag.remove());

    selectedTags.forEach((city, index) => {
      const span = document.createElement('span');
      span.className = 'tag';
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
    if (!e.target.closest('.position-relative')) {
      suggestionsBox.classList.add('d-none');
    }
  });
