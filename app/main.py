from app.everyRounds import get_data_from_tournament
import os
from flask import Flask, redirect, render_template, request, send_from_directory
from flask_socketio import SocketIO, emit
import pandas as pd

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/extracao", methods=["GET", "POST"])
def extrairDadosPagina():
    if request.method == "POST":
        try:
            nomeModelo = request.form['nomeModelo']
            tempos = []
            temposInput0 = request.form.get('tempo0')
            if temposInput0 != None: tempos.append(temposInput0)
            temposInput1 = request.form.get('tempo1')
            if temposInput1 != None: tempos.append(temposInput1)
            temposInput2 = request.form.get('tempo2')
            if temposInput2 != None: tempos.append(temposInput2)
            campeonato = request.form['campeonato']
            pais = request.form['paises']
            socketio.start_background_task(get_data_from_tournament, nomeModelo, pais, campeonato, tempos)
            return redirect("/extracao/completos")
        except Exception as e:
            print(e)
            return render_template("extrairDados.html") 
    return render_template("extrairDados.html")

@app.route("/extracao/completos")
def listarArquivos():
    datasets = os.listdir('app/data')
    return render_template("baixarArquivo.html", nomes=datasets)

@app.route("/")
def homePage():
    return render_template("homePage.html")

# @app.route("/visualizar/<filename>", methods=['GET', 'POST'])
@app.route("/extracao/completos/visualizar/<filename>", methods=['GET', 'POST'])
def visualizarPaginas(filename):
    url = 'app/data/' + filename
    uploaded_df = pd.read_csv(url)
    # Converting to html Table
    uploaded_df_html = uploaded_df.to_html()
    return render_template('visualizarDataset.html',
                           data_var=uploaded_df_html)

@app.route('/extracao/completos/<filename>', methods=['GET', 'POST'])
def downloadArquivo(filename):
    try:
        return send_from_directory('../app/data', filename)
    except Exception as e:
        print(e)
        return redirect("/extracao/completos")

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))
