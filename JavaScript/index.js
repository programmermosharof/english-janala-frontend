const loadlesson = () => {
    
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((data) => 
        displayLessons(data)
        
    )
}

const loadLevelWord = (id) => {
  
   const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => 
        displayLevelWord(data.data)
    )
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";


   words.forEach(word => {
    const wordDiv = document.createElement('div');
    wordDiv.innerHTML = `

      <div class="bg-slate-200 rounded-xl shadow-sm text-center p-5 space-y-4">
         <h2 class="font-bold text-xl">${word.word}</h2>
        <p class="font-semibold">Meaning / Pronounciation</p>
        <div class="text-2xl font-medium bangla-font">${word.meaning} / ${word.pronunciation}</div> 
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
          
        </div>
     </div>
 
    `;
    wordContainer.appendChild(wordDiv);
    
   } )

} 


loadLevelWord();
const displayLessons = (lessons) => {
    console.log(lessons);
    // get the container and empty it
    const levelContainer = document.getElementById('level-container');  
    // 2: get into every lesson and create a div for loop lesson
    for (const lesson of lessons.data) {
        // 3: create a div and set the innerHTML
        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
        <button href="" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary  mb-8">
            <i class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}
        </button>`;
        // 4: append the div to the container
        levelContainer.append(lessonDiv);

    }
  
}

loadlesson();