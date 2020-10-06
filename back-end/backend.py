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

@app.route("/incluir_fruta", methods=['post'])
def incluir_fruta(): 
    resposta_2 = jsonify({"resultado": "ok", "detalhes": "ok"}) 
    dados = request.get_json(force=True)
    try:
        nova_fruta = Fruta(**dados) 
        db.session.add(nova_fruta)
        db.session.commit()
    except Exception as e:
        resposta_2 = jsonify({"resultado":"erro", "detalhes":str(e)}) 
    resposta_2.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta_2

app.run(debug=True)