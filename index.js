// Step 1: Simulate User Behavior
// Add event listeners for button clicks and form submissions
document.addEventListener('DOMContentLoaded', () => {
  const simulateBtn = document.getElementById('simulate-click');
  const form = document.getElementById('user-form');
  const input = document.getElementById('user-input');
  const content = document.getElementById('dynamic-content');
  const error = document.getElementById('error-message');

  // Button click behavior
  simulateBtn.addEventListener('click', () => {
    content.textContent = 'Button was clicked!';
    error.textContent = '';
    error.classList.add('hidden');
  });

  // Step 2: DOM Manipulation via Form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim();

    if (value === '') {
      // Step 3: Error Handling
      displayError('Input cannot be empty');
      content.textContent = '';
    } else {
      clearError();
      content.textContent = `Submitted: ${value}`;
      input.value = '';
    }
  });

  // Step 4: Utility Functions
  function displayError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
  }

  function clearError() {
    error.textContent = '';
    error.classList.add('hidden');
  }
});