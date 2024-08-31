p = document.getElementById("1")
a = document.getElementById("idk")
d = 0
a.addEventListener("click", () => {
    c = 0
    while (c == 0) {
        b = Math.floor(Math.random() * 3)
        if (b == 0 && d!=b) {
            p.innerHTML = "Rock"
            d = b
            c = 1
        }
        if (b == 1 && d!=b) {
            p.innerHTML = "Paper"
            d = b
            c = 1
        }
        if (b == 2 && d!=b) {
            p.innerHTML = "Scissors"
            d = b
            c = 1
        }
    }
})
