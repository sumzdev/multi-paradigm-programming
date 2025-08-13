const numbers = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10]
];

function code_5_1() {
  const oddSquareSum = numbers
    .flat()
    .filter(a => a % 2 === 1)
    .map(a => a * a)
    .reduce((a, b) => a + b, 0);

  console.log(oddSquareSum);
}

type Player = {
  name: string;
  score: number;
};

type Team = {
  name: string;
  players: Player[];
};

const teams: Team[] = [
  {
    name: 'Bears', players: [
      { name: 'Luka', score: 32 },
      { name: 'Anthony', score: 28 },
      { name: 'Kevin', score: 15 },
      { name: 'Jaylen', score: 14 },
    ]
  },
  {
    name: 'Lions', players: [
      { name: 'Stephen', score: 37 },
      { name: 'Zach', score: 20 },
      { name: 'Nikola', score: 19 },
      { name: 'Austin', score: 22 },
    ]
  },
  {
    name: 'Wolves', players: [
      { name: 'Jayson', score: 32 },
      { name: 'Klay', score: 37 },
      { name: 'Andrew', score: 15 },
      { name: 'Patrick', score: 14 },
    ]
  },
  {
    name: 'Tigers', players: [
      { name: 'DeMar', score: 37 },
      { name: 'Marcus', score: 21 },
      { name: 'Al', score: 19 },
      { name: 'Dennis', score: 22 },
    ]
  },
];

function code_5_2_3() {
  const totalHighScorers = teams
    .map(team => team.players)
    .flat()
    .filter(player => player.score >= 30)
    .map(player => player.score)
    .reduce((a, b) => a + b, 0);

  console.log(totalHighScorers); // 175

  const totalHighScorers2 = teams
    .flatMap(team => team.players)
    .filter(player => player.score >= 30)
    .map(player => player.score)
    .reduce((a, b) => a + b, 0);

  console.log(totalHighScorers2); // 175
}

function code_5_4() {
  const oddSquareSum = numbers
    .flat()
    .filter(a => a % 2 === 1)
    .map(a => a * a)
    .reduce((a, b) => a + b, 0);

  const totalHighScorers = teams
    .flatMap(team => team.players)
    .filter(player => player.score >= 30)
    .map(player => player.score)
    .reduce((a, b) => a + b, 0);
}

function code_5_5() {
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

  const sumSelectedQuantities = (products: Product[]) =>
    products.reduce((total, prd) => {
      if (prd.selected) {
        return total + prd.quantity;
      } else {
        return total;
      }
    }, 0);

  const calcSelectedPrices = (products: Product[]) =>
    products.reduce((total, prd) => {
      if (prd.selected) {
        return total + prd.price * prd.quantity;
      } else {
        return total;
      }
    }, 0);

  console.log(sumSelectedQuantities(products));
  console.log(calcSelectedPrices(products));
}

function code_5_6() {
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

  const sumSelectedQuantities = (products: Product[]) =>
    products
      .filter(prd => prd.selected)
      .map(prd => prd.quantity)
      .reduce((a, b) => a + b, 0);

  const calcSelectedPrices = (products: Product[]) =>
    products
      .filter(prd => prd.selected)
      .map(prd => prd.price * prd.quantity)
      .reduce((a, b) => a + b, 0);

  console.log(sumSelectedQuantities(products)); 
  console.log(calcSelectedPrices(products));  
}

// [5-7]
type Option = {
  name: string;
  price: number;
  quantity: number;
};

type Product = {
  name: string;
  price: number;
  selected: boolean;
  options: Option[];
};

const products: Product[] = [
  {
    name: 'T-shirt',
    price: 10000,
    selected: true,
    options: [
      { name: 'L', price: 0, quantity: 3 },
      { name: 'XL', price: 1000, quantity: 2 },
      { name: '2XL', price: 3000, quantity: 2 },
    ]
  },
  {
    name: 'Shirt',
    price: 30000,
    selected: false,
    options: [
      { name: 'L', price: 0, quantity: 2 },
      { name: 'XL', price: 1000, quantity: 5 },
      { name: '2XL', price: 3000, quantity: 4 },
    ]
  },
  {
    name: 'Pants',
    price: 15000,
    selected: true,
    options: [
      { name: 'XL', price: 500, quantity: 3 },
      { name: '2XL', price: 3000, quantity: 5 },
    ]
  }
];

function code_5_8() {
  const sumSelectedQuantities2 = (products: Product[]) =>
    products
      .filter(prd => prd.selected)
      .map(prd => prd.options)
      .flat()
      .map(opt => opt.quantity)
      .reduce((a, b) => a + b, 0);

  const calcSelectedPrices2 = (products: Product[]) =>
    products
      .filter(prd => prd.selected)
      .map(prd => prd.options.map(
        opt => (prd.price + opt.price) * opt.quantity
      ))
      .flat()
      .reduce((a, b) => a + b, 0);

  console.log(sumSelectedQuantities2(products));
  console.log(calcSelectedPrices2(products));
}

function code_5_9() {
  const sumSelectedQuantities2 = (products: Product[]) =>
    products
      .filter(prd => prd.selected)
      .flatMap(prd => prd.options)
      .map(opt => opt.quantity)
      .reduce((a, b) => a + b, 0);

  console.log(sumSelectedQuantities2(products));
}

function code_5_10() {
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

  const calcProductPrice = (prd: Product) => prd.price * prd.quantity;

  const calcSelectedPrices = (products: Product[]) =>
    products
      .filter(prd => prd.selected)
      .map(calcProductPrice)
      .reduce((a, b) => a + b, 0);
}

function code_5_10a() {
  const calcProductOptionPrices = (prd: Product) =>
    prd.options.map(opt => (prd.price + opt.price) * opt.quantity);

  const calcSelectedPrices2 = (products: Product[]) =>
    products
      .filter(prd => prd.selected)
      .flatMap(calcProductOptionPrices)
      .reduce((a, b) => a + b, 0);
}

function code_5_11() {
  const calcProductOptionPrices = (prd: Product) =>
    prd.options.map(opt => (prd.price + opt.price) * opt.quantity);

  const calcTotalPrice = (products: Product[]) =>
    products
      .flatMap(calcProductOptionPrices)
      .reduce((a, b) => a + b, 0);

  const calcSelectedPrices2 = (products: Product[]) => calcTotalPrice(
    products.filter(prd => prd.selected)
  );

  console.log(calcTotalPrice(products));
  console.log(calcSelectedPrices2(products));
}

function code_5_12() {
  function calcTotalPrice(products: Product[]): number {
    let totalPrice = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      for (let j = 0; j < product.options.length; j++) {
        const option = product.options[j];
        totalPrice += (product.price + option.price) * option.quantity;
      }
    }

    return totalPrice;
  }

  function calcSelectedPrices2(products: Product[]): number {
    const selectedProducts: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].selected) {
        selectedProducts.push(products[i]);
      }
    }

    return calcTotalPrice(selectedProducts);
  }

  console.log(calcTotalPrice(products));
  console.log(calcSelectedPrices2(products));
}

export function main() {
  code_5_1();
  code_5_2_3();
  code_5_4();
  code_5_5();
  code_5_6();
  code_5_8();
  code_5_9();
  code_5_10();
  code_5_11();
  code_5_12();
}
