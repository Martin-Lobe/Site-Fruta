from config import *


@app.route("/")
def normal():
    return "Seja bem vindo!!!"

@app.route("/mostrar_frutas")
def mostrar_frutas():
    frutas = db.session.query(Fruta).all()
    retornar = []
    for f in frutas:
        retornar.append(f.transformar())
    resposta = jsonify(retornar)
    resposta.headers.add("Acess-Control-Allow-Origin","*")
    return resposta

@app.route("/incluir_fruta", methods=['posts'])
def incluir_fruta(): 
    dados = request.get_json()
    nova_fruta = Fruta(**dados)
    db.session.add(nova_planta)
    db.session.commit()
    return {"resultado": 'ok'}

app.run(debug=True)