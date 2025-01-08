
        function filterItems(category) {
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => section.classList.remove('hidden', 'filtered'));
            
            const targetSection = document.getElementById(category);
            targetSection.classList.add('filtered');
            window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
        }

        function resetFilter() {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.classList.remove('hidden');
                section.classList.add('filtered');
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.onload = function() {
            resetFilter();
        };

        function openModal() {
            document.getElementById('modal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // Adicionar evento de click nos botões "Peça Agora"
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                openModal();
            });
        });

        // Função de busca no WhatsApp
        async function buscarWhatsApp() {
            const telefone = document.getElementById("telefone").value;

            if (telefone === "") {
                alert("Por favor, insira um número de telefone válido.");
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5000/buscar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ whatsapp: telefone })  // Envia o número de telefone
                });

                const data = await response.json();
                if (data.nome) {
                    document.getElementById("whatsappInfo").style.display = 'block';
                    document.getElementById("whatsappName").innerText = data.nome;
                    document.getElementById("nextBtn").style.display = 'block';
                } else {
                    document.getElementById("whatsappInfo").style.display = 'none';
                    alert("Cliente não encontrado!");
                }

            } catch (error) {
                console.error("Erro ao buscar cliente:", error);
            }
        }

        // Função para avançar o pedido
        function avancarPedido() {
            // Aqui você pode implementar o que deve acontecer ao avançar
            alert("Pedido avançado com sucesso!");
            closeModal();
        }

    