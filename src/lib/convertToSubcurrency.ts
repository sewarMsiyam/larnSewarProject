function convertToSubcurrency(amount: string | number, factor = 100) {
    if (typeof amount === 'string') {
        amount = parseFloat(amount.replace(/[$,]/g, ''));
    }
    
    return Math.round(amount * factor);
}

export default convertToSubcurrency;