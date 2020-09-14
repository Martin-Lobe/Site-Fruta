from config import *
app = Flask(__name__) 
# caminho do arquivo de banco de dados 
caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, "frutas.db") 
# sqlalchemy 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+arquivobd 
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # remover warnings 
db = SQLAlchemy(app)
from modelo import Fruta

@app.route("/")
def normal():
    return "Seja bem vindo!!!"

@app.route("/mostrar_frutas")
def mostrar_frutas():
    frutas = db.session.query(Fruta).all()
    retornar = []
    for f in frutas:
        retornar.append(f.transformar())
    return jsonify(retornar)

app.run(debug=True)