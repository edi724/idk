p = document.getElementById("1")
a = document.getElementById("idk")
b = document.getElementById("idk1")
a.addEventListener("click", () => {
    localStorage.setItem("idk", b.value)
    p.innerHTML = localStorage.getItem("idk")
})
setInterval(() => p.innerHTML = localStorage.getItem("idk"), 1000)
