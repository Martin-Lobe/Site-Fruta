from config import  *

class Fruta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    arvore = db.Column(db.String(254)) 
    nome_binomial = db.Column(db.String(254)) #nome científico da árvore que provê o fruto.
    cor = db.Column(db.String(254))
    calorias = db.Column(db.Integer) #quantidade de calorias aproximada por 100 gramas do alimento
    def __str__(self):
        return str(self.id) +", "+ self.nome +", "+ self.arvore +", "+ self.nome_binomial +", "+ self.cor +", "+ str(self.calorias)
    def json(self):
        return {
            "id" : self.id,
            "nome" : self.nome,
            "arvore" : self.arvore,
            "nome_binomial" : self.nome_binomial,
            "cor" : self.cor,
            "calorias" : self.calorias
        }
class Suco(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    tamanho = db.Column(db.String(254))
    data_fabricacao = db.Column(db.String(254))
    fruta_id = db.Column(db.Integer, db.ForeignKey(Fruta.id), nullable=False)
    fruta = db.relationship("Fruta")
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "tamanho": self.tamanho,
            "data_fabricacao": self.data_fabricacao,
            "fruta_id": self.fruta_id,
            "fruta": self.fruta.json()
        }


class Quitanda(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    suco_id = db.Column(db.Integer, db.ForeignKey(Suco.id), nullable=False)
    suco = db.relationship("Suco")
    dono = db.Column(db.String(254))
    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "suco_id": self.suco_id,
            "suco": self.suco.json(),
            "dono": self.dono
        }



if __name__ == "__main__":
    db.create_all()
    
    nova_fruta = Fruta(nome="Morango", arvore="Morangueiro", nome_binomial="Fragaria L", cor="Vermelho", calorias=33)
    novo_suco = Suco(nome="Suco_de_Morango", tamanho="Grande", data_fabricacao="23/09/2020", fruta=nova_fruta)
    nova_quitanda = Quitanda(nome="Quitanda_do_Martin", suco=novo_suco, dono="Pedro")
    db.session.add(nova_fruta)
    db.session.add(novo_suco)
    db.session.add(nova_quitanda)
    db.session.commit()

    Frutas = db.session.query(Fruta).all()
    Sucos = db.session.query(Suco).all()
    Quitandas = db.session.query(Quitanda).all()
    
    print(Frutas)
    print(Sucos)
    print(Quitandas)


