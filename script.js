//глобальные данные второй формы

//сбор данных блок-формы
const addBlockForm = document.getElementById('addBlockForm')
addBlockForm.onsubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(addBlockForm)

    addBlock(e, formData)
}

//добавление дополнительного поля

const addBlock = (e, formData) => {
    const nameBlock = document.getElementById('groupName')
    const fieldsCount = document.getElementById('fieldCounter')

    const blockName = formData.get('groupName')
    const blockLength = formData.get('fieldCounter')

    const h = document.createElement('h')
    h.textContent = `${blockName}`
    h.className = 'top'

    const insert = document.getElementById('addFieldsButton')
    const parentDiv = insert.parentNode;
    parentDiv.insertBefore(h, insert);

    for (let i = 0; i < blockLength; i++) {
        addField(blockName)
    }
    nameBlock.value = ''
    fieldsCount.value = ''
}


//подгрузка фото
const inputImg = document.getElementById('photo')
const img = document.getElementById('img')
inputImg.onchange = e => {
    const target = e.target
    const fileReader = new FileReader()
    fileReader.onload = () => {
        img.src = fileReader.result
    }
    if (img.src) {
        img.classList.toggle('hidden')
    }
    fileReader.readAsDataURL(target.files[0]);
}


//Добавление поля
function addField(blockName) {
    const newLabel = document.createElement("label");
    newLabel.textContent = "Заголовок поля";
    const newInput = document.createElement("input");
    newInput.className = `${blockName}`
    newInput.id = '0'
    newInput.name = `${blockName}`


    const newLabel1 = document.createElement("label");
    newLabel1.textContent = "Содержание поля";
    const newInput1 = document.createElement("input");
    newInput1.className = `${blockName}`
    newInput1.id = '1'
    newInput1.name = `${blockName}`

    const insert = document.getElementById('addFieldsButton')
    const parentDiv = insert.parentNode;
    // Добавляем новый элемент в контейнер
    parentDiv.insertBefore(newLabel, insert);
    parentDiv.insertBefore(newInput, insert);
    parentDiv.insertBefore(newLabel1, insert);
    parentDiv.insertBefore(newInput1, insert);

}


//Сбор данных главной формы
const mainForm = document.getElementById('mainForm')
mainForm.onsubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(mainForm)
    // for (let [name, value] of formData) {
    //     console.log(`${name} = ${value}`);
    // }

    resumeGenerator(formData)

}


//resume generator
const resumeGenerator = (formData) => {
    mainFillResume(formData)
    formData.delete('fullName')
    formData.delete('birthYear')
    formData.delete('email')
    formData.delete('photo')
    for (let [name, value] of formData) {
        console.log(`${name} = ${value}`);
    }
    subFillResume(formData)

}

//заполнение основных данных
function mainFillResume(data) {

    const fullNameR = document.getElementById('fullNameR')
    fullNameR.textContent = data.get('fullName')

    const birthYearR = document.getElementById('birthYearR')
    birthYearR.textContent = data.get('birthYear')

    const emailR = document.getElementById('emailR')
    emailR.textContent = data.get('email')
    //img
    // const imgR = document.getElementById('imgR')
    // imgR.src = `${data.photo}`
}


//заполнение новых данных
function subFillResume(formData) {
    const map = new Map()
    const arr = []
    let counter = 0
    for (let [key, value] of formData) {
        if (map.get(key) === undefined) {
            map.set(key, 1)
            counter = 1
        } else {
            counter++
            map.set(key, counter)
        }

        arr.push(value)
    }
    console.log(map)
    const splitArr = splitArrayIntoPairs(arr)
    console.log(splitArr)

    const insert = document.getElementById('resume')
    const parentDiv = insert.parentNode;

    for (let key of map.keys()) {
        const blockName = document.createElement('div')
        blockName.textContent = key
        parentDiv.insertBefore(blockName, insert)
        const length = map.get(key) / 2
        for (let i = 0; i < length; i++) {
            const element = document.createElement('div')
            element.textContent = `- ${splitArr[i][0]}: ${splitArr[i][1]}`
            parentDiv.insertBefore(element, insert);
        }
        splitArr.splice(0, length)
    }

}


function splitArrayIntoPairs(array) {
    const pairs = [];

    for (let i = 0; i < array.length; i += 2) {
        const pair = array.slice(i, i + 2);
        pairs.push(pair);
    }

    return pairs;
}

