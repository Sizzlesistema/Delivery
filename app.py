from flask import Flask, jsonify
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)

# Dados de exemplo de produtos (você pode carregar isso de um banco de dados ou arquivo)
produtos = {
    'hamburgueres': [
        { 'nome': 'Hambúrguer Clássico', 'descricao': 'Carne, queijo, alface, tomate', 'imagem': '/static/images/hamburguer1.jpg' },
        { 'nome': 'Hambúrguer Vegano', 'descricao': 'Hambúrguer de grão de bico', 'imagem': '/static/images/hamburguer2.jpg' }
    ],
    'pizzas': [
        { 'nome': 'Pizza Margherita', 'descricao': 'Molho de tomate, queijo, manjericão', 'imagem': '/static/images/pizza1.jpg' },
        { 'nome': 'Pizza Calabresa', 'descricao': 'Molho de tomate, queijo, calabresa', 'imagem': '/static/images/pizza2.jpg' }
    ],
    'saladas': [
        { 'nome': 'Salada Caesar', 'descricao': 'Alface, frango grelhado, molho caesar', 'imagem': '/static/images/salada1.jpg' },
        { 'nome': 'Salada Grega', 'descricao': 'Alface, pepino, tomate, queijo feta', 'imagem': '/static/images/salada2.jpg' }
    ]
}

@app.route('/api/produtos/<categoria>', methods=['GET'])
def get_produtos(categoria):
    # Verifica se a categoria existe
    if categoria not in produtos:
        return jsonify({'error': 'Categoria não encontrada'}), 404

    return jsonify(produtos[categoria])

@app.route('/')
def home():
    return "API de Produtos do Sizzle Delivery"

if __name__ == '__main__':
    app.run(debug=True)
