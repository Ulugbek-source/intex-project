let elForm = document.querySelector(".login-form")

let passwordsSaved = JSON.parse(localStorage.getItem("passwords"))

elForm.addEventListener("submit", function(e){
    e.preventDefault()
    let data = {
        username:e.target.username.value,
        password:e.target.password.value
    }
    elForm.lastElementChild.previousElementSibling.innerHTML = `
        <img class="w-[30px] h-[30px] scale-[1.4] mx-auto" src="./images/loading.png" alt="Loading..." width="30" height="30">
    `
    let isUser = passwordsSaved ? passwordsSaved.some(item => item.username == data.username && item.password == data.password) : passwords.some(item => item.username == data.username && item.password == data.password)
    let user = passwordsSaved ? passwordsSaved.find(item => item.username == data.username && item.password == data.password) : passwords.find(item => item.username == data.username && item.password == data.password)
    
    localStorage.setItem("user", JSON.stringify(user))
    setTimeout(() => {
        elForm.lastElementChild.previousElementSibling.innerHTML = `Войти`
        setTimeout(() => {
            if(isUser){
                location.pathname = "/admin.html"
            }
            else{
                alert("Что-то пошло не так!")
            }
        },600)
    },1000)
})