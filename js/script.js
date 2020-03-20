/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/




/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const listOfStudents = document.querySelectorAll('.student-list li');

let pageNumber = 10;


const searchBox = document.createElement('div');//creating div element
searchBox.setAttribute('class','student-search');//adding class for the div element
searchBox.innerHTML = `
                     <input placeholder="Search for students...">
                     <button>Search</button>
                   `;//setting innerHtml for div element
document.querySelector('.page-header').appendChild(searchBox);//appending searchbox to the page


const showPage = (list, page) => {
    for(let i=0; i < list.length; i++) {
        if(i >= page ){
            list[i].style.display = 'none'
        }else if(i < page - 10){
            list[i].style.display = 'none'
        }else{
            list[i].style.display = 'block'
        }
    }
    console.log(list);
};






/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {

    showPage(listOfStudents, pageNumber);
    const neededPages = Math.ceil(list.length/10);
    let pages = '';

    for(let i = 1; i <= neededPages; i++){
        if(i === 1){
            pages+= ` <li>
                        <a class="active" href="#">${i}</a>
                      </li>`
        }else{
            pages += `<li>
                        <a href="#">${i}</a>
                      </li>`;
        };
    }

   const finalHtml =
       `
        <ul>
            ${pages}
        </ul>
       `;

    const paginationDiv = document.createElement('div');//creating div element
    paginationDiv.setAttribute('class','pagination');//adding class for the div element
    paginationDiv.innerHTML = finalHtml;//setting innerHtml for div element
    document.querySelector('.page').appendChild(paginationDiv);//appending pagination to the page
    const buttonsUl = document.querySelector('.pagination ul'); //selecting all the buttons

    buttonsUl.addEventListener('click',(e) =>{
        const target = e.target;
        const targetAttribute = target.getAttribute('href');
        const buttons = document.querySelectorAll('.pagination ul li a');
        console.log(buttons);
        if(targetAttribute === '#'){
            for(let i=0; i<buttons.length; i++) {
                buttons[i].removeAttribute('class');
            }
            target.setAttribute('class','active');
            pageNumber = parseInt(target.innerText)*10;
        };
        showPage(listOfStudents, pageNumber);
    });

};

appendPageLinks(listOfStudents);

// Remember to delete the comments that came with this file, and replace them with your own code comments.