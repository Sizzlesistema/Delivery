// Filtra as categorias de produtos
function filterItems(category) {
    const sections = document.querySelectorAll('.filtered');
    sections.forEach(section => section.classList.add('hidden'));

    const selectedSection = document.getElementById(category);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
}

// Reseta o filtro e mostra todos os produtos
function resetFilter() {
    const sections = document.querySelectorAll('.filtered');
    sections.forEach(section => section.classList.remove('hidden'));
}
