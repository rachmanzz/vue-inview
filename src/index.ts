import inView from "in-view"

interface vueInview {
    install(): void,
    threshold(): void
}
const vueInview = function () {}

vueInview.install = function (Vue: any, option?: number | {top?: number, right?: number, bottom?: number, left: number}) {
    if (option) inView.offset(option)
}

vueInview.threshold = (arg: any) => { inView.threshold(arg) }

vueInview.offset = (arg: any) => { inView.offset(arg) }

export default vueInview