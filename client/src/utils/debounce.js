const debounce = (func, time = 3000) => {
    let timeout
    return function (...args) {
        const context = this
        clearTimeout(timeout)

        timeout = setTimeout(() => func.apply(context, args), time)
    }
}

export default debounce