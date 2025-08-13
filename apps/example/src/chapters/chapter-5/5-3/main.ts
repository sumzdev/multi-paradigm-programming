import { fx, map, range } from '@fxts/core';

function delay<T>(time: number): Promise<undefined>;
function delay<T>(time: number, value: T): Promise<T>;
function delay<T>(time: number, value?: T): Promise<T | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), time);
  });
}

type Payment = {
  pg_uid: string;
  store_order_id: number;
  amount: number;
};

const pgDataPaymentsPages: Payment[][] = [
  [
    { pg_uid: 'PG11', store_order_id: 1, amount: 15000 },
    { pg_uid: 'PG12', store_order_id: 2, amount: 25000 },
    { pg_uid: 'PG13', store_order_id: 3, amount: 10000 }
  ],
  [
    { pg_uid: 'PG14', store_order_id: 4, amount: 25000 },
    { pg_uid: 'PG15', store_order_id: 5, amount: 45000 },
    { pg_uid: 'PG16', store_order_id: 6, amount: 15000 }
  ],
  [
    { pg_uid: 'PG17', store_order_id: 7, amount: 20000 },
    { pg_uid: 'PG18', store_order_id: 8, amount: 30000 }
  ],
];

// Payment Gateway API
const PgApi = {
  async getPayments(page: number) {
    console.log(`Payments request: https://pg.com/payments?page=${page}`);
    await delay(500);

    const payments = pgDataPaymentsPages[page - 1] ?? [];
    console.log(
      `${payments.length}: ${payments.map(p => p.pg_uid).join(', ') || '-'}`
    );

    return payments;
  },

  async cancelPayment(pg_uid: string) {
    console.log(`Cancellation request: ${pg_uid}`);
    await delay(300);
    return {
      code: 200,
      message: `${pg_uid}: Cancellation and refund completed`,
      pg_uid,
    };
  }
};

type Order = {
  id: number;
  amount: number;
  is_paid: boolean;
};

const StoreDB = {
  async getOrders(ids: number[]): Promise<Order[]> {
    console.log(`SELECT * FROM orders WHERE IN (${ids}) AND is_paid = true;`);
    await delay(100);
    return [
      { id: 1, amount: 15000, is_paid: true },
      { id: 3, amount: 10000, is_paid: true },
      { id: 5, amount: 45000, is_paid: true },
      { id: 7, amount: 20000, is_paid: true },
      { id: 8, amount: 30000, is_paid: true },
    ];
  }
};


async function code_5_32() {
  async function syncPayments() {
    const payments =
      fx(range(1, Infinity))
        .map(page => [page, page, page])
        .take(5)
        .toArray();

    console.log(payments);
  }

  await syncPayments();
}

async function code_5_33() {
  async function syncPayments() {
    const payments =
      fx(range(1, Infinity))
        .map(page => [page, page, page])
        .take(5)
        .flat()
        .toArray();

    console.log(payments);
  }

  await syncPayments();
}

async function code_5_34() {
  async function syncPayments() {
    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .take(5)
        .flat()
        .toArray();

    console.log(payments);
  }

  await syncPayments();
}

async function code_5_35() {
  async function syncPayments() {
    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeWhile(({length}) => length > 0)
        .flat()
        .toArray();

    console.log(payments);
  }

  await syncPayments();
}

async function code_5_36() {
  async function syncPayments() {
    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeUntilInclusive(({length}) => length < 3)
        .flat()
        .toArray();

    console.log(payments);
  }

  await syncPayments();
}

async function code_5_37() {
  async function syncPayments() {
    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeUntilInclusive(({length}) => length < 3)
        .flat()
        .toArray();


    const orders = await StoreDB.getOrders(
      payments.map(p => p.store_order_id)
    );

    await fx(payments)
      .toAsync()
      .reject(p => orders.some(order => order.id === p.store_order_id))
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
  }

  await syncPayments();
}

async function code_5_38_39() {
  async function syncPayments() {
    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeUntilInclusive(({length}) => length < 3)
        .flat()
        .toArray();

    const orders = await StoreDB.getOrders(
      payments.map(p => p.store_order_id)
    );

    const ordersById = Object.fromEntries(
      map(order => [order.id, true], orders)
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersById[p.store_order_id])
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });

    // [5-39]
    /*
    const ordersMapById = new Map(
      map(order => [order.id, true], orders)
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersMapById.has(p.store_order_id))
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
    */
  }

  await syncPayments();
}

async function code_5_40() {
  async function syncPayments() {
    const payments = await
      fx(range(1, Infinity))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .takeUntilInclusive(({length}) => length < 3)
        .flat()
        .toArray();

    const orders = await StoreDB.getOrders(
      payments.map(p => p.store_order_id)
    );

    // [5-39]
    const ordersMapById = new Map(
      map(order => [order.id, true], orders)
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersMapById.has(p.store_order_id))
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
  }

  async function runScheduler() {
    await fx(range(Infinity))
      .toAsync()
      .forEach(() => Promise.all([
        syncPayments(),
        delay(10000)
      ]));
  }

  await runScheduler();
}

async function code_5_41__49() {
  // Payment Gateway API
  const PgApi = {
    async getPageCount() {
      console.log('Page count request: https://pg.com/payments/page-count');
      await delay(50);
      return pgDataPaymentsPages.length;
    },

    async getPayments(page: number) {
      console.log(`Payments request: https://pg.com/payments?page=${page}`);
      await delay(500); // 변경해보세요.

      const payments = pgDataPaymentsPages[page - 1] ?? [];
      console.log(
        `${payments.length}개: ${payments.map(p => p.pg_uid).join(', ') || '-'}`
      );

      return payments;
    },

    async cancelPayment(pg_uid: string) {
      console.log(`Cancellation request: ${pg_uid}`);
      await delay(3000);
      return {
        code: 200,
        message: `${pg_uid}: Cancellation and refund completed`,
        pg_uid,
      };
    }
  }

  const StoreDB = {
    async getOrders(ids: number[]): Promise<Order[]> {
      if (ids.length > 5) {
        throw new Error(`Exceeded number of IDs: You can request up to 5 IDs. (Number provided: ${ids.length})`);
      }
      console.log(`SELECT * FROM orders WHERE IN (${ids}) AND is_paid = true;`);
      await delay(100);
      return [
        { id: 1, amount: 15000, is_paid: true },
        { id: 3, amount: 10000, is_paid: true },
        { id: 5, amount: 45000, is_paid: true },
        { id: 7, amount: 20000, is_paid: true },
        { id: 8, amount: 30000, is_paid: true },
      ];
    }
  };

  async function syncPayments() {
    const totalPages = await PgApi.getPageCount(); // 3

    const RATE_LIMIT = 2;

    const payments = await
      fx(range(1, totalPages + 1))
        .toAsync()
        .map(page => PgApi.getPayments(page))
        .concurrent(RATE_LIMIT)
        .flat()
        .toArray();

    const orders = await
      fx(payments)
        .map(p => p.store_order_id)
        .chunk(5)
        .toAsync()
        .flatMap(StoreDB.getOrders)
        .toArray();

    // [5-39]
    const ordersMapById = new Map(
      map(order => [order.id, true], orders)
    );

    await fx(payments)
      .toAsync()
      .reject(p => ordersMapById.has(p.store_order_id))
      .forEach(async p => {
        const { message } = await PgApi.cancelPayment(p.pg_uid);
        console.log(message);
      });
  }

  async function runScheduler() {
    await fx(range(Infinity))
      .toAsync()
      .forEach(() => Promise.all([
        syncPayments(),
        delay(10000)
      ]));
  }

  await runScheduler();
}

export async function main() {
  await code_5_32();
  // await code_5_33();
  // await code_5_34();
  // await code_5_35();
  // await code_5_36();
  // await code_5_37();
  // await code_5_38_39();
  await code_5_40();
  // await code_5_41__49();
}
