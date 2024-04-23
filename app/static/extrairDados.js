
const campeonatosPorPais = [
    {"pais": "Alemanha", "value": "germany", "campeonatos": [
        {"nome": "Bundesliga 1", "value": "bundesliga"},
        {"nome": "Bundesliga 2", "value": "bundesliga-2"}
    ]},
    {"pais": "Inglaterra", "value": "england", "campeonatos": [
        {"nome": "Premier League", "value": "premier-league"},
        {"nome": "EFL Championship", "value": "2-divisao"}
    ]},
    {"pais": "Italia", "value": "italy", "campeonatos": [
        {"nome":"Serie A", "value": "serie-a"},
        {"nome":"Serie b", "value": "serie-b"}
    ]}
]

const entradas = [
    {sigla: 'HTHG', signif: 'Gols do Time da Casa no 1° tempo'},
    {sigla: 'HTAG', signif: 'Gols do Time de Fora no 1° tempo'},
    {sigla: 'HS', signif: 'Finalizações time da casa'},
    {sigla: 'AS', signif: 'Finalizações time de fora'},
    {sigla: 'HST', signif: 'Chutes ao gol time da casa'},
    {sigla: 'AST', signif: 'Chutes ao gol time de fora'},
    {sigla: 'HC', signif: 'Escanteios para o time da casa'},
    {sigla: 'AC', signif: 'Escanteios para o time de fora'},
    {sigla: 'HY', signif: 'Cartões Amarelos para o time da casa'},
    {sigla: 'AY', signif: 'Cartões Amarelos para o time de fora'},
    {sigla: 'HR', signif: 'Cartões Vermelhos para o time da casa'},
    {sigla: 'AR', signif: 'Cartões Vermelhos para o time de fora'}
]

let entradasSelecionadas = []
// Funções
function carregarCampeonatosPorPais() {
    let paisSelecionado = document.querySelector("#paisesSelect").value
    document.querySelector("#campeonatoSelect").innerHTML = `
        <option value="">Selecione um campeonato</option>
    `
    for (let i = 0; i < campeonatosPorPais.length; i++) {
        if (campeonatosPorPais[i].value == paisSelecionado) {
            for (let j = 0; j < campeonatosPorPais[i].campeonatos.length; j++) {
                document.querySelector("#campeonatoSelect").innerHTML += `
                    <option value="${campeonatosPorPais[i].campeonatos[j].value}">${campeonatosPorPais[i].campeonatos[j].nome}</option>
                `
            }
        }
    }
}

function carregarListaEntradas(){
    document.querySelector("#listaEntradas").innerHTML = ``
    for (let i = 0; i < entradas.length; i++) {
        if (entradasSelecionadas.includes(entradas[i].sigla)) {
            document.querySelector("#listaEntradas").innerHTML += `<li class="itemListaEntradas">
                <input type="checkbox" name="entrada${i}" id="entrada${i}" checked value="${entradas[i].sigla}" class="checkboxInput">
                <label for="entrada${i}">${entradas[i].sigla}</label>
                <span class="descText">${entradas[i].signif}</span>
            </li>`
        } else {
            document.querySelector("#listaEntradas").innerHTML += `<li class="itemListaEntradas">
                <input type="checkbox" name="entrada${i}" id="entrada${i}" value="${entradas[i].sigla}" class="checkboxInput">
                <label for="entrada${i}">${entradas[i].sigla}</label>
                <span class="descText">${entradas[i].signif}</span>
            </li>`
        }
    }
    document.querySelector("#modalEntradas").style.display = "flex"
}

function marcarTodas() {
    let checkboxs = document.querySelectorAll('.checkboxInput');
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = true
    }
}
function desmarcarTodas() {
    let checkboxs = document.querySelectorAll('.checkboxInput');
    for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = false
    }
}

function selecionarEntradas() {
    let inputs = document.querySelectorAll('.checkboxInput');
    entradasSelecionadas = []
    for (var i = 0; i < inputs.length; i++) {   
        if (inputs[i].checked == true) {
            entradasSelecionadas.push(inputs[i].value)
        }
    }
    if (entradasSelecionadas.length == 0) {
        document.querySelector("#alertaNenhumaEnt").style.display = "inline"
    } else {
        fecharModal()
    }
}

function fecharModal() {
    document.querySelector("#modalEntradas").style.display = "none"
    if (entradasSelecionadas.length == 1 ){
        document.querySelector("#entradasSelecionadas").value = entradasSelecionadas
        document.querySelector("#qntdEntradas").innerText = `${entradasSelecionadas.length} entrada`
    } else {
        document.querySelector("#entradasSelecionadas").value = entradasSelecionadas
        document.querySelector("#qntdEntradas").innerText = `${entradasSelecionadas.length} entradas`
    }
}
