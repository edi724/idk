a = document.getElementById("idk")
input = document.getElementById("input")
div = document.getElementById("container")
let top1 = 100
let right = 1000
let right1 = 120
a.addEventListener("click", () => {
    let p1 = document.createElement("p")
    let button = document.createElement("a")
    button.innerHTML = "X"
    button.href = "#"
    button.style.background = "red"
    button.style.color = "white"
    p1.innerHTML = input.value
    console.log(p1)
    p1.style.top = top1 + "px"
    p1.style.right = right + "px"
    div.appendChild(p1)
    p1.appendChild(button)
    button.style.right = right1 + "px"
    top1 += 30
    button.addEventListener("click", () => {
        p1.remove()
        button.remove()
        top1 -= 30
    })
})
