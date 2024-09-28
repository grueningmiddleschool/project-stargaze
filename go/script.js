const toggleThemeButton = document.getElementById('toggle-theme');
const bodyElement = document.body;

toggleThemeButton.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    
    const elementsToToggle = document.querySelectorAll(
        'header, .hero, .cta, .features, footer, nav ul li a, nav ul li button'
    );
    
    elementsToToggle.forEach((el) => {
        el.classList.toggle('dark-mode');
    });
});
