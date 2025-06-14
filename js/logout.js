let isUser = document.querySelector(".logined-user")
let findedUser = JSON.parse(localStorage.getItem("user"))

isUser.innerHTML = `${findedUser.firstName} ${findedUser.lastName}`

modalWrapper.addEventListener("click", (e) => e.target.id == "wrapper" && modalWrapper.classList.add("scale-0"))

// Sign out start
isUser.parentElement.addEventListener("click", () => {
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
        <div class="w-[600px]">
            <h1 class="font-bold mb-[20px] text-[35px] text-center">Хотите выйти?</h1>
            <div class="flex items-center justify-center gap-[20px]">
                <button onclick="handleCancel()" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-green-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Отмена</button>
                <button onclick="handleSignOut()" class="hover:opacity-[70%] duration-300 w-[48%] p-[8px] bg-red-700 cursor-pointer text-white font-normal text-[25px] rounded-[35px]">Выход</button>
            </div>
        </div>
    `
})
function handleCancel() {
    modalWrapper.classList.add("scale-0")
}

function handleSignOut() {
    modalWrapper.classList.add("scale-0")
    setTimeout(() => {
        localStorage.clear()
        location.pathname = "/"
    }, 800)
}
// Sign out end
