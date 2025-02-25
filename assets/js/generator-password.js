// Selecionar os elementos do DOM usando o método querySelector, que retorna o primeiro
const sliderElement = document.querySelector('.password-generator__slider');
const buttonElement = document.querySelector('.password-generator__button');
const sizePassword = document.querySelector('.password-generator__size');
const password = document.querySelector('.password-generator__output');
const containerPassword = document.querySelector('.password-generator__result');
const welcomeElement = document.querySelector('.password-generator__welcome');
const datetimeElement = document.querySelector('.password-generator__datetime');


const combinations = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz', // Letras minúsculas
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // Letras maiúsculas
    special: '!@#$%&*', // Caracteres Especiais
    numbers: '0123456789' // Numeros
};

let novaSenha = '';
let historicoSenhas = [];

const getSaudacao = () =>{
    const hora = new Date().getHours();
    if(hora >= 5 && hora < 12) return 'Bom dia';
    if(hora >= 12 && hora < 18) return 'Boa tarde';
    return 'Boa noite';
};

const formatarDataHora = ()=>{
    const agora = new Date();
    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

    const dia = agora.getDate().toString().padStart(2, 0);
    const mes = (agora.getMonth() + 1).toString().padStart(2, 0);
    const ano = agora.getFullYear();
    const diaSemana = diasSemana[agora.getDay()];

    const hora = agora.getHours().toString().padStart(2, 0);
    const minutos = agora.getMinutes().toString().padStart(2, 0);
    const segundos = agora.getSeconds().toString().padStart(2, 0);

    return `${diaSemana}, ${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
}

const atualizarHeader = () =>{
    welcomeElement.textContent = `${getSaudacao()}!`;
    datetimeElement.textContent = formatarDataHora();
}


setInterval(atualizarHeader, 1000);

atualizarHeader();

sizePassword.innerHTML = sliderElement.value;

sliderElement.addEventListener('input', (e)=>{
    sizePassword.innerHTML = e.target.value;
});

const generatePassword = () => {
    let selectedCharset = '';

    const uppercaseChecked = document.querySelector('.uppercase-check').checked;
    const lowercaseChecked = document.querySelector('.lowercase-check').checked;
    const numbersChecked = document.querySelector('.numbers-check').checked;
    const specialChecked = document.querySelector('.special-check').checked;

    if(uppercaseChecked) selectedCharset += combinations.uppercase;
    if(lowercaseChecked) selectedCharset += combinations.lowercase;
    if(numbersChecked) selectedCharset += combinations.numbers;
    if(specialChecked) selectedCharset += combinations.special;

    if(!selectedCharset){
        selectedCharset = Object.values(combinations). join('');
        document.querySelector('.uppercase-check').checked = true;
        document.querySelector('.lowercase-check').checked = true;
        document.querySelector('.numbers-check').checked = true;
        document.querySelector('.special-check').checked = true;
    }

    let pass = '';

    for (let i = 0; i < sliderElement.value; ++i){
        pass += selectedCharset.charAt(Math.floor(Math.random() * selectedCharset.length));
    }

    containerPassword.classList.remove('hide');
    password.innerHTML = pass;
    novaSenha = pass;

    historicoSenhas.unshift(pass);

    if(historicoSenhas.length > 3){
        historicoSenhas.pop();
    }

    const historico = document.querySelector('.password-generator__history');
    if (historico){
        historico.style.display = 'block';

        historico.querySelector('.password-generator__history-list').innerHTML = historicoSenhas.map(senha => `<li class="password-generator__history-item">${senha}</li>`).join('');
    }
};