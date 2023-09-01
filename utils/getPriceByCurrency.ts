export const getPriceByCurrency = (prices: any, cartCurrencyCode: string, quantity: number) => {
  const selectedPrice = (prices || []).find(
    (price: any) => price.currency_code === cartCurrencyCode
  );

  if (selectedPrice) {
    const totalPrice = selectedPrice.amount * quantity;
    const currencySymbol = cartCurrencyCode === 'eur' ? '€' : '$';
    return `${currencySymbol} ${(totalPrice / 100).toFixed(2)} `;
  }
  
  return "";
};