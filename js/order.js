let elOrderTable = document.querySelector(".order-table")
let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")
let elSearchInput = document.querySelector(".search-input")
let orders = JSON.parse(localStorage.getItem("orders"))

// Complated Part
function handleCheck(id){
    let findObj = orders.find(item => item.id == id)
    findObj.isComplated = !findObj.isComplated
    localStorage.setItem("orders", JSON.stringify(orders))
    renderProducts(orders, elOrderTable)
} 
// Complated Part 