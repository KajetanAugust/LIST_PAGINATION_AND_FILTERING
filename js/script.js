/******************************************
 Treehouse Techdegree:
 FSJS project 2 - List Filter and Pagination
 ******************************************/

///////////////
// VARIABLES //
///////////////

const listOfStudents = document.querySelectorAll('.student-list li'); // selecting list of students

let pageNumber = 10;//page number multiplied by 10


const searchBox = document.createElement('div');//creating div element
searchBox.setAttribute('class', 'student-search');//adding class for the div element
searchBox.innerHTML = `
                     <input placeholder="Search for students...">
                     <button>Search</button>
                   `;//setting innerHtml for div element
document.querySelector('.page-header').appendChild(searchBox);//appending searchbox to the page


///////////////////////
// FUNCTION showPage //
///////////////////////

const showPage = (list, page) => {
    for (let i = 0; i < list.length; i++) {//filtering students loop
        if (i >= page) { //filtering students with number greater than or equal page number
            list[i].style.display = 'none'
        } else if (i < page - 10) { //filtering students with number lesser than page number -10
            list[i].style.display = 'none'
        } else { //setting display for selected students
            list[i].style.display = 'block'
        }
    }
};


//////////////////////////////
// FUNCTION appendPageLinks //
//////////////////////////////

const appendPageLinks = (list) => {

    const neededPages = Math.ceil(list.length / 10);// calculating number of needed page buttons (dividing number of students by 10 and rounding it to ceil)
    let pages = ''; //initialized variable for page buttons

    for (let i = 1; i <= neededPages; i++) { //for loop for creating buttons
        if (i === 1) { // if button is the first button it gets the class of active
            pages += ` <li>
                        <a class="active" href="#">${i}</a>
                      </li>`
        } else { //all other buttons are created
            pages += `<li>
                        <a href="#">${i}</a>
                      </li>`;
        }

    }

    const finalHtml = //creating variable holding final page buttons
        `
        <ul>
            ${pages}
        </ul>
       `;

    const paginationDiv = document.createElement('div');//creating div element
    paginationDiv.setAttribute('class', 'pagination');//adding class for the div element
    paginationDiv.innerHTML = finalHtml;//setting innerHtml for div element
    document.querySelector('.page').appendChild(paginationDiv);//appending pagination to the page
    const buttonsUl = document.querySelector('.pagination ul'); //selecting all the buttons

    buttonsUl.addEventListener('click', (e) => { //adding event listener to page buttons parent (ul)
        const target = e.target; //getting e.target
        const targetAttribute = target.getAttribute('href'); // getting attribute of target
        const buttons = document.querySelectorAll('.pagination ul li a'); //selecting all buttons
        if (targetAttribute === '#') { //checking if target is a tag
            for (let i = 0; i < buttons.length; i++) { //looping through the buttons
                buttons[i].removeAttribute('class'); //removing active class
            }
            target.setAttribute('class', 'active'); // adding active class to selected button
            pageNumber = parseInt(target.innerText) * 10;
        }

        showPage(list, pageNumber); //calling function showing list of students
    });

};

appendPageLinks(listOfStudents); //calling function showing initial list of students
showPage(listOfStudents, pageNumber); //calling showPage function


//////////////////////////
// SEARCH FUNCTIONALITY //
//////////////////////////

const searchBar = document.querySelector('.student-search input'); //selecting search bar
const searchButton = document.querySelector('.student-search button'); // selecting search button
const studentNames = document.querySelectorAll('.student-details h3'); // selecting student names

searchButton.addEventListener('click', () => { //adding event listener for search button
    const searchVal = searchBar.value.toLowerCase(); //selecting value of search box and changing letters to lower case on click
    let filteredStudents = []; //creating array for new list of students

    for (let i = 0; i < listOfStudents.length; i++) { // looping through list of students
        const persons = studentNames[i].textContent.toLowerCase(); //changing student names to lower case
        if (persons.includes(searchVal) === true) { //checking if student name includes search value
            filteredStudents.push(listOfStudents[i]); //the name is pushed to array of filtered students
        }
    }

    const paginationDiv = document.querySelector('.pagination'); //selecting pagination div
    document.querySelector('.page').removeChild(paginationDiv); //removing pagination from the page
    for (let i = 0; i < listOfStudents.length; i++) { //looping through displayed students
        listOfStudents[i].style.display = 'none' //hiding the students
    }
    const noResults = document.querySelector('.no-results-alert');//selecting existing noResults div
    if (noResults) { //checking if noResults div exists
        document.querySelector('.page').removeChild(noResults);//removing no results div from the page
    }
    if (filteredStudents.length === 0) { // checking if search result length is equal 0
        const noResults = document.createElement('div'); // creating div element
        noResults.setAttribute('class', 'no-results-alert'); // adding class
        noResults.innerHTML =
            `<h2>Sorry!</h2> 
             <h4>No results were found.</h4>
            `;//setting innerHtml for div element
        document.querySelector('.page').appendChild(noResults);//appending no results div to the page
        document.querySelector('.no-results-alert').style = 'color:gray; text-align: center; font-size:2rem; padding-top:50px; ';//setting noResult message style
    }

    appendPageLinks(filteredStudents); //adding pagination
    showPage(filteredStudents, pageNumber); // displaying filtered students
});
