const loadlesson = () => {
    
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((data) => 
        displayLessons(data)
        
    )
}
const removeActive = () => {
    const activeRemove = document.querySelectorAll('.lesson-btn');
    activeRemove.forEach(btn => btn.classList.remove('active'));
}

const loadLevelWord = (id) => {
  
   const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
         removeActive();
         const clickBtn = document.getElementById(`lesson-btn-${id}`) ;
         clickBtn.classList.add('active');
           
        displayLevelWord(data.data);
    })
}



const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if(words.length === 0){
    wordContainer.innerHTML = `
    <div class="text-center  rounded-xl py-10 col-span-full space-y-6">
  <img class="mx-auto" src="assets/alert-error.png" alt="">
  <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
</div>
    
    
    `;
        
        return;
    }


   words.forEach(word => {
    const wordDiv = document.createElement('div');
    // 
    wordDiv.innerHTML = `

      <div class="bg-slate-200 rounded-xl shadow-sm text-center p-5 space-y-4">
         <h2 class="font-bold text-xl">${word.word ? word.word : "শব্দ পাওয়া যাইনি"}</h2>
        <p class="font-semibold">Meaning / Pronounciation</p>
        <div class="text-2xl font-medium bangla-font">${word.meaning ? word.meaning : " অর্থ পাওয়া যাইনি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation Not Found"}</div> 
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
          
        </div>
     </div>
 
    `;
    wordContainer.appendChild(wordDiv);
    
   } )

} 



const displayLessons = (lessons) => {
    console.log(lessons);
    // get the container and empty it
    const levelContainer = document.getElementById('level-container');  
    // 2: get into every lesson and create a div for loop lesson
    for (const lesson of lessons.data) {
        // 3: create a div and set the innerHTML
        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
        <button id ="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn  mb-8">
            <i class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}
        </button>`;
        // 4: append the div to the container
        levelContainer.append(lessonDiv);

    }
  
}

loadlesson();


