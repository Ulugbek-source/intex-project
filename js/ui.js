let elFrameList = document.querySelector('.frame-pool')
let elInflatableList = document.querySelector('.inflatable-pool')
let modalWrapper = document.querySelector('.modal-wrapper')
let modalInner = document.querySelector('.modal-inner')

let products = JSON.parse(localStorage.getItem('products'))
let orders = JSON.parse(localStorage.getItem('orders')) || []

function renderProducts(arr, list, id) {
	list.innerHTML = null
	arr
		.filter(value => value.categoryId == id)
		.forEach(item => {
			let elItem = document.createElement('li')
			elItem.className =
				'pool-card relative w-[340px] px-[30px] pb-[30px] pt-[45px] rounded-tr-[35px] rounded-br-[35px] rounded-bl-[35px]'
			elItem.innerHTML = `
            <p class="font-medium text-[20px] text-[#009398] text-center mb-[10px]">
                ${item.frameId == '0' ? 'Металлический каркас' : ''}
                ${item.frameId == '1' ? 'Рамка призмы' : ''}
                ${item.frameId == '2' ? 'Прямоугольная' : ''}
            </p>
            <img class="mb-[17px]" src="${
							item.imgURL
						}" alt="Pool img" width="308" height="172">
            <div class="flex justify-between items-center">
                <div class="flex flex-col">
                    <span class="text-[12px] w-[76px] text-[#A6A6A6] relative before:w-[100%] before:h-[1px] before:bg-red-500 before:absolute before:rotate-[6deg] before:top-[7px]">${
											item.oldPrice
										} сум</span>
                    <strong class="text-[18px]">${item.newPrice} сум</strong>
                </div>
                <button onclick="handleOrder(${
									item.id
								})" class="cursor-pointer hover:opacity-[70%] duration-300 text-[#000000] text-[15px] font-bold py-[2px] w-[107px] bg-[#FFE600] text-center rounded-tr-[10px] rounded-bl-[10px]">Заказать</button>
            </div>
            <span class="bg-[#139D4B] text-white font-bold text-[15px] w-[140px] py-[4px] rounded-br-[10px] inline-block text-center absolute top-0 left-0" >Рекомендуем</span>
        `
			list.append(elItem)
		})
}
renderProducts(products, elFrameList, '0')
renderProducts(products, elInflatableList, '1')

let date = new Date()
let hour = date.getHours().toString().padStart(2, 0)
let minut = date.getMinutes().toString().padStart(2, 0)
let day = date.getDate().toString().padStart(2, 0)
let month = (date.getMonth() + 1).toString().padStart(2, 0)
let year = date.getFullYear().toString().split('0')[1]
let fullDate = `${hour}:${minut} ${day}.${month}.${year}`

// Order Part start
function handleOrder(id) {
	let findOrder = products.find(item => item.id == id)

	modalWrapper.classList.remove('scale-0')
	modalInner.innerHTML = `
        <div class="w-[1130px] relative flex items-center"> 
            <div class="p-[60px] w-[50%] rounded-[35px] pool-card"> 
                <h2 class="font-bold text-center text-[#009398] mb-[10px]">
                    ${findOrder.frameId == '0' ? 'Металлический каркас' : ''}
                    ${findOrder.frameId == '1' ? 'Рамка призмы' : ''}
                    ${findOrder.frameId == '2' ? 'Прямоугольная' : ''}
                </h2>
                <img class="mb-[31px]" src=${
									findOrder.imgURL
								} alt="Ordered Img" width="555" height="305"/>
                <strong class="text-[30px] block text-center">${
									findOrder.newPrice
								} сум</strong>
            </div>
            <form class="order-form w-[50%] space-y-[17px] px-[48px]" autocomplete="off">
                <input required class="w-full text-[25px] font-bold  placeholder:text-[25px] placeholder:font-bold pool-card py-[15px] outline-none border-[1px] border-[#CBCBCB] rounded-[17px] pl-[20px]" type="text" placeholder="Ваше имя" name="username">
                <input required class="w-full text-[25px] font-bold  placeholder:text-[25px] placeholder:font-bold pool-card py-[15px] outline-none border-[1px] border-[#CBCBCB] rounded-[17px] pl-[20px]" type="number" placeholder="Ваш номер" name="phoneNumber">
                <input required class="w-full text-[25px] font-bold  placeholder:text-[25px] placeholder:font-bold pool-card py-[15px] outline-none border-[1px] border-[#CBCBCB] rounded-[17px] pl-[20px]" type="text" placeholder="Ваш адрес" name="address">
                <button class="duration-300 hover:scale-[1.2] cursor-pointer w-[237px] bg-[#FFE600] text-[#000] text-[25px] font-bold text-center block mx-auto py-[6px] rounded-[10px]">Заказать</button>
            </form>
            <button onclick="handleClose()" class="absolute duration-300 hover:scale-[1.2] top-[15px] right-[15px] cursor-pointer" type="button">
                <img src="../images/close-img.svg" alt="Close img" width="31" height="31"/>
            </button>
        </div>
    `

	let elOrderForm = document.querySelector('.order-form')
	elOrderForm.addEventListener('submit', function (e) {
		e.preventDefault()
		let pool = {
			id: orders[orders.length - 1]?.id ? orders[orders.length - 1]?.id + 1 : 1,
			username: e.target.username.value,
			phoneNumber: e.target.phoneNumber.value,
			imgURL: findOrder.imgURL,
			price: findOrder.newPrice,
			address: e.target.address.value,
			date: fullDate,
			isComplated: false,
		}
		e.target.lastElementChild.innerHTML = `
            <img class="mx-auto scale-[1.2]" src="./images/loading.png" alt="Loading..." width="30" height="30"/>
        `
		setTimeout(() => {
			e.target.lastElementChild.innerHTML = `Заказать`
			setTimeout(() => {
				modalInner.innerHTML = `
                <div class="text-center w-[1130px]">
                    <img class="mb-[43px] mx-auto" src="../images/check-img.svg" alt="Check img" width="232" height="232"/>
                    <h2 class="font-bold text-[60px]">Спасибо!</h2>
                </div>
                `
				orders.push(pool)
				localStorage.setItem('orders', JSON.stringify(orders))
				setTimeout(() => {
					modalWrapper.classList.add('scale-0')
				}, 1000)
			}, 1000)
		}, 1000)
	})
}
// Order Part end

let handleClose = () => modalWrapper.classList.add('scale-0')
