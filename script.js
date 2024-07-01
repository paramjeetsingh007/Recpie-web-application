
 let searchbtn=document.querySelector('#search-btn')
 let inputrecpie=document.querySelector('#inputrecpie')
 let recpiecontainer=document.querySelector('.recpie-container')
 let recpieclosebtn=document.querySelector('.recpie-close-btn')
 let recpiedetailscontent=document.querySelector('.recpie-details-content')

const searchrecpie = (query)=> {
   recpiecontainer.innerHTML='<h2>Fetching Recpie....</h2>'
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`).then((response)=>{
      return response.json()

   }).then(result=>{
     console.log(result);
      recpiecontainer.innerHTML=''
      result.meals.forEach(meal => {
         const recpiediv = document.createElement('div')
         recpiediv.classList.add('recpie')
         recpiediv.innerHTML=`
         <img src="${meal.strMealThumb}">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strArea} Dish</p>
          <p>${meal.strCategory}</p>
         `
         const button= document.createElement('button')
         button.innerHTML='View Recpie'
         recpiediv.append(button)
         button.addEventListener('click',()=>{
            openRecpiePopup(meal)
         })

         recpiecontainer.append(recpiediv)
         
      });
    

      
      }
   )
 
 }
 const fetchingingredient=(meal)=>{
   let Ingredientslist=''
   for(i=1;i<=20;i++){
      const ingredient=meal[`strIngredient${i}`]
      if(ingredient){
         const measure =meal[`strMeasure${i}`]
         Ingredientslist += `<li>${measure} ${ingredient}</li>`
      }
      else{
         break;
      }
    
   }
   return Ingredientslist

 }
 const openRecpiePopup=(meal)=>{
   recpiedetailscontent.innerHTML=`
   <h2 class='recpieName'>${meal.strMeal}</h2>
   <h3>Ingredients</h3>
   <ul class="ingredientList">${fetchingingredient(meal)}</ul>
   <div class="recpie-instruction">
     <h3>Instructions: </h3>
     <p class="instructions">${meal.strInstructions} </p>
   </div>
   `
  

      
   recpiedetailscontent.parentElement.style.display='block'

 }
 recpieclosebtn.addEventListener('click',()=>{
   recpiedetailscontent.parentElement.style.display='none'
 })
 

 searchbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const query = inputrecpie.value.trim()
   
    if(query==''){
      recpiecontainer.innerHTML=`<h2>Type the meal into the search box </h2>`
      return
    }
    searchrecpie(query)

 })