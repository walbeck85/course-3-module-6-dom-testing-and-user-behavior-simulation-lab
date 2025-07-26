/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('DOM Testing and User Behavior Simulation', () => {
  let html;
  let container;

  beforeEach(() => {
  html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  document.documentElement.innerHTML = html.toString();

  // 🔁 Re-require *before* dispatching the event
  require('../index.js');

  // ✅ Fire after listeners have a chance to bind
  const event = new Event('DOMContentLoaded');
  document.dispatchEvent(event);
});

  test('Clicking "Simulate Click" updates the dynamic content', () => {
    const simulateBtn = document.getElementById('simulate-click');
    const contentDiv = document.getElementById('dynamic-content');

    simulateBtn.click();

    expect(contentDiv.textContent).toBe('Button was clicked!');
  });

  test('Submitting the form with valid input updates the content', () => {
    const input = document.getElementById('user-input');
    const form = document.getElementById('user-form');
    const contentDiv = document.getElementById('dynamic-content');

    input.value = 'Test Input';

    form.dispatchEvent(new Event('submit'));

    expect(contentDiv.textContent).toBe('Submitted: Test Input');
  });

  test('Submitting the form with empty input shows an error', () => {
    const input = document.getElementById('user-input');
    const form = document.getElementById('user-form');
    const errorDiv = document.getElementById('error-message');

    input.value = '   '; // whitespace-only input

    form.dispatchEvent(new Event('submit'));

    expect(errorDiv.textContent).toBe('Input cannot be empty');
    expect(errorDiv.classList.contains('hidden')).toBe(false);
  });

  test('Submitting with valid input clears previous error message', () => {
    const input = document.getElementById('user-input');
    const form = document.getElementById('user-form');
    const errorDiv = document.getElementById('error-message');

    // Set a previous error first
    errorDiv.textContent = 'Input cannot be empty';
    errorDiv.classList.remove('hidden');

    input.value = 'Valid Input';
    form.dispatchEvent(new Event('submit'));

    expect(errorDiv.textContent).toBe('');
    expect(errorDiv.classList.contains('hidden')).toBe(true);
  });
});