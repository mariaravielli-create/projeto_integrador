
/* =============================
   MEUESCOLA - FUNCIONALIDADES
   ============================= */

// FORMULÁRIO DA OUVIDORIA

const formOuvidoria = document.getElementById("formOuvidoria");

if (formOuvidoria) {

    formOuvidoria.addEventListener("submit", function(event) {

        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const turma = document.getElementById("turma").value;
        const tipo = document.getElementById("tipo").value;
        const local = document.getElementById("local").value;
        const assunto = document.getElementById("assunto").value;
        const mensagem = document.getElementById("mensagem").value;

        const protocolo = "MEU-" + Math.floor(100000 + Math.random() * 900000);

        const manifestacao = {
            nome,
            turma,
            tipo,
            local,
            assunto,
            mensagem,
            protocolo,
            status: "Recebida",
            data: new Date().toLocaleDateString("pt-BR")
        };

        let manifestacoes = JSON.parse(
            localStorage.getItem("manifestacoes") || "[]"
        );

        manifestacoes.push(manifestacao);

        localStorage.setItem(
            "manifestacoes",
            JSON.stringify(manifestacoes)
        );

        const resultado = document.getElementById("resultado");

        resultado.innerHTML = `
            <div class="painel">
                <h2>Manifestação enviada!</h2>
                <p>Sua manifestação foi registrada neste navegador.</p>
                <br>
                <p><strong>Seu protocolo:</strong></p>
                <h2>${protocolo}</h2>
                <p>Guarde esse número para consultar sua manifestação.</p>
                <a href="acompanhar.html" class="botao">
                    Acompanhar manifestação
                </a>
            </div>
        `;

        formOuvidoria.reset();

    });

}


// CONSULTA DE MANIFESTAÇÕES

const formConsulta = document.getElementById("formConsulta");

if (formConsulta) {

    formConsulta.addEventListener("submit", function(event) {

        event.preventDefault();

        const protocolo = document
            .getElementById("protocolo")
            .value.trim().toUpperCase();

        const manifestacoes = JSON.parse(
            localStorage.getItem("manifestacoes") || "[]"
        );

        const encontrada = manifestacoes.find(
            item => item.protocolo === protocolo
        );

        const resultado = document.getElementById("consultaResultado");

        resultado.innerHTML = "";

        if (encontrada) {

            const painel = document.createElement("div");
            painel.className = "painel";

            const titulo = document.createElement("h2");
            titulo.textContent = encontrada.assunto;

            const dados = [
                "Protocolo: " + encontrada.protocolo,
                "Tipo: " + encontrada.tipo,
                "Data: " + encontrada.data,
                "Turma: " + encontrada.turma,
                "Status: " + encontrada.status,
                "Mensagem: " + encontrada.mensagem
            ];

            painel.appendChild(titulo);

            dados.forEach(function(texto) {
                const p = document.createElement("p");
                p.textContent = texto;
                painel.appendChild(p);
            });

            resultado.appendChild(painel);

        } else {

            resultado.textContent =
                "Protocolo não encontrado. Verifique o número digitado.";

        }

    });

}
