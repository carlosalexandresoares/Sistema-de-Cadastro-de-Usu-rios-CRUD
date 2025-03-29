const btn = document.getElementById("btn")

function validarNome() {
    let nomeUsuario = document.getElementById("name").value;
    let erroName = document.getElementById("erroName");

    let temNumero = /\d/.test(nomeUsuario);

    if (nomeUsuario.length < 4) {
        erroName.innerText = "O nome deve ter pelo menos 4 caracteres!";
    } else if (temNumero) {
        erroName.innerText = "O nome não pode conter números!";
    } else {
        erroName.innerText = "";
    }
}
    
function validarEmail(){
    let emailUsuario = document.getElementById("email").value
    let erroEmail = document.getElementById("erroEmail");

    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(emailUsuario) ) {
        erroEmail.innerText = "E-mail inválido! Digite um e-mail válido.";
    }else{
        erroEmail.innerText =''
    }  
}

function validarTel() {
    let telefoneUsuario = document.getElementById("phone").value
    let erroTel = document.getElementById("erroTel")

    const regexTel = /^\d{11}$/;
    if (!regexTel.test(telefoneUsuario)) {
        erroTel.innerText = "Número de telefone inválido";
    }else{
        erroTel.innerText = ""
    }
}

function validarData() {
    let dataNasciomentoUsuario = new Date(document.getElementById("date").value)
    let dataDoDia = new Date()
    let erroData = document.getElementById("erroData")
    let idadeMinima = new Date()
    let idadeMaxima = new Date()

    idadeMinima.setFullYear(dataDoDia.getFullYear() - 18)
    idadeMaxima.setFullYear(dataDoDia.getFullYear() - 65)
    if (dataNasciomentoUsuario > dataDoDia) {
        erroData.innerText = "Data de nascimento inválida"
    } else if (dataNasciomentoUsuario > idadeMinima) {
        erroData.innerText = "Idade precisa ser maior ou igual á 18"
    } else if (dataNasciomentoUsuario <= idadeMaxima) {
        erroData.innerText = 'Idade máxima permitida é 64 anos'
    } else {
        erroData.innerText = ''
    }
}

btn.addEventListener("click", () => {
    document.getElementById("my-form").addEventListener("submit", function (event) {
        event.preventDefault();
    });

    let emailUsuario = document.getElementById("email").value
    let nomeUsuario = document.getElementById("name").value
    let telefoneUsuario = document.getElementById("phone").value
    let dataNasciomentoUsuario = new Date(document.getElementById("date").value)
    let cargoSelecionado = document.getElementById("cargo")
    let cargoUsuario = cargoSelecionado.options[cargoSelecionado.selectedIndex].text
   
    let usuarioCadastrados = JSON.parse(localStorage.getItem("cadastroUsuario")) || [];

    if (!Array.isArray(usuarioCadastrados)) {
        usuarioCadastrados = [];
    }

    function formatarData(dataNasciomentoUsuario) {
        let data = new Date(dataNasciomentoUsuario);
        let dia = data.getDate().toString().padStart(2, "0");
        let mes = (data.getMonth() + 1).toString().padStart(2, "0"); 
        let ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    let dataFormatada = formatarData(dataNasciomentoUsuario);

    let cadastrarUsuario = {
        idUsuario: crypto.randomUUID(),
        nomeDoUsuario: nomeUsuario,
        emailUsuario: emailUsuario,
        telefoneUsuario: telefoneUsuario,
        dataNasciomentoUsuario: dataFormatada,
        cargoUsuario: cargoUsuario
    }

    let erroCargo = document.getElementById("erroCargo")
    if (cargoUsuario == "") {
        erroCargo.innerText = "Selecione um cargo"
    } else {
        erroCargo.innerText = ""
    }

    validarNome();
    validarEmail()
    validarTel();
    validarData();

   

    let erroEmailExistente = document.getElementById("erroEmail")
    let erroTelExistente = document.getElementById("erroTel")
    let telExistente = usuarioCadastrados.find(usuario => usuario.telefoneUsuario === telefoneUsuario)
    let emailExistente = usuarioCadastrados.find(usuario => usuario.emailUsuario === emailUsuario);

    if(emailExistente){
     erroEmailExistente.innerText ="Email já está cadastrado."
    }else if(telExistente){
        erroTelExistente.innerText="Telefone já está cadastrado."
    } else{
        usuarioCadastrados.push(cadastrarUsuario)
    }
    
    if (!erroName.innerText && !erroEmail.innerText &&!erroTel.innerText && !erroData.innerText && !erroCargo.innerText) {

        localStorage.setItem("cadastroUsuario", JSON.stringify(usuarioCadastrados))

        window.location.href = "usuarios.html";
    } 
    
})

