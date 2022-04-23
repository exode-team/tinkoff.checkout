# Tinkoff API SDK
Simple SDK for Tinkoff API.

## Example usage
```nodejs
import { TinkoffCheckout } from '@exode/tinkoff.checkout';

const checkout = new TinkoffCheckout(
    process.env.TINKOFF_TERMINAL_KEY,
    process.env.TINKOFF_SECRET_KEY
);

const payment = await checkout.initPayment({
  Amount: '10000',
  OrderId: '123',
  DATA: {
    Email: 'user@exode.ru',
    Phone: '+71234567890'
  },
  Receipt: {
    Email: 'user@ya.ru',
    Phone: '+71234567890',
    Taxation: 'osn',
    Items: [
      {
        Name: 'Наименование товара 1',
        Price: 100,
        Quantity: 100,
        Amount: 10000,
        Tax: 'none',
        Ean13: '0123456789'
      }
    ]
  }
})

```

### Response (payment)
```
{ 
    Success: true,
    ErrorCode: '0',
    TerminalKey: '...',
    Status: 'NEW',
    PaymentId: '...',
    OrderId: '123',
    Amount: 10000,
    PaymentURL: 'https://securepay.tinkoff.ru/new/...' 
}
```

### Nestjs module
```
Coming soon...
```

## Run tests
Execute this command:
```shell script
yarn jest
```
