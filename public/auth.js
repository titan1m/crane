// Authentication functions
document.getElementById('loginBtn').addEventListener('click', login);

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;
  
  // Simple validation
  if (!username || !password) {
    showMessage('loginOutput', 'Please enter both username and password', 'error');
    return;
  }
  
  // Simulate authentication
  if (password.length < 6) {
    showMessage('loginOutput', 'Invalid credentials. Please try again.', 'error');
    return;
  }
  
  // Successful login
  currentUser = {
    id: 'OP-' + Math.floor(Math.random() * 10000),
    name: username,
    role: 'operator',
    lastLogin: new Date().toISOString()
  };
  
  if (remember) {
    localStorage.setItem('craneAppUser', JSON.stringify(currentUser));
  }
  
  showMessage('loginOutput', 'Login successful! Redirecting...', 'success');
  updateUserInfo();
  
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 1500);
}

document.getElementById('logoutBtn').addEventListener('click', logout);

function logout() {
  currentUser = null;
  localStorage.removeItem('craneAppUser');
  window.location.href = 'login.html';
}
