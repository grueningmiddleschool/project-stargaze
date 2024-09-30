// Dark Mode Toggle Function
const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('light-mode');

    // Change button text based on mode
    if (body.classList.contains('light-mode')) {
        modeToggle.textContent = '🌑 Dark Mode';
    } else {
        modeToggle.textContent = '🌙 Light Mode';
    }
});
