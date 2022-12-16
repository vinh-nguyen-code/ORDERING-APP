import { menuArray } from './data.js' 

//Declaration variables
const paymentForm = document.getElementById('payment-form')
let orderArray = []

//Event Listeners
document.addEventListener('click', function(e){
  if(e.target.dataset.add){
    addItemOrder(e.target.dataset.add) 
  } 
  else if (e.target.dataset.remove){
    removeItemOrder(e.target.dataset.remove)
  }
  else if (e.target.id ==='order-btn'){
    openPaymentModal()
  }
})

// Get the Menu data from data.js and create a HTML
function getMenuHtml(){
  let menuHtml = ''

    menuArray.forEach(function(item){
      menuHtml += 
      `
        <div class = "menu-item-container">
          <p class = "item-emoji">${item.emoji}</p>
          <div class ="item-info-wrapper">
            <h2 class ="item-name">${item.name}</h2>
            <p class ="item-ingredients">${item.ingredients}</p>
            <p class ="item-price">$${item.price}</p>
          </div>
          <div class ="add-btn-wrapper">
           <button class ="add-btn" data-add = '${item.id}'>+</button>
          </div>
        </div>
      `
    })
    return menuHtml
}

// Render the Menu into the Menu section 
function renderMenu(){
  document.getElementById("menu").innerHTML = getMenuHtml()
}
renderMenu()



//Match the selected Item with the same item in the Menu by filtering by id, then push its object to the orderArray then render the Order
function addItemOrder(selectItemId){
  const targetItemObj = menuArray.filter(function(selectItem){
    return selectItem.id == selectItemId
  })[0]
  orderArray.push(targetItemObj)  
  renderOrder()
  
  //Check if any item has been selected in the orderArray, unhide then the Order container (refer to the function removeItemOrder below)
    if(orderArray!=0){
        document.getElementById('order').classList.remove('hidden')
    }   
}


// iterate over the orderArray to generate html string based on what item have been selected
function getOrderHtml(){
  let totalPrice = 0
  let orderHtml =
  ` 
    <h2 class ="order-title">Your order</h2>
  `
  orderArray.forEach(function(orderItem, index){
    
    orderHtml += 
    `   
    <div class ="order-line">
        <h3>${orderItem.name} </h3>
        <p class ="remove-btn" data-remove = '${index}'>remove</p>
        <h3 class ="price">$${orderItem.price}</h3>
    </div>
    ` 
    totalPrice += orderItem.price     
  })
    
    /* WIP
    if(orderArray.includes(){
        console.log("duplicates")
    }
    */
    
    orderHtml +=
    `
    <hr>
    <div class ="total-price-line">
        <h3>Total price:</h3>
        <h3 class = "total-price">$${totalPrice}</h3>
    </div>
    <button class = "order-btn" id = "order-btn">Complete order</button>
    `
  return orderHtml

}


// Render the Order into the Order section
function renderOrder(){
  document.getElementById('order').innerHTML = getOrderHtml()
}


// Function to remove a selected Item from the order list
function removeItemOrder(index){
    orderArray.splice (index,1) // at position index, remove 1 item in the array
    renderOrder()
    
    //If there is no more item in the orderArray, hide the Order container
    if (orderArray.length===0){
        document.getElementById('order').classList.add('hidden')
    }  
}


// Function to open the Payment modal when clicking in the Complete order button (switch style from none to inline)
function openPaymentModal(){
    document.getElementById('payment-modal').style.display = "inline" 
}

//Interactiions with the payment Form
paymentForm.addEventListener('submit',function(e){
    e.preventDefault() //Prevent default form behaviour of displaying input data in the URL
    
    //Displaying the loading message in the payment modal
    document.getElementById("payment-modal").innerHTML =
    `
        <div class = "payment-modal-loading">
            <image src ="/img/loading.gif" class = "loading">
            <h2 id ="upload-text">Loading your payment info</h2>
        </div>
    `
    setTimeout(function(){
        document.getElementById('upload-text').innerText ='Saving ...'
    },1500)  //displaying the "saving" message after 1.5s
    setTimeout(function(){
         document.getElementById('payment-modal').style.display = "none"
    },3000)  //close the payment modal after 3s
    
    const paymentFormData = new FormData(paymentForm)
    const clientName = paymentFormData.get('clientName') //get the client Name from the Form to display in the confirmation message below
    
    setTimeout(function(){
        document.getElementById('order').innerHTML=
            `
            <h2 class = "thanks-message">Thanks, <span class = "client-name">${clientName}</span> ! Your order is on the way.</h2>
            ` 
    },3500) //displaying the confirmation message in the Order container after 3.5s (once the payment modal has been closed)
})


// Function to close the Payment modal when clicking in the Close button
document.getElementById('modal-close-btn').addEventListener('click',function(){
    document.getElementById('payment-modal').style.display = "none"
})


