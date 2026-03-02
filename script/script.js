const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLesson(data.data));
}
loadLessons();

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <a href="" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>
                Lesson ${lesson.level_no}
            </a>
        `;
        levelContainer.appendChild(btnDiv);
    }
}