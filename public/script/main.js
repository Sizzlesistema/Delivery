// Função para renderizar os produtos
function renderProdutos(categoria) {
    fetch(`/api/produtos/${categoria}`)
      .then(response => response.json())
      .then(produtos => {
        const section = document.getElementById(categoria);
        section.innerHTML = ""; // Limpa os produtos anteriores
  
        if (produtos.length === 0) {
          section.innerHTML = "<p>Sem produtos nesta categoria.</p>";
        } else {
          produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
              <img src="${produto.imagem}" alt="${produto.nome}">
              <div class="card-content">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <button class="button">Comprar</button>
              </div>
            `;
            section.appendChild(card);
          });
        }
      })
      .catch(error => console.error('Erro ao carregar os produtos:', error));
  }
  
  function filterItems(categoria) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.filtered');
    sections.forEach(section => section.classList.add('hidden'));
  
    // Mostra a seção da categoria clicada
    const section = document.getElementById(categoria);
    section.classList.remove('hidden');
  
    // Renderiza os produtos da categoria
    renderProdutos(categoria);
  }
  
  function resetFilter() {
    // Mostra todas as categorias
    const sections = document.querySelectorAll('.filtered');
    sections.forEach(section => section.classList.remove('hidden'));
  
    // Renderiza os produtos de todas as categorias
    const categorias = ['hamburgueres', 'pizzas', 'saladas'];
    categorias.forEach(categoria => renderProdutos(categoria));
  }
  
  // Chama resetFilter quando a página carrega para mostrar todos os produtos
  window.onload = resetFilter;
  