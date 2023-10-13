export function extractPrice(...elements: any){
    for (const element of elements) {
        const priceText = element.text().trim();
        if (priceText) return  priceText.replace(/[^\d,.]/g, '')
    }
    return '';
}

export function extractCurrency(element: any) {
    const currencyText = element.text().trim().slice(0,1);
    return currencyText ? currencyText : '';
}

export function extractPercentageDiscount(element: any) {
    const percentageText = element.text().trim();
    const regex = /\$\d+(?:,\d{3})*(?:\.\d{2})?\s+\(\d+\%\)/g;
    const matches = percentageText.match(regex);
    if(matches) {
        return matches[0]
    } else {
        return null
    }

} 