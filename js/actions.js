
// Delete Part start
let handleDeleteProduct = (id, categoryId) => {
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
         <div class="w-[600px]">
            <h1 class="font-bold mb-[20px] text-[35px] text-center">Вы хотите удалить?</h1>
            <div class="flex items-center justify-center gap-[20px]">
                <button onclick="handleCancel()" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-green-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Отмена</button>
                <button onclick="deleteProduct(${id}, ${categoryId})" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-red-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Удалитъ</button>
            </div>
        </div>
    `
}
function deleteProduct(id, categoryId) {
    if(location.pathname == "/admin.html"){
        let deleteId = products.findIndex(item => item.id == id)
        products.splice(deleteId, 1)
        renderProducts(products, elProductTable, categoryId)
        modalWrapper.classList.add("scale-0")
        localStorage.setItem("products", JSON.stringify(products))
    }
    else if(location.pathname == "/order.html"){
        let deleteId = orders.findIndex(item => item.id == id)
        orders.splice(deleteId, 1)
        renderProducts(orders, elOrderTable)
        modalWrapper.classList.add("scale-0")
        localStorage.setItem("orders", JSON.stringify(orders))
    }
}
// Delete Part end

// Search Part start
elSearchInput.addEventListener("input", function(e){
    if(location.pathname == "/admin.html"){
        let filteredProducts = products.filter(item => item.newPrice.includes(e.target.value))
        elCategoryList.firstElementChild.className = notActiveList
        elCategoryList.lastElementChild.className = notActiveList
        if(filteredProducts.length == 1){
            renderProducts(filteredProducts, elProductTable, filteredProducts[0].categoryId)
            if(filteredProducts[0].categoryId == "0"){
                elCategoryList.firstElementChild.className = activeList
                elCategoryList.lastElementChild.className = notActiveList
            }
            else{
                elCategoryList.lastElementChild.className = activeList
                elCategoryList.firstElementChild.className = notActiveList
            }
        }
        renderProducts(filteredProducts, elProductTable)
    }
    else{
        let filteredProducts = orders.filter(item => item.username.toLowerCase().includes(e.target.value.toLowerCase()))
        renderProducts(filteredProducts, elOrderTable) 
    }
})
// Search Part end