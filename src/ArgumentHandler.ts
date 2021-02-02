export const extraArgument = function (arg: string): string {
    let result: string
    switch (arg) {
        case 'class':
            result = arg
            break
        case 'style':
            result = arg
            break
        case 'enter':
            result = arg
            break
        case 'leave':
            result = arg
            break
        case 'animate':
            result = arg
            break
        case 'parent':
            result = arg
            break
    
        default:
            result = "none";
    }
    return result
}