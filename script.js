const container = document.querySelectorAll('.container');
const content = document.querySelector('.content');
const descriptionDoc = document.querySelector('.container_description');
const btn = document.querySelectorAll('.btn');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.window__close');
const modalAdd = document.querySelector('.window__add');
const modalInput = document.querySelector('.window__input');

const description = {
    0: 'Задание 1. Написать цикл, который считает сумму целых чисел от 1 до 1000.',
    1: 'Задание 2. Задано случайное целое число от 2 до 30. Написать цикл, который вычисляет факториал заданного числа.',
    2: 'Задание 3. Вите 10 лет и он мечтает о велосипеде за 60 тыс. руб. Каждый день рождения мама дарит Вите 1000 руб, а папа, на 1200 руб больше, чем в прошлом году (начиная с 11 лет). Через сколько лет у Вити появится велосипед?',
    3: 'Задание 4. Дано два слова: "Огород" и "Шалаш". Написать код который проверяет является ли слово палиндромом, путем сравнения первой и последней букв. В ответе выводить фразу "Слово &ltword&gt [не] является палиндромом", где &ltword&gt - переменная со словом, а [не] присутствует или отсутствует в зависимости от результата.',
    4: 'Задание 5. Программа загадывает случайное целое число от 0 до 100 (вкл). При помощи prompt() пользователь старается угадать число. число угадано - программа останавливается и говорит, что пользователь выиграл число отличается на 5 пунктов (n-5 <= n <= n+5) - программа говорит "горячо" число отличается на 10 пунктов (n-10 <= n <= n+10) - программа говорит "тепло" в остальных случаях программа говорит "холодно". При всех вариантах, кроме первого, программа повторно продолжает спрашивать число, пока пользователь его не угадает.'
}

//Task 1
let total = 0;
for (let i = 1; i <= 1000; ++i) {
    total += i;
}

let totalStr = `Сумму целых чисел от 1 до 1000 = ${total}`

//Task 2
let randNum = Math.floor(Math.random() * 29) + 2;
let fact = randNum;
let factStr = `Факториал рандомного числа ${randNum} `
while (randNum > 1) {
    fact *= --randNum;
}

factStr += `равен ${fact}`

//Task 3
let age = 0;
let money = 0;
while (money < 60000) {
    age++;
    money += 1000 + 2200;
}

let afterYears = `Через ${age} лет`

//Task 4
let word = {
    0: "Огород",
    1: "Шалаш",
}

let palindrome = (el) => {
    const LEN = Math.floor(el.length / 2);
    el = el.toLowerCase();
    let check = true;
    for (let i = 0; i < LEN; ++i) {
        if (el[i] !== el[el.length - 1 - i]) {
            check = false;
            return check;
        }
    }
    return check;
}

let answer = [];
let result = () => {
    for (let i in word) {
        if (palindrome(word[i])) {
            answer[i] =  `Слово ${word[i]} является палиндромом`
        } else {
            answer[i] = `Слово ${word[i]} не является палиндромом`
        }
    }

    return answer
}
result()

//Task 5 
const NUMBER = Math.floor(Math.random() * 101);

//Answer
let task = {
    0: totalStr,
    1: factStr,
    2: afterYears,
    3: answer,
    4: '',
}

const rendering = () => {
    for (let j = 0; j < Object.keys(word).length; ++j) {
        const myDiv = document.createElement('div');
        myDiv.innerHTML = answer[j];
        content.appendChild(myDiv);
    }
}

const addText = (el) => {
    if (el === 3) {
        rendering();
        container[1].classList.add('container_active');
        container[1].addEventListener('click', () => {
            modal.style.display = 'flex';
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
            })
            modalAdd.addEventListener('click', () => {
                if (modalInput.value) {
                    word[`${Object.keys(word).length}`] = modalInput.value;
                    modalInput.value = '';
                    answer = [];
                    result();
                    content.innerHTML = '';
                    rendering();
                    modal.style.display = 'none';
                }
            })
        })
    } else {
        container[1].classList.remove('container_active');
    }
}

const addInput = (count) => {
    const myP = document.createElement('p');
    myP.appendChild(document.createTextNode('Введите число от 0 до 100'));
    myP.classList.add('window__text');
    content.appendChild(myP);

    const myInput = document.createElement('input');
    myInput.classList.add('window__input');
    myInput.style.marginBlock = '15px';
    content.appendChild(myInput);

    const myBtn = document.createElement('button');
    myBtn.appendChild(document.createTextNode('Проверить'));
    myBtn.classList.add('window__add');
    myBtn.style.backgroundColor = '#333';
    myBtn.style.color = '#fff';
    content.appendChild(myBtn);

    myBtn.addEventListener('click', () => {
        if ((+myInput.value >= 0) && (+myInput.value <= 100))  {
            myP.innerHTML = ''
            if (+myInput.value === NUMBER) {
                myP.appendChild(document.createTextNode('Вы угадали число!'));
                myBtn.disabled = true;
            } else if ((+myInput.value <= NUMBER + 5) && (+myInput.value >= NUMBER - 5)) {
                myP.appendChild(document.createTextNode('Вы очень близки! Горячо!'));
            } else if ((+myInput.value <= NUMBER + 10) && (+myInput.value >= NUMBER - 10)) {
                myP.appendChild(document.createTextNode('Вы близки! Тепло!'));
            } else {
                myP.appendChild(document.createTextNode('Вы далеко! Холодно!'));
            }
        }
    })
}

container[0].innerHTML = description[0];
content.innerHTML = task[0];
let count = 0;

btn[0].addEventListener('click', () => {
    if (count > 0) {
        count--;
        container[0].innerHTML = description[count];
        if ((count === 3) || (count === 4)) {
            content.innerHTML = '';
        } else {
            content.innerHTML = task[count];
        }
        container[1].addEventListener('click', () => {
            modal.style.display = 'none';
        })
    }

    btn[1].removeAttribute('disabled'); 
    (count === 0) && (btn[0].disabled = true)
    addText(count);
    count === 4 && addInput(count);
})

btn[1].addEventListener('click', () => {
    if (count < 4) {
        count++;
        container[0].innerHTML = description[count];
        if ((count === 3) || (count === 4)) {
            content.innerHTML = '';
        } else {
            content.innerHTML = task[count];
        }
        container[1].addEventListener('click', () => {
            modal.style.display = 'none';
        })
    }

    btn[0].removeAttribute('disabled'); 
    (count === 4) && (btn[1].disabled = true);
    addText(count);
    count === 4 && addInput(count);
})

if (window.innerWidth > 1500) {
    container[0].style.justifyContent = 'center';
    container[0].style.alignItems = 'center';
    content.style.justifyContent = 'center';
    content.style.alignItems = 'center';
} 

window.addEventListener('resize', function() {
    if (window.innerWidth > 1450) {
        container[0].style.justifyContent = 'center';
        container[0].style.alignItems = 'center';
        content.style.justifyContent = 'center';
        content.style.alignItems = 'center';
    } else {
        container[0].style.justifyContent = 'baseline';
        container[0].style.alignItems = 'baseline';
        content.style.justifyContent = 'start';
    }
})