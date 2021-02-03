import inView from "in-view"
import {directive} from "./inview-action"

interface vueInview {
    install(vue: any, option?: number | {top?: number, right?: number, bottom?: number, left: number}): void,
    threshold(arg: number): void
    offset(arg: number | {top?: number, right?: number, bottom?: number, left: number}): void
}

const vueInview: vueInview = Object.create(null)

vueInview.install = function (vue, option) {
    if (option) inView.offset(option)
    vue.directive("inview", directive)
}

vueInview.threshold = (arg) => { inView.threshold(arg) }

vueInview.offset = (arg) => { inView.offset(arg) }

export default vueInview