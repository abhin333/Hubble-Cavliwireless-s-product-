async function loadLiveStats() {
    try {
      const response = await fetch('/api/live-stats');
      const data = await response.json();
      
      // Update elements in your DOM
      const exhibitorBadge = document.getElementById('total-exhibitors-count');
      const countryBadge = document.getElementById('total-countries-count');
      
      if (exhibitorBadge) exhibitorBadge.textContent = data.total_exhibitors;
      if (countryBadge) countryBadge.textContent = data.total_countries;
    } catch (error) {
      console.error("Failed to load live stats:", error);
    }
  }
  
  // Call on page load
  document.addEventListener('DOMContentLoaded', loadLiveStats);