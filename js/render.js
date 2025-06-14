// Table Head Create
let elTableHeading = document.querySelector(".table-heading")

let productHeading = ["Изображение", "Цена(сум)", "Категория" ,"Количество", "Рамка", "Действия"]
let orderHeading = ["Имя клиента", "Телефон", "Изображение", "Цена(сум)", "Адрес", "Время" ,"Действия"]

function renderHeading(arr, list){
    list.innerHTML = null
    let elTR = document.createElement("tr")
    arr.forEach((item) => {
        let elTH = document.createElement("th")
        elTH.className = `${item == "Действия" ? "rounded-tr-[35px] !text-center" : ""} ${item == arr[0] ? "rounded-tl-[35px] !text-center" : ""} text-start text-[#000000] text-[20px] font-normal  py-[17px] text-center bg-white`
        elTH.textContent = item
        elTR.append(elTH)
    })
    list.append(elTR)
}

// Table Head Create


// Render Products start
function renderProducts(arr, list, categoryId) {
    list.innerHTML = null
    if(location.pathname == "/admin.html"){
        if(categoryId){
            arr.filter(value => value.categoryId == categoryId).forEach((item) => {
                let elTr = document.createElement("tr")
                elTr.className = "bg-white rounded-[35px]"
                elTr.innerHTML = `
                    <td class="text-center py-[17px] bg-white"> 
                        <img class="mx-auto" src="${item.imgURL}" alt="Pool img" width="110" height="41">
                    </td>
                    <td class="py-[17px] text-[20px] bg-white">
                        <div class="flex flex-col">
                            <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]">${item.oldPrice} сум</span>
                            <strong class="text-[18px]">${item.newPrice} сум</strong>
                        </div>
                    </td>
                    <td class="py-[17px] text-[20px] bg-white">${item.categoryId == "0" ? "Каркасные" : "Надувные"}</td>
                    <td class="py-[17px] text-[20px] bg-white">${item.quantity}</td>
                    <td class="py-[17px] text-[20px] bg-white">${item.frameId == "0" ? "Металлический" : (item.frameId == "1" ? "Рамка призмы" : "Прямоугольная")}</td>
                    <td class="py-[17px] text-center bg-white">
                        <button onclick="handleUpdateProduct(${item.id})" class="cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.75012 15.8125V19.2499H6.18752L16.3255 9.11191L12.8881 5.67234L2.75012 15.8125ZM18.9847 6.45268C19.0697 6.36793 19.1372 6.26722 19.1832 6.15635C19.2292 6.04547 19.2529 5.9266 19.2529 5.80655C19.2529 5.6865 19.2292 5.56763 19.1832 5.45675C19.1372 5.34588 19.0697 5.24517 18.9847 5.16041L16.8396 3.01529C16.7548 2.93027 16.6541 2.86281 16.5432 2.81679C16.4323 2.77076 16.3135 2.74707 16.1934 2.74707C16.0734 2.74707 15.9545 2.77076 15.8436 2.81679C15.7328 2.86281 15.632 2.93027 15.5473 3.01529L13.8697 4.69827L17.3071 8.13026L18.9847 6.45268Z" fill="#3F8C8E"/>
                            </svg>
                        </button>
                        <button onclick="handleDeleteProduct(${item.id},${item.categoryId})" class="cursor-pointer ml-[18px]">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1.57129C11.8064 1.57129 12.5818 1.8812 13.1661 2.43693C13.7503 2.99266 14.0986 3.75168 14.139 4.557L14.1429 4.71415H18.0715C18.2717 4.71437 18.4643 4.79105 18.61 4.92853C18.7556 5.066 18.8432 5.25389 18.8549 5.45381C18.8667 5.65373 18.8016 5.85059 18.6731 6.00416C18.5446 6.15773 18.3622 6.25642 18.1634 6.28007L18.0715 6.28557H17.4044L16.4772 17.7201C16.4174 18.4579 16.0821 19.1462 15.5379 19.648C14.9937 20.1499 14.2805 20.4285 13.5402 20.4284H8.45981C7.71955 20.4285 7.00639 20.1499 6.46219 19.648C5.91799 19.1462 5.58263 18.4579 5.52281 17.7201L4.59488 6.28557H3.9286C3.73615 6.28555 3.5504 6.21489 3.40659 6.08701C3.26278 5.95913 3.1709 5.78291 3.14838 5.59179L3.14288 5.49986C3.14291 5.30741 3.21356 5.12167 3.34145 4.97785C3.46933 4.83404 3.64554 4.74216 3.83667 4.71965L3.9286 4.71415H7.85717C7.85717 3.88061 8.18829 3.08121 8.77769 2.49181C9.36709 1.90241 10.1665 1.57129 11 1.57129ZM9.23217 8.83915C9.08977 8.83915 8.95219 8.89072 8.84487 8.98432C8.73755 9.07792 8.66775 9.20721 8.64838 9.34829L8.64288 9.42843V15.7141L8.64838 15.7943C8.66779 15.9353 8.7376 16.0646 8.84492 16.1581C8.95224 16.2517 9.0898 16.3032 9.23217 16.3032C9.37454 16.3032 9.5121 16.2517 9.61942 16.1581C9.72673 16.0646 9.79655 15.9353 9.81595 15.7943L9.82145 15.7141V9.42843L9.81595 9.34829C9.79659 9.20721 9.72679 9.07792 9.61947 8.98432C9.51215 8.89072 9.37457 8.83915 9.23217 8.83915ZM12.7679 8.83915C12.6255 8.83915 12.4879 8.89072 12.3806 8.98432C12.2733 9.07792 12.2035 9.20721 12.1841 9.34829L12.1786 9.42843V15.7141L12.1841 15.7943C12.2035 15.9353 12.2733 16.0646 12.3806 16.1581C12.4879 16.2517 12.6255 16.3032 12.7679 16.3032C12.9103 16.3032 13.0478 16.2517 13.1551 16.1581C13.2624 16.0646 13.3323 15.9353 13.3517 15.7943L13.3572 15.7141V9.42843L13.3517 9.34829C13.3323 9.20721 13.2625 9.07792 13.1552 8.98432C13.0479 8.89072 12.9103 8.83915 12.7679 8.83915ZM11 3.14272C10.6036 3.14259 10.2217 3.29232 9.93102 3.56189C9.64032 3.83146 9.46226 4.20095 9.43253 4.59629L9.4286 4.71415H12.5715L12.5675 4.59629C12.5378 4.20095 12.3597 3.83146 12.069 3.56189C11.7783 3.29232 11.3965 3.14259 11 3.14272Z" fill="#FF0202"/>
                            </svg>
                        </button>
                    </td>   
                `
                list.append(elTr)
            })
        }
        else{
            arr.forEach((item) => {
                let elTr = document.createElement("tr")
                elTr.className = "bg-white rounded-[35px]"
                elTr.innerHTML = `
                    <td class="text-center py-[17px] bg-white"> 
                        <img class="mx-auto" src="${item.imgURL}" alt="Pool img" width="110" height="41">
                    </td>
                    <td class="py-[17px] text-[20px] bg-white">
                        <div class="flex flex-col">
                            <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]">${item.oldPrice} сум</span>
                            <strong class="text-[18px]">${item.newPrice} сум</strong>
                        </div>
                    </td>
                    <td class="py-[17px] text-[20px] bg-white">${item.categoryId == "0" ? "Каркасные" : "Надувные"}</td>
                    <td class="py-[17px] text-[20px] bg-white">${item.quantity}</td>
                    <td class="py-[17px] text-[20px] bg-white">${item.frameId == "0" ? "Металлический" : (item.frameId == "1" ? "Рамка призмы" : "Прямоугольная")}</td>
                    <td class="py-[17px] text-center bg-white">
                        <button onclick="handleUpdateProduct(${item.id})" class="cursor-pointer">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.75012 15.8125V19.2499H6.18752L16.3255 9.11191L12.8881 5.67234L2.75012 15.8125ZM18.9847 6.45268C19.0697 6.36793 19.1372 6.26722 19.1832 6.15635C19.2292 6.04547 19.2529 5.9266 19.2529 5.80655C19.2529 5.6865 19.2292 5.56763 19.1832 5.45675C19.1372 5.34588 19.0697 5.24517 18.9847 5.16041L16.8396 3.01529C16.7548 2.93027 16.6541 2.86281 16.5432 2.81679C16.4323 2.77076 16.3135 2.74707 16.1934 2.74707C16.0734 2.74707 15.9545 2.77076 15.8436 2.81679C15.7328 2.86281 15.632 2.93027 15.5473 3.01529L13.8697 4.69827L17.3071 8.13026L18.9847 6.45268Z" fill="#3F8C8E"/>
                            </svg>
                        </button>
                        <button onclick="handleDeleteProduct(${item.id},${item.categoryId})" class="cursor-pointer ml-[18px]">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1.57129C11.8064 1.57129 12.5818 1.8812 13.1661 2.43693C13.7503 2.99266 14.0986 3.75168 14.139 4.557L14.1429 4.71415H18.0715C18.2717 4.71437 18.4643 4.79105 18.61 4.92853C18.7556 5.066 18.8432 5.25389 18.8549 5.45381C18.8667 5.65373 18.8016 5.85059 18.6731 6.00416C18.5446 6.15773 18.3622 6.25642 18.1634 6.28007L18.0715 6.28557H17.4044L16.4772 17.7201C16.4174 18.4579 16.0821 19.1462 15.5379 19.648C14.9937 20.1499 14.2805 20.4285 13.5402 20.4284H8.45981C7.71955 20.4285 7.00639 20.1499 6.46219 19.648C5.91799 19.1462 5.58263 18.4579 5.52281 17.7201L4.59488 6.28557H3.9286C3.73615 6.28555 3.5504 6.21489 3.40659 6.08701C3.26278 5.95913 3.1709 5.78291 3.14838 5.59179L3.14288 5.49986C3.14291 5.30741 3.21356 5.12167 3.34145 4.97785C3.46933 4.83404 3.64554 4.74216 3.83667 4.71965L3.9286 4.71415H7.85717C7.85717 3.88061 8.18829 3.08121 8.77769 2.49181C9.36709 1.90241 10.1665 1.57129 11 1.57129ZM9.23217 8.83915C9.08977 8.83915 8.95219 8.89072 8.84487 8.98432C8.73755 9.07792 8.66775 9.20721 8.64838 9.34829L8.64288 9.42843V15.7141L8.64838 15.7943C8.66779 15.9353 8.7376 16.0646 8.84492 16.1581C8.95224 16.2517 9.0898 16.3032 9.23217 16.3032C9.37454 16.3032 9.5121 16.2517 9.61942 16.1581C9.72673 16.0646 9.79655 15.9353 9.81595 15.7943L9.82145 15.7141V9.42843L9.81595 9.34829C9.79659 9.20721 9.72679 9.07792 9.61947 8.98432C9.51215 8.89072 9.37457 8.83915 9.23217 8.83915ZM12.7679 8.83915C12.6255 8.83915 12.4879 8.89072 12.3806 8.98432C12.2733 9.07792 12.2035 9.20721 12.1841 9.34829L12.1786 9.42843V15.7141L12.1841 15.7943C12.2035 15.9353 12.2733 16.0646 12.3806 16.1581C12.4879 16.2517 12.6255 16.3032 12.7679 16.3032C12.9103 16.3032 13.0478 16.2517 13.1551 16.1581C13.2624 16.0646 13.3323 15.9353 13.3517 15.7943L13.3572 15.7141V9.42843L13.3517 9.34829C13.3323 9.20721 13.2625 9.07792 13.1552 8.98432C13.0479 8.89072 12.9103 8.83915 12.7679 8.83915ZM11 3.14272C10.6036 3.14259 10.2217 3.29232 9.93102 3.56189C9.64032 3.83146 9.46226 4.20095 9.43253 4.59629L9.4286 4.71415H12.5715L12.5675 4.59629C12.5378 4.20095 12.3597 3.83146 12.069 3.56189C11.7783 3.29232 11.3965 3.14259 11 3.14272Z" fill="#FF0202"/>
                            </svg>
                        </button>
                    </td>   
                `
                list.append(elTr)
            })
        }
    }
    else if(location.pathname == "/order.html"){
        arr.forEach((item) => {
        let elTr = document.createElement("tr")
        elTr.className = "bg-white rounded-[35px]"
        elTr.innerHTML = `
                <td class="text-center py-[17px] bg-white">${item.username}</td> 
                <td class="text-center py-[17px] bg-white">${item.phoneNumber}</td> 
                <td class="text-center py-[17px] bg-white"> 
                    <img class="mx-auto" src="${item.imgURL}" alt="Pool img" width="110" height="41">
                </td>
                <td class="py-[17px] text-[20px] bg-white">${item.price}</td>
                <td class="py-[17px] text-[20px] bg-white">${item.address}</td>
                <td class="py-[17px] text-[20px] bg-white text-center">${item.date}</td>
                <td class="py-[17px] text-center bg-white">
                    <button onclick="handleCheck(${item.id})" class="cursor-pointer ${item.isComplated ? "text-[#139D4B]" : "text-[#C6C6C6]"}">
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 0C7.62108 0 5.78435 0.557165 4.22209 1.60104C2.65982 2.64491 1.44218 4.12861 0.723149 5.86451C0.0041162 7.6004 -0.184015 9.51054 0.182544 11.3534C0.549104 13.1962 1.45389 14.8889 2.78249 16.2175C4.11109 17.5461 5.80383 18.4509 7.64665 18.8175C9.48946 19.184 11.3996 18.9959 13.1355 18.2769C14.8714 17.5578 16.3551 16.3402 17.399 14.7779C18.4428 13.2156 19 11.3789 19 9.5C19 8.25244 18.7543 7.0171 18.2769 5.86451C17.7994 4.71191 17.0997 3.66464 16.2175 2.78249C15.3354 1.90033 14.2881 1.20056 13.1355 0.723144C11.9829 0.245725 10.7476 0 9.5 0ZM13.585 7.2295L9.2435 12.9295C9.155 13.0445 9.04135 13.1376 8.91125 13.2019C8.78116 13.2661 8.63808 13.2996 8.493 13.3C8.3487 13.3008 8.20613 13.2687 8.07609 13.2061C7.94605 13.1436 7.83197 13.0522 7.7425 12.939L5.4245 9.9845C5.34778 9.88594 5.29122 9.77324 5.25805 9.65282C5.22488 9.5324 5.21575 9.40663 5.23119 9.28269C5.24663 9.15875 5.28633 9.03906 5.34802 8.93046C5.40972 8.82186 5.4922 8.72647 5.59075 8.64975C5.7898 8.49479 6.04225 8.42526 6.29256 8.45644C6.4165 8.47188 6.53619 8.51157 6.64479 8.57327C6.75339 8.63496 6.84878 8.71744 6.9255 8.816L8.474 10.792L12.065 6.042C12.1411 5.94219 12.2361 5.85836 12.3446 5.79527C12.4531 5.73219 12.573 5.69109 12.6974 5.67433C12.8218 5.65757 12.9482 5.66547 13.0696 5.69759C13.1909 5.7297 13.3047 5.7854 13.4045 5.8615C13.5043 5.9376 13.5881 6.03261 13.6512 6.14112C13.7143 6.24962 13.7554 6.36948 13.7722 6.49387C13.7889 6.61825 13.781 6.74472 13.7489 6.86605C13.7168 6.98738 13.6611 7.10119 13.585 7.201V7.2295Z" fill="currentColor"/>
                    </svg>
                    </button>
                    <button onclick="handleDeleteProduct(${item.id}, ${null})" class="cursor-pointer ml-[18px]">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1.57129C11.8064 1.57129 12.5818 1.8812 13.1661 2.43693C13.7503 2.99266 14.0986 3.75168 14.139 4.557L14.1429 4.71415H18.0715C18.2717 4.71437 18.4643 4.79105 18.61 4.92853C18.7556 5.066 18.8432 5.25389 18.8549 5.45381C18.8667 5.65373 18.8016 5.85059 18.6731 6.00416C18.5446 6.15773 18.3622 6.25642 18.1634 6.28007L18.0715 6.28557H17.4044L16.4772 17.7201C16.4174 18.4579 16.0821 19.1462 15.5379 19.648C14.9937 20.1499 14.2805 20.4285 13.5402 20.4284H8.45981C7.71955 20.4285 7.00639 20.1499 6.46219 19.648C5.91799 19.1462 5.58263 18.4579 5.52281 17.7201L4.59488 6.28557H3.9286C3.73615 6.28555 3.5504 6.21489 3.40659 6.08701C3.26278 5.95913 3.1709 5.78291 3.14838 5.59179L3.14288 5.49986C3.14291 5.30741 3.21356 5.12167 3.34145 4.97785C3.46933 4.83404 3.64554 4.74216 3.83667 4.71965L3.9286 4.71415H7.85717C7.85717 3.88061 8.18829 3.08121 8.77769 2.49181C9.36709 1.90241 10.1665 1.57129 11 1.57129ZM9.23217 8.83915C9.08977 8.83915 8.95219 8.89072 8.84487 8.98432C8.73755 9.07792 8.66775 9.20721 8.64838 9.34829L8.64288 9.42843V15.7141L8.64838 15.7943C8.66779 15.9353 8.7376 16.0646 8.84492 16.1581C8.95224 16.2517 9.0898 16.3032 9.23217 16.3032C9.37454 16.3032 9.5121 16.2517 9.61942 16.1581C9.72673 16.0646 9.79655 15.9353 9.81595 15.7943L9.82145 15.7141V9.42843L9.81595 9.34829C9.79659 9.20721 9.72679 9.07792 9.61947 8.98432C9.51215 8.89072 9.37457 8.83915 9.23217 8.83915ZM12.7679 8.83915C12.6255 8.83915 12.4879 8.89072 12.3806 8.98432C12.2733 9.07792 12.2035 9.20721 12.1841 9.34829L12.1786 9.42843V15.7141L12.1841 15.7943C12.2035 15.9353 12.2733 16.0646 12.3806 16.1581C12.4879 16.2517 12.6255 16.3032 12.7679 16.3032C12.9103 16.3032 13.0478 16.2517 13.1551 16.1581C13.2624 16.0646 13.3323 15.9353 13.3517 15.7943L13.3572 15.7141V9.42843L13.3517 9.34829C13.3323 9.20721 13.2625 9.07792 13.1552 8.98432C13.0479 8.89072 12.9103 8.83915 12.7679 8.83915ZM11 3.14272C10.6036 3.14259 10.2217 3.29232 9.93102 3.56189C9.64032 3.83146 9.46226 4.20095 9.43253 4.59629L9.4286 4.71415H12.5715L12.5675 4.59629C12.5378 4.20095 12.3597 3.83146 12.069 3.56189C11.7783 3.29232 11.3965 3.14259 11 3.14272Z" fill="#FF0202"/>
                        </svg>
                    </button>
                </td>   
        `
        list.append(elTr)
        })
    }
}
// Render Products end

if(location.pathname == "/admin.html"){
    renderHeading(productHeading, elTableHeading)
    renderProducts(products, elProductTable, "0")
}
else if(location.pathname == "/order.html"){
    renderHeading(orderHeading, elTableHeading)
    renderProducts(orders, elOrderTable)
}