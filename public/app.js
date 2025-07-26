// Main application logic
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  checkAuth();
  
  // Initialize navigation
  initNavigation();
  
  // Load the appropriate page based on URL
  loadPage();
});

function checkAuth() {
  const savedUser = localStorage.getItem('craneAppUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    updateUserInfo();
  } else {
    // Redirect to login if not authenticated
    window.location.href = 'login.html';
  }
}

function updateUserInfo() {
  if (!currentUser) return;
  
  document.getElementById('currentUserName').textContent = currentUser.name;
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
}

function initNavigation() {
  // Toggle navigation
  document.querySelector('.toggle-nav').addEventListener('click', toggleNav);
  
  // Toggle dropdown
  document.querySelector('.user-info').addEventListener('click', toggleDropdown);
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.user-dropdown')) {
      document.getElementById('dropdownMenu').classList.remove('show');
    }
  });
}

function loadPage() {
  // This would load content based on the current URL
  // In a real SPA, you would use a router
}

function toggleNav() {
  navCollapsed = !navCollapsed;
  document.body.classList.toggle('nav-collapsed', navCollapsed);
}

function toggleDropdown() {
  document.getElementById('dropdownMenu').classList.toggle('show');
}

// Other shared functions...
