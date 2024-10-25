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
        else{
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
