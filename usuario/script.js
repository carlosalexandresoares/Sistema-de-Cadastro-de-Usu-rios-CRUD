document.addEventListener("DOMContentLoaded", carregarUsuarios);

function carregarUsuarios() {
    let tbody = document.getElementById("table-body")

    tbody.innerHTML = "";

    let usuarioCadastrados = JSON.parse(localStorage.getItem('cadastroUsuario')) || [];

    usuarioCadastrados.forEach((usuario, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td >${usuario.nomeDoUsuario}</td>
                    <td >${usuario.emailUsuario}</td>
                    <td>${usuario.telefoneUsuario}</td>
                    <td>${usuario.dataNasciomentoUsuario}</td>
                    <td>${usuario.cargoUsuario}</td>
                    <td>
                         <button class="edit-btn" onclick="editarItem(${index})">Editar</button>
                        <button class="delete-btn" onclick="excluirItem(${index})">Excluir</button>
                    </td>
                `;
        tbody.appendChild(row);


    })
}

function ordenarUsuarios(campo) {
    let usuarioCadastrados = JSON.parse(localStorage.getItem('cadastroUsuario')) || [];

    usuarioCadastrados.sort((a, b) => {
        return a[campo].localeCompare(b[campo]);
    });

    localStorage.setItem('cadastroUsuario', JSON.stringify(usuarioCadastrados));
    carregarUsuarios();
}

function filtrarUsuarios() {
    let termoPesquisa = document.getElementById("pesquisa").value.toLowerCase();
    let usuarioCadastrados = JSON.parse(localStorage.getItem('cadastroUsuario')) || [];
    let tbody = document.getElementById("table-body");

    tbody.innerHTML = "";

    let usuariosFiltrados = usuarioCadastrados.filter(usuario =>
        usuario.nomeDoUsuario.toLowerCase().includes(termoPesquisa) ||
        usuario.cargoUsuario.toLowerCase().includes(termoPesquisa)
    );

    usuariosFiltrados.forEach((usuario, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${usuario.nomeDoUsuario}</td>
            <td>${usuario.emailUsuario}</td>
            <td>${usuario.telefoneUsuario}</td>
            <td>${usuario.dataNasciomentoUsuario}</td>
            <td>${usuario.cargoUsuario}</td>
            <td>
                <button class="edit-btn" onclick="editarItem(${index})">Editar</button>
                <button class="delete-btn" onclick="excluirItem(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}



function editarItem(index) {
    let usuarioCadastrados = JSON.parse(localStorage.getItem('cadastroUsuario')) || [];
    let usuario = usuarioCadastrados[index];
    let novoNome;
    let temNumero;
    do {
        novoNome = prompt("Editar Nome:", usuario.nomeDoUsuario)
        temNumero = /\d/.test(novoNome);
        if (novoNome === null) {
            alert("Operação cancelada.");
            break;
        }

        if (novoNome.length < 4) {
            alert("O nome deve ter pelo menos 4 caracteres!")
        } else if (temNumero) {

            alert("O nome não pode conter números!")
        }
    } while (novoNome.length < 4 || temNumero)


    let novoEmail
    let regexEmail

    do {
        novoEmail = prompt("Editar Email:", usuario.emailUsuario);
        regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (novoEmail === null) {
            alert("Operação cancelada.");
            break;
        }

        if (!regexEmail.test(novoEmail)) {
            alert("E-mail inválido! Digite um e-mail válido.")
        }
    } while (!regexEmail.test(novoEmail))


    let novoTel
    let regexTel
    do {
        novoTel = prompt("Editar Telefone:", usuario.telefoneUsuario);
        regexTel = /^\d{11}$/;
        if (novoTel === null) {
            alert("Operação cancelada.");
            break;
        }

        if (!regexTel.test(novoTel)) {
            alert("Número de telefone inválido")
        }

    } while (!regexTel.test(novoTel))

    let novaData;
    let regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    let idade;
    let dataValida = false;

    do {
        novaData = prompt("Editar Data de Nascimento:", usuario.dataNascimentoUsuario);

        if (novaData === null) {
            alert("Operação cancelada.");
            break;
        }

        if (!regexData.test(novaData)) {
            alert("Data inválida! Use o formato correto: DD/MM/YYYY.");
            continue;
        }

        let [dia, mes, ano] = novaData.split("/").map(Number);
        let dataNascimento = new Date(ano, mes - 1, dia);

        if (
            dataNascimento.getDate() !== dia ||
            dataNascimento.getMonth() !== mes - 1 ||
            dataNascimento.getFullYear() !== ano
        ) {
            alert("Data inválida! Insira uma data real.");
            continue;
        }

        let hoje = new Date();
        idade = hoje.getFullYear() - dataNascimento.getFullYear();
        let mesAtual = hoje.getMonth() - dataNascimento.getMonth();
        let diaAtual = hoje.getDate() - dataNascimento.getDate();


        if (mesAtual < 0 || (mesAtual === 0 && diaAtual < 0)) {
            idade--;
        }

        if (idade < 18 || idade > 65) {
            alert("A idade deve estar entre 18 e 65 anos!");
            continue;
        }

        dataValida = true;

    } while (!dataValida);

    if (dataValida) {
        alert("Data válida! Idade: " + idade + " anos.");
    }

    let novoCargo
    let cargoValido = false

    do {
        novoCargo = prompt("Editar Cargo: insira 1 Para TI, 2 Para Administrador ou 3 Para Suporte", usuario.cargoUsuario)

        if (isNaN(novoCargo) || novoCargo === '') {
            alert("Por favor, insira um número válido!");
            continue;
        }

        novoCargo = Number(novoCargo);

        switch (novoCargo) {
            case 1:
                novoCargo = "TI"
                cargoValido = true
                break
            case 2:
                novoCargo = "Administrador"
                cargoValido = true
                break
            case 3:
                novoCargo = "Suporte"
                cargoValido = true
                break
            default:
                alert("Valor invalido, insira 1 Para TI. 2 Para Administrador ou 3 Para Suporte")
        }
    } while (!cargoValido)





    if (novoNome && novoEmail && novoTel && novaData && novoCargo) {
        usuarioCadastrados[index] = {
            nomeDoUsuario: novoNome,
            emailUsuario: novoEmail,
            telefoneUsuario: novoTel,
            dataNasciomentoUsuario: novaData,
            cargoUsuario: novoCargo
        };

        localStorage.setItem("cadastroUsuario", JSON.stringify(usuarioCadastrados));
        carregarUsuarios();
    }

}

function excluirItem(index) {
    let usuarioCadastrados = JSON.parse(localStorage.getItem("cadastroUsuario")) || [];
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
        usuarioCadastrados.splice(index, 1);
        localStorage.setItem("cadastroUsuario", JSON.stringify(usuarioCadastrados));
        carregarUsuarios();
    }
}

