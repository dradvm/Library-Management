const currency = (value, locale = 'vi-VN', currency = 'VND') => {
    if (typeof value !== "number") {
        value = parseFloat(value);
    }
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(value);
}
const decimal = (value, locale = 'vi-VN') => {
    if (typeof value !== "number") {
        value = parseFloat(value);
    }
    return new Intl.NumberFormat(locale, {
        style: 'decimal',
    }).format(value);
}
export default { currency, decimal }