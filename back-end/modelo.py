from config import  *
import os
app = Flask(__name__) 
# caminho do arquivo de banco de dados 
caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, "frutas.db") 
# sqlalchemy 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///"+arquivobd 
app.config["SQLALCHEMY_TRACK_MODIFICTIONS"] = False # remover warnings 
db = SQLAlchemy(app)

class Fruta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    arvore = db.Column(db.String(254)) 
    nome_binomial = db.Column(db.String(254)) #nome científico da árvore que provê o fruto.
    cor = db.Column(db.String(254))
    calorias = db.Column(db.Integer) #quantidade de calorias aproximada por 100 gramas do alimento
    def __str__(self):
        return str(self.id) +", "+ self.nome +", "+ self.arvore +", "+ self.nome_binomial +", "+ self.cor +", "+ str(self.calorias)
    def transformar(self):
        return {
            "id" : self.id,
            "nome" : self.nome,
            "arvore" : self.arvore,
            "nome_binomial" : self.nome_binomial,
            "cor" : self.cor,
            "calorias" : self.calorias
        }
if __name__ == "__main__":
    db.create_all()
    pedir_tudo = db.session.query(Fruta).all()
    for fruta_teste in pedir_tudo:    
        print(fruta_teste)
        print(fruta_teste.transformar())
