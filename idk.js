let p = document.querySelector("p")
class Token {
    type:string
    value:any
    constructor(type:string, value:any=null) {
        this.type = type
        this.value = value
    }
}
class Lexer {
    code: string
    index: number
    current_char: string
    constructor(text: string) {
        console.log(`Lexer constructor called with text: ${text}`);
        this.code = text
        this.index = 0
    }
    advance() {
        console.log(`Advancing index from ${this.index} to ${this.index + 1}`);
        if (this.index < this.code.length) {
            this.current_char = this.code[this.index]
            console.log(`Current character is: ${this.current_char}`);
        }
        else {
            this.current_char = null
            console.log(`End of code reached`);
        }
        this.index++
    }
    Make_Num() {
        console.log(`Making number`);
        let num = ""
        while (this.current_char != null && this.current_char >= "0" && this.current_char <= "9") {
            num += this.current_char
            console.log(`Adding digit ${this.current_char} to number`);
            this.advance()
        }
        console.log(`Number made: ${num}`);
        return parseInt(num)
    }
    Make_IDENTIFIER() {
        console.log(`Making identifier`);
        let id = ""
        while (this.current_char != null && (this.current_char >= "a" && this.current_char <= "z") || (this.current_char >= "A" && this.current_char <= "Z")) {
            id += this.current_char
            console.log(`Adding character ${this.current_char} to identifier`);
            this.advance()
        }
        console.log(`Identifier made: ${id}`);
        alert(id.toUpperCase())
        if (id.toUpperCase() == "PRINT") {
            console.log(`Identifier is a keyword: ${id.toUpperCase()}`);
            return new Token(id.toUpperCase())
        }
        console.log(`Identifier is not a keyword: ${id}`);
        return new Token("IDENTIFIER", id)
    }
    Make_Tokens() {
        console.log(`Making tokens`);
        let tokens = []
        this.advance()
        while (this.current_char != null) {
            console.log(`Current character is: ${this.current_char}`);
            if (this.current_char == " ") {
                console.log(`Skipping whitespace`);
                this.advance()
            }
            else if (this.current_char == "+") {
                console.log(`Found PLUS token`);
                tokens.push(new Token("PLUS"))
                this.advance()
            }
            else if (this.current_char == "-") {
                console.log(`Found MINUS token`);
                tokens.push(new Token("MINUS"))
                this.advance()
            }
            else if (this.current_char == "*") {
                console.log(`Found MUL token`);
                tokens.push(new Token("MUL"))
                this.advance()
            }
            else if (this.current_char == "/") {
                console.log(`Found DIV token`);
                tokens.push(new Token("DIV"))
                this.advance()
            }
            else if (this.current_char == "(") {
                console.log(`Found LPAREN token`);
                tokens.push(new Token("LPAREN"))
                this.advance()
            }
            else if (this.current_char == ")") {
                console.log(`Found RPAREN token`);
                tokens.push(new Token("RPAREN"))
                this.advance()
            }
            else if (this.current_char >= "0" && this.current_char <= "9") {
                console.log(`Found number`);
                tokens.push(new Token("NUM", this.Make_Num()))
            }
            else if((this.current_char >= "a" && this.current_char <= "z") || (this.current_char >= "A" && this.current_char <= "Z")) {
                console.log(`Found identifier`);
                tokens.push(this.Make_IDENTIFIER())
            }
        }
        console.log(`Tokens made: ${tokens}`);
        return tokens
    }
}
class NumNode {
    value: number
    constructor(value: number) {
        this.value = value
    }
}
class BinOpNode {
    left: any
    op: any
    right: any
    constructor(left: any, op: any, right: any) {
        this.left = left
        this.op = op
        this.right = right
    }
}
class UnaryNode {
    value: number
    constructor(value: number) {
        this.value = value
    }
}
class PrintNode {
    expr: any
    constructor(expr: any) {
        this.expr = expr
    }
}
class Parser {
    index:number
    tokens: Token[]
    current_token: Token
    node: any
    constructor(tokens: Token[]) {
        this.tokens = tokens
        this.index = 0
        this.advance()
    }
    advance() {
        if (this.index < this.tokens.length) {
            this.current_token = this.tokens[this.index]
        }
        else {
            this.current_token = null
        }
        this.index++
    }
    fac() {
        if (this.current_token.type == "NUM") {
            let token = this.current_token
            this.advance()
            return new NumNode(token.value)
        }
        else if (this.current_token.type == "MINUS") {
            this.advance()
            let token = this.current_token
            this.advance()
            return new UnaryNode(token.value)
        }
        else if (this.current_token.type == "PRINT") {
            this.advance()
            let expr = this.expr()
            this.advance()
            return new PrintNode(expr)
        }
        else if (this.current_token.type == "LPAREN" || this.current_token.type == "RPAREN") {
            this.advance()
            this.node = this.expr()
            if (this.current_token.type == "RPAREN") {
                this.advance()
                return this.node
            }
            else {
                p.innerHTML = "Error: Unmatched parenthesis"
                throw "Error: Unmatched parenthesis"
            }
        }
        else {
            p.innerHTML = "Error: Expected a number"
            throw "Error: Expected a number"
        }
    }
    term() {
        let left: any = this.fac()
        while (this.current_token && (this.current_token.type == "MUL" || this.current_token.type == "DIV")) {
            let op = this.current_token
            this.advance()
            let right = this.fac()
            left = new BinOpNode(left, op.type, right)
        }
        return left
    }
    expr() {
        let left = this.term()
        while (this.current_token && (this.current_token.type == "PLUS" || this.current_token.type == "MINUS")) {
            let op = this.current_token
            this.advance()
            let right = this.term()
            left = new BinOpNode(left, op.type, right)
        }
        return left
    }
}
class Interpreter {
    index: number
    visit(node) {
        return this[`visit_${node.constructor.name}`].call(this,node)
    }
    visit_NumNode(node) {
        return node.value
    }
    visit_UnaryNode(node) {
        return -node.value
    }
    visit_BinOpNode(node) {
        let left = this.visit(node.left)
        let op = node.op
        let right = this.visit(node.right)
        if (op == "PLUS") {
            return left + right
        }
        else if (op == "MINUS") {
            return left - right
        }
        else if (op == "MUL") {
            return left * right
        }
        else if (op == "DIV") {
            return left / right
        }
    }
}
let run = document.getElementById("run")
run.addEventListener("click", () => {
    let code: any = <HTMLInputElement>document.getElementById("input")
    code = code.value
    let output = new Interpreter().visit(new Parser(new Lexer(code).Make_Tokens()).expr())
    p.innerHTML = output
})
