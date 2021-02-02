export const IsDefine = (v: any): boolean => typeof v !== "undefined";
export const IsString = (v: any): boolean => typeof v !== "string";
export const IsArray = (v: any): boolean => Array.isArray(v);
export const IsObject = (v: any): boolean => !IsArray(v) && typeof v === "object";  

export class ClassList {
    static init (el: HTMLElement): ClassList {
        return new ClassList(el)
    }
    constructor (el: HTMLElement) {
        this.el = el
        if (IsDefine(el.classList)) this.classList  = el.classList
        else {
            this.classList = el.className.split(" ")
            this.supportOldBrowser = true
        }
        return
    }
    el? : HTMLElement
    classList?: DOMTokenList|Array<string>
    supportOldBrowser: boolean = false

    get (): DOMTokenList|Array<string> {
        return this.classList
    }

    add (className: string): void {
        if (!this.hasClassName(className)){
            if (this.supportOldBrowser && Array.isArray(this.classList)) {
                this.classList.push(className)
                this.el.className = this.classList.join(" ")
            }
            if (this.classList instanceof DOMTokenList) this.classList.add(className)
        }
    }

    remove (className: string): void {
        if (this.hasClassName(className)) {
            if (this.supportOldBrowser && Array.isArray(this.classList)) {
                const listIndex = this.classList.indexOf(className)
                this.classList.splice(listIndex, 1)
                this.el.className = this.classList.join(" ")
            }
            if (this.classList instanceof DOMTokenList) this.classList.remove(className)
        }
    }

    hasClassName (className: string): boolean {
        const classList = this.el.className.split(" ")
        if (classList.indexOf(className) >= 0) return true
        return false
    }
}