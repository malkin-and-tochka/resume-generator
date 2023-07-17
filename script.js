const resumeForm = document.getElementById("resumeForm")
const blockField = document.getElementById('blockField')
const event1 = resumeForm.event
const event2 = blockField.event



resumeForm.addEventListener("submit", form1Submit)
const fullName = document.getElementById('fullName')
//submit первой формы
function form1Submit(e) {
    const fullName = document.getElementById("fullName")
    const birthYear = document.getElementById("birthYear")
    const email = document.getElementById("email")

    let isValid = true;

    if (fullName.value === "") {
        showError("fullName", "Пожалуйста, введите ФИО");
        isValid = false;
    } else {
        hideError("fullName");
    }

    if (birthYear.value === "" || isNaN(birthYear.value)) {
        showError("birthYear", "Пожалуйста, введите год рождения");
        isValid = false;
    } else {
        hideError("birthYear");
    }

    if (email.value === "") {
        showError("email", "Пожалуйста, введите почту");
        isValid = false;
    } else {
        hideError("email");
    }

    if (!isValid) {
        e.preventDefault();
    }

    const photo = document.getElementById('photo')
    photo.value = ''
    fullName.value = ''
    email.value = ''
    birthYear.value = ''
}


//Валидация первой формы
function showError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const testSpan = document.getElementById(`error${fieldId}`)
    if (testSpan){
        return

    }
    const errorSpan = document.createElement("span");
    errorSpan.className = `error${fieldId}`;
    errorSpan.id = `error${fieldId}`
    errorSpan.innerHTML = errorMessage;

    const existingError = field.parentNode.querySelector(`error${fieldId}`);
    if (existingError) {
        field.parentNode.removeChild(existingError);
    }
    field.parentNode.appendChild(errorSpan);
}

function hideError(fieldId) {
    const field = document.getElementById(fieldId);
    const existingError = field.parentNode.querySelector("error");
    if (existingError) {
        field.parentNode.removeChild(existingError);
    }
}


//Данные из первой формы
const data = {}
resumeForm.addEventListener('input', e => {
    data[e.target.name] = e.target.value
})


//Загрузка фото
const inputImg = document.getElementById('photo')
const img = document.getElementById('img')
inputImg.onchange = e => {
    const target = e.target
    const fileReader = new FileReader()
    fileReader.onload = () => {
        img.src = fileReader.result
    }
    //сделать, чтобы когда ты второй раз выбераешь фото небыло тогла
    if (img.src) {
        img.classList.toggle('hidden')
    }
    fileReader.readAsDataURL(target.files[0]);
}


//добавляю сбор данных с input
const userFieldData = {}
blockField.addEventListener('input', e => {
    userFieldData[e.target.name] = e.target.value
})


//Добавление блока полей
const addFieldButton = document.getElementById('addButton')
addFieldButton.addEventListener('click', e => {
    const blockName = userFieldData.groupName


    const nameBlock = document.getElementById('groupName')
    nameBlock.value = ''
    const fieldsCount = document.getElementById('fieldCounter')
    fieldsCount.value = ''

    let isValid = true;
    console.log('value of blockName: ' + nameBlock.value)
    if (nameBlock.value === "") {
        showError("groupName", "Пожалуйста, введите заголовок блока");
        isValid = false;
    } else {
        hideError("groupName");
    }

    if (fieldsCount.value === "" || isNaN(fieldsCount.value)) {
        showError("fieldCounter", "Пожалуйста, введите количество заголовков");
        isValid = false;
    } else {
        hideError("fieldCounter");
    }

    if (!isValid) {
        e.preventDefault();
    }

    const h = document.createElement('h')
    h.textContent = `${blockName}`
    h.className = 'top'

    const insert = document.getElementById('addFieldsButton')
    const parentDiv = insert.parentNode;
    parentDiv.insertBefore(h, insert);

    for (let i = 0; i < userFieldData.fieldCounter; i++) {
        addField(blockName)
    }
})


//Добавление поля
function addField(blockName) {
    const container = document.getElementById("addField");

    const subContainer = document.createElement('div')
    subContainer.className = 'subContainer'
    subContainer.id = 'subContainer'
    container.appendChild(subContainer)


    const newLabel = document.createElement("label");
    newLabel.textContent = "Заголовок поля";
    const newInput = document.createElement("input");
    newInput.className = `${blockName}`
    newInput.id = '0'


    const newLabel1 = document.createElement("label");
    newLabel1.textContent = "Содержание поля";
    const newInput1 = document.createElement("input");
    newInput1.className = `${blockName}`
    newInput1.id = '1'

    const insert = document.getElementById('addFieldsButton')
    const parentDiv = insert.parentNode;
    // Добавляем новый элемент в контейнер
    parentDiv.insertBefore(newLabel, insert);
    parentDiv.insertBefore(newInput, insert);
    parentDiv.insertBefore(newLabel1, insert);
    parentDiv.insertBefore(newInput1, insert);

}


const form = document.getElementById("addField");
form.addEventListener("submit", form1Submit.bind(event1))
form.addEventListener("submit", form2Submit)
const allUserCreatedFieldsData = {}

//сбор данных с дополнительной формы
let fieldValues = []
const blockNamesWithLength = new Map()

function form2Submit() {

    const inputs = form.querySelectorAll("input");
    const formData = {};
    let fieldsArr = []
    let counter = 1
    inputs.forEach(function (input, i) {

        if (blockNamesWithLength.get(input.className) !== undefined) {
            blockNamesWithLength.set(input.className, counter + 1)
            counter++
        } else {
            counter = 1
            blockNamesWithLength.set(input.className, counter)
        }

        fieldsArr.push(input.value)
        formData[i] = input.value

        allUserCreatedFieldsData[input.className] = formData
    });

    fieldValues = splitArrayIntoPairs(fieldsArr)


    //здесь описана та самая функция, которая выводит блоки с
    const insert = document.getElementById('resume')
    const parentDiv = insert.parentNode;
    console.log(blockNamesWithLength)
    for (let key of blockNamesWithLength.keys()) {
        const blockName = document.createElement('div')
        blockName.textContent = key
        parentDiv.insertBefore(blockName, insert)
        const length = blockNamesWithLength.get(key) / 2
        for (let i = 0; i < length; i++) {
            const element = document.createElement('div')
            element.textContent = `- ${fieldValues[i][0]}: ${fieldValues[i][1]}`
            parentDiv.insertBefore(element, insert);
        }
    }
    fillResume()
}



//заполнение основного резюме
function fillResume() {

    const fullNameR = document.getElementById('fullNameR')
    fullNameR.textContent = data.fullName

    const birthYearR = document.getElementById('birthYearR')
    birthYearR.textContent = data.birthYear

    const emailR = document.getElementById('emailR')
    emailR.textContent = data.email
    //img
    const imgR = document.getElementById('imgR')
    imgR.src = `${data.photo}`
}


//разбиение массива на пары
function splitArrayIntoPairs(array) {
    const pairs = [];

    for (let i = 0; i < array.length; i += 2) {
        const pair = array.slice(i, i + 2);
        pairs.push(pair);
    }

    return pairs;
}
