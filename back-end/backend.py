from config import *
from modelo import Fruta
from modelo import Suco
from modelo import Quitanda

@app.route("/")
def normal():
    return "Seja bem vindo!!!"

@app.route("/mostrar_frutas")
def mostrar_frutas():
    frutas = db.session.query(Fruta).all()
    retornar = []
    for f in frutas:
        retornar.append(f.json())
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

@app.route("/excluir_frutas/<int:fruta_id>", methods=['DELETE'])
def excluir_fruta(fruta_id):
    resposta = jsonify({"resultado":"ok","detalhes":"ok"})
    try:
        fruta = Fruta.query.get_or_404(fruta_id)
        db.session.delete(fruta)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro","detalhes":str(e)})
    resposta.headers.add("Acess-Control-Allow-Origin", "*")
    return resposta

@app.route("/mostrar_suco")
def mostrar_sucos():
    sucos = db.session.query(Suco).all()
    retornar = []
    for s in sucos:
        retornar.append(s.json())
    resposta = jsonify(retornar)
    resposta.headers.add("Acess-Control-Allow-Origin","*")
    return resposta

@app.route("/mostrar_quitanda")
def mostrar_quitandas():
    quitanda = db.session.query(Quitanda).all()
    retornar = []
    for q in quitanda:
        retornar.append(q.json())
    resposta = jsonify(retornar)
    resposta.headers.add("Acess-Control-Allow-Origin","*")
    return resposta

app.run(debug=True)