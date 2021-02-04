import {ClassList, IsDefine} from "./extra"
import { customAlphabet } from 'nanoid'
import {extraArgument} from "./ArgumentHandler"
import inView from "in-view"

const nanoid = customAlphabet("nal0xIpcM6Cb4E58QuI9yjtYp1eUPe2XmBkrWN3hVBoS7DGSiTLyFsZ", 10)

const inviewAction = (el: HTMLElement) => {

}

const VueInview = (el: HTMLElement, binding: any): void => {
    // generate class Name
    const classID = "inview-" + nanoid()

    // add ClassName to ClassList
    ClassList.init(el).add(classID)
    const extrArg = extraArgument(binding.arg)
    const defineHandler = !IsDefine(binding.arg) ? "on" : binding.arg === "once" ? "once" : extrArg !== "none" ? "on" : "none"

    if (defineHandler === "none") {
        console.error(`argument ${binding.arg} undefined`)
        return
    }

    const setupInView = inView("." + classID)
    const eventHandler = extrArg === 'leave' ? "exit" : "enter"
    if (defineHandler === "on") setupInView.on(eventHandler, inviewAction)
    if (defineHandler === "once") setupInView.once(eventHandler, inviewAction)

}

const VueInviewUpdated = (el: HTMLElement, binding: any): void => {

}





interface InviewDirective {
    inserted (el: HTMLElement, binding: any) : void,
    componentUpdated (el: HTMLElement, binding: any): void
}

export const directive: InviewDirective = {
    inserted: VueInview,
    componentUpdated: VueInviewUpdated
}