let url = "";
let url_base = "https://api.edamam.com/search?q=";
let url_search = "&app_id=cd010a2d&app_key=7ac3087b80efa1ee353dcaba53c8e10e"
let input = document.getElementsByTagName("input")[0];
let input_text = "";
let search = document.getElementById("search");
let tip = document.getElementsByTagName("h3")[0];
let main = document.getElementById("main");
let obj;
let dishes;
let showing = false; 


//RUN FUNCTION WHEN SEARCH BUTTON CLICKED
function handleSearch(){
  if(main.innerHTML !== ""){
    main.innerHTML = "";
  }
  tip.style.opacity = 1;
//COMBINE THE URL WITH THE USER INPUT AND API KEY
  input_text = input.value;
  url = url_base + input_text + url_search;
  fetch(url)
  .then(res => res.json())
  .then(data => obj = data)
//MAKE FETCH REQUEST AND FILL THE MAIN DIV WITH THE RESULTS  
  .then(() => obj.hits.map((res,i) => main.innerHTML += 
   `<div class="dish">
   <img class="pics" src="${res.recipe.image}"/>
   <p>${res.recipe.label}</p>
   <p>By: ${res.recipe.source}</p>
   <p>Serves: ${res.recipe.yield}</p>
   <div class="ingredients">
    ${res.recipe.ingredientLines.map(item => `<p>${item}</p>`).join("")}
    </div>
   </div>`))
  //ADD THE EVENT LISTENER TO EACH DISH TO SHOW ITS INGREDIENTS WHEN THE IMAGE IS CLICKED
   .then(dishes =        Array.from(document.getElementsByTagName("div")))
  
  dishes.map(dish => dish.addEventListener("click",handleClick));
}


search.addEventListener("click",handleSearch);


//RUN FUNCTION TO SHOW THE DISH INGREDIENTS
function handleClick(e){
 let currentDish;
 if(e.target.classList.contains("pics") && !showing){
   currentDish = e.target.parentElement.lastElementChild;
   currentDish.classList.add("expand");
   showing = true;
 } else if(e.target.classList.contains("pics") && showing){
   currentDish = e.target.parentElement.lastElementChild;
   currentDish.classList.remove("expand");
   showing = false;
 }
}













  













