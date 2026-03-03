const message = document.getElementById('message');
const empty = document.getElementById('empty');

// active and inactive styles
const buttons = ['btn-lesson-1', 'btn-lesson-2', 'btn-lesson-3', 'btn-lesson-4', 'btn-lesson-5', 'btn-lesson-6', 'btn-lesson-7'];
const activeInactive = (btnID) => {
    buttons.forEach(button => {
        const clicked = document.getElementById(button)
        if (button === btnID) {
            clicked.classList.remove('btn-outline');
        } else {
            clicked.classList.add('btn-outline');
        }
    });
}

// load functions
const loadWordDetail = id => {
    // console.log('loadWordDetail:', id);
    const urlWord = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(urlWord)
        .then(res => res.json())
        .then(data => displayWordDetail(data.data));
}
const loadLevelWord = (level) => {
    const url = `https://openapi.programming-hero.com/api/level/${level}`;

    // applying styles on the selected lesson button
    const id = `btn-lesson-${level}`;
    activeInactive(id);

    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data));
}
const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLesson(data.data));
}
loadLessons();

// display functions
const displayWordDetail = word => {
    const wordModal = document.getElementById('my_modal_5');
    wordModal.innerHTML = `
        <div class="modal-box space-y-2">
            <h3 class="text-xl font-bold">${word.word}<span class="font-bangla">(${word.pronunciation})</span></h3>
            <p>Meaning: <span class="font-bangla">${word.meaning}</span></p>
            <p>Example: ${word.sentence}</p>
            <div>
                <p class="font-bangla">সমার্থক শব্দ গুলো</p>
                <div class="flex gap-2">
                    <button class="btn btn-sm btn-outline btn-primary cursor-default">${word.synonyms[0]}</button>
                    <button class="btn btn-sm btn-outline btn-primary cursor-default">${word.synonyms[1]}</button>
                    <button class="btn btn-sm btn-outline btn-primary cursor-default">${word.synonyms[2]}</button>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-sm btn-primary">Close</button>
                </form>
            </div>
        </div>
    `;
    wordModal.showModal();
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" id="btn-lesson-${lesson.level_no}" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
            Lesson ${lesson.level_no}
        </button>
        `;
        levelContainer.appendChild(btnDiv);
    }
}

const displayLevelWord = words => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.classList.add('md:grid-cols-3');
    message.classList.add('hidden');
    wordContainer.innerHTML = '';

    // console.log(words.length);

    // check emptiness
    if (words.length === 0) {
        empty.classList.remove('hidden');
        wordContainer.classList.remove('md:grid-cols-3');
        wordContainer.appendChild(empty);
    } else {
        empty.classList.add('hidden');
        wordContainer.classList.add('md:grid-cols-3');
        words.forEach(word => {
            const wordCard = createACard(word);
            wordContainer.appendChild(wordCard);
        });
    }

}

// create a card with html 
const createACard = word => {
    const div = document.createElement('div');
    div.className = 'card bg-white text-center space-y-4 p-8';
    div.innerHTML = `
        <p class="font-bold text-2xl">${word.word}</p>
        <p class="text-sm">Meaning/Pronunciation</p>
        <p class="text-xl font-bangla font-semibold">"${word.meaning}/${word.pronunciation}"</p>
        <div class="flex justify-between">
            <button onclick="loadWordDetail(${word.id})" class="btn btn-soft btn-primary">
                <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn btn-soft btn-primary">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
    `;
    return div;
}
