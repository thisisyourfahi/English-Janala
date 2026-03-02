const message = document.getElementById('message');
const empty = document.getElementById('empty');

// load functions
const loadLevelWord = (level) => {
    const url = `https://openapi.programming-hero.com/api/level/${level}`;
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
const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
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

    console.log(words.length);

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
        <button class="btn btn-soft btn-primary">
        <i class="fa-solid fa-circle-info"></i>
        </button>
        <button class="btn btn-soft btn-primary">
        <i class="fa-solid fa-volume-high"></i>
        </button>
        </div>
        `;
        return div;
}
