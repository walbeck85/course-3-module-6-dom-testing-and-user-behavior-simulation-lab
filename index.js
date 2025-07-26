// Step 1: Simulate User Behavior
document.addEventListener('DOMContentLoaded', () => {
  const simulateBtn = document.getElementById('simulate-click');
  const form = document.getElementById('user-form');

  // Button click behavior
  simulateBtn?.addEventListener('click', () => {
    simulateClick('dynamic-content', 'Button was clicked!');
    clearError();
  });

  // Form submission behavior
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit('user-form', 'dynamic-content');
  });
});

// DOM Manipulation Functions
function addElementToDOM(targetId, text) {
  const target = document.getElementById(targetId);
  if (target) target.textContent = text;
}

function removeElementFromDOM(id) {
  const element = document.getElementById(id);
  if (element) element.remove();
}

function simulateClick(targetId, message) {
  const target = document.getElementById(targetId);
  if (target) target.textContent = message;
}

function handleFormSubmit(formId, contentId) {
  const input = document.getElementById('user-input');
  const content = document.getElementById(contentId);

  const value = input?.value?.trim();
  if (!value) {
    displayError('Input cannot be empty');
    if (content) content.textContent = '';
  } else {
    clearError();
    if (content) content.textContent = `Submitted: ${value}`;
    if (input) input.value = '';
  }
}

// Error Handling Utilities
function displayError(message) {
  const error = document.getElementById('error-message');
  if (error) {
    error.textContent = message;
    error.classList.remove('hidden');
  }
}

function clearError() {
  const error = document.getElementById('error-message');
  if (error) {
    error.textContent = '';
    error.classList.add('hidden');
  }
}

// Export functions for testing
module.exports = {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
};