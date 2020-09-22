from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from modelo import Fruta
from flask_cors import CORS
import os
app = Flask(__name__) 
CORS(app)
# caminho do arquivo de banco de dados 
caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, "frutas.db") 
# sqlalchemy 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+arquivobd 
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # remover warnings 
db = SQLAlchemy(app)

