## 7.1 Waiting for the Pipe Operator

### ((()))

  forEach(printNumber,
    map(n => n * 10,
      filter(n => n % 2 === 1,
        naturals(5))));
  // 10
  // 30
  // 50

### Pipe Operator (Stage: 2)

  naturals(5)
    |> filter(n => n % 2 === 1, %)
    |> map(n => n * 10, %)
    |> forEach(printNumber, %)
  // 10
  // 30
  // 50
