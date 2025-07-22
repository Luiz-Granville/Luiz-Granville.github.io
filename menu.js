// Menu retrátil
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const bottomMenu = document.getElementById('bottom-menu');
    
    menuToggle.addEventListener('click', function() {
        bottomMenu.classList.toggle('expanded');
    });
    
    // Fechar menu ao clicar em um item
    const menuItems = document.querySelectorAll('.menu-items a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            bottomMenu.classList.remove('expanded');
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!bottomMenu.contains(event.target)) {
            bottomMenu.classList.remove('expanded');
        }
    });
});

