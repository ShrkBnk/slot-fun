
export default class Symbol {
    static get symbols() {
        return [
            "3xBAR",
            "BAR",
            "2xBAR",
            "7",
            "Cherry"
        ];
    }

    static random() {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }

}
