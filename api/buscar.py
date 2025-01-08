from flask import Flask, jsonify, request
from flask_cors import CORS  # Importe o CORS
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

app = Flask(__name__)
CORS(app)  # Adiciona suporte CORS ao app Flask

@app.route('/buscar', methods=['POST'])
def handler():
    try:
        telefone = request.json.get('whatsapp')
        if not telefone:
            return jsonify({"error": "Número de WhatsApp não fornecido"}), 400

        nome_cliente = acessar_whatsapp(telefone)

        if nome_cliente:
            return jsonify({"nome": nome_cliente})
        else:
            return jsonify({"error": "Nome não encontrado"}), 404
    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500

def acessar_whatsapp(telefone):
    telefone = telefone.strip().replace(" ", "").replace("-", "")
    url_whatsapp = f"https://wa.me/{telefone}"

    options = Options()
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get(url_whatsapp)
        print("Aguardando login... Escaneie o QR Code")

        time.sleep(60)

        try:
            nome_cliente = driver.find_element(By.XPATH, '//span[@title]').text
            print(f"Nome do Cliente: {nome_cliente}")
            return nome_cliente
        except Exception as e:
            print("Erro ao buscar o nome do cliente:", e)
            return None
    finally:
        driver.quit()

if __name__ == "__main__":
    app.run(debug=True)
