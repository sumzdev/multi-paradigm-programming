export function lesson3() {
  // 10.3 Working with commerce data

  type Product = {
    name: string;
    price: number;
    quantity: number;
    selected: boolean;
  };

  const products: Product[] = [
    {
      name: 'T-shirt',
      price: 10000,
      quantity: 1,
      selected: true,
    },
    {
      name: 'Shirt',
      price: 30000,
      quantity: 2,
      selected: false,
    },
    {
      name: 'Pants',
      price: 15000,
      quantity: 2,
      selected: true,
    }
  ];

  function sumSelectedQuantities(products: Product[]) {
    return products
      .filter(prd => prd.selected)
      .map(prd => prd.quantity)
      .reduce((a, b) => a + b, 0);
  }

  function calcSelectedPrices(products: Product[]) {
    return products
      .filter(prd => prd.selected)
      .map(prd => prd.price * prd.quantity)
      .reduce((a, b) => a + b, 0);
  }

  console.log(sumSelectedQuantities(products));
  console.log(calcSelectedPrices(products));
}
