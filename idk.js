var p = document.querySelector("p");
var Token = /** @class */ (function () {
    function Token(type, value) {
        if (value === void 0) { value = null; }
        this.type = type;
        this.value = value;
    }
    return Token;
}());
var Lexer = /** @class */ (function () {
    function Lexer(text) {
        console.log("Lexer constructor called with text: ".concat(text));
        this.code = text;
        this.index = 0;
    }
    Lexer.prototype.advance = function () {
        console.log("Advancing index from ".concat(this.index, " to ").concat(this.index + 1));
        if (this.index < this.code.length) {
            this.current_char = this.code[this.index];
            console.log("Current character is: ".concat(this.current_char));
        }
        else {
            this.current_char = null;
            console.log("End of code reached");
        }
        this.index++;
    };
    Lexer.prototype.Make_Num = function () {
        console.log("Making number");
        var num = "";
        while (this.current_char != null && this.current_char >= "0" && this.current_char <= "9") {
            num += this.current_char;
            console.log("Adding digit ".concat(this.current_char, " to number"));
            this.advance();
        }
        console.log("Number made: ".concat(num));
        return parseInt(num);
    };
    Lexer.prototype.Make_IDENTIFIER = function () {
        console.log("Making identifier");
        var id = "";
        while (this.current_char != null && (this.current_char >= "a" && this.current_char <= "z") || (this.current_char >= "A" && this.current_char <= "Z")) {
            id += this.current_char;
            console.log("Adding character ".concat(this.current_char, " to identifier"));
            this.advance();
        }
        console.log("Identifier made: ".concat(id));
        alert(id.toUpperCase());
        if (id.toUpperCase() == "PRINT") {
            console.log("Identifier is a keyword: ".concat(id.toUpperCase()));
            return new Token(id.toUpperCase());
        }
        console.log("Identifier is not a keyword: ".concat(id));
        return new Token("IDENTIFIER", id);
    };
    Lexer.prototype.Make_Tokens = function () {
        console.log("Making tokens");
        var tokens = [];
        this.advance();
        while (this.current_char != null) {
            console.log("Current character is: ".concat(this.current_char));
            if (this.current_char == " ") {
                console.log("Skipping whitespace");
                this.advance();
            }
            else if (this.current_char == "+") {
                console.log("Found PLUS token");
                tokens.push(new Token("PLUS"));
                this.advance();
            }
            else if (this.current_char == "-") {
                console.log("Found MINUS token");
                tokens.push(new Token("MINUS"));
                this.advance();
            }
            else if (this.current_char == "*") {
                console.log("Found MUL token");
                tokens.push(new Token("MUL"));
                this.advance();
            }
            else if (this.current_char == "/") {
                console.log("Found DIV token");
                tokens.push(new Token("DIV"));
                this.advance();
            }
            else if (this.current_char == "(") {
                console.log("Found LPAREN token");
                tokens.push(new Token("LPAREN"));
                this.advance();
            }
            else if (this.current_char == ")") {
                console.log("Found RPAREN token");
                tokens.push(new Token("RPAREN"));
                this.advance();
            }
            else if (this.current_char >= "0" && this.current_char <= "9") {
                console.log("Found number");
                tokens.push(new Token("NUM", this.Make_Num()));
            }
            else if ((this.current_char >= "a" && this.current_char <= "z") || (this.current_char >= "A" && this.current_char <= "Z")) {
                console.log("Found identifier");
                tokens.push(this.Make_IDENTIFIER());
            }
        }
        console.log("Tokens made: ".concat(tokens));
        return tokens;
    };
    return Lexer;
}());
var NumNode = /** @class */ (function () {
    function NumNode(value) {
        this.value = value;
    }
    return NumNode;
}());
var BinOpNode = /** @class */ (function () {
    function BinOpNode(left, op, right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }
    return BinOpNode;
}());
var UnaryNode = /** @class */ (function () {
    function UnaryNode(value) {
        this.value = value;
    }
    return UnaryNode;
}());
var PrintNode = /** @class */ (function () {
    function PrintNode(expr) {
        this.expr = expr;
    }
    return PrintNode;
}());
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.tokens = tokens;
        this.index = 0;
        this.advance();
    }
    Parser.prototype.advance = function () {
        if (this.index < this.tokens.length) {
            this.current_token = this.tokens[this.index];
        }
        else {
            this.current_token = null;
        }
        this.index++;
    };
    Parser.prototype.fac = function () {
        if (this.current_token.type == "NUM") {
            var token = this.current_token;
            this.advance();
            return new NumNode(token.value);
        }
        else if (this.current_token.type == "MINUS") {
            this.advance();
            var token = this.current_token;
            this.advance();
            return new UnaryNode(token.value);
        }
        else if (this.current_token.type == "PRINT") {
            this.advance();
            var expr = this.expr();
            this.advance();
            return new PrintNode(expr);
        }
        else if (this.current_token.type == "LPAREN" || this.current_token.type == "RPAREN") {
            this.advance();
            this.node = this.expr();
            if (this.current_token.type == "RPAREN") {
                this.advance();
                return this.node;
            }
            else {
                p.innerHTML = "Error: Unmatched parenthesis";
                throw "Error: Unmatched parenthesis";
            }
        }
        else {
            p.innerHTML = "Error: Expected a number";
            throw "Error: Expected a number";
        }
    };
    Parser.prototype.term = function () {
        var left = this.fac();
        while (this.current_token && (this.current_token.type == "MUL" || this.current_token.type == "DIV")) {
            var op = this.current_token;
            this.advance();
            var right = this.fac();
            left = new BinOpNode(left, op.type, right);
        }
        return left;
    };
    Parser.prototype.expr = function () {
        var left = this.term();
        while (this.current_token && (this.current_token.type == "PLUS" || this.current_token.type == "MINUS")) {
            var op = this.current_token;
            this.advance();
            var right = this.term();
            left = new BinOpNode(left, op.type, right);
        }
        return left;
    };
    return Parser;
}());
var Interpreter = /** @class */ (function () {
    function Interpreter() {
    }
    Interpreter.prototype.visit = function (node) {
        return this["visit_".concat(node.constructor.name)].call(this, node);
    };
    Interpreter.prototype.visit_NumNode = function (node) {
        return node.value;
    };
    Interpreter.prototype.visit_UnaryNode = function (node) {
        return -node.value;
    };
    Interpreter.prototype.visit_BinOpNode = function (node) {
        var left = this.visit(node.left);
        var op = node.op;
        var right = this.visit(node.right);
        if (op == "PLUS") {
            return left + right;
        }
        else if (op == "MINUS") {
            return left - right;
        }
        else if (op == "MUL") {
            return left * right;
        }
        else if (op == "DIV") {
            return left / right;
        }
    };
    return Interpreter;
}());
var run = document.getElementById("run");
run.addEventListener("click", function () {
    var code = document.getElementById("input");
    code = code.value;
    var output = new Interpreter().visit(new Parser(new Lexer(code).Make_Tokens()).expr());
    p.innerHTML = output;
});
