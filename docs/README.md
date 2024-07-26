## SETUP

```sh
cd admin
npm i
```

```sh
cd server
npm i

npx prisma migrate dev
npx prisma generate
```

```sh
http://localhost:5173/admin/dashboard/orders
```

> ORDERS

```sh
http://localhost:5173/vendors/1/dashboard/orders
```

> VENDORS ORDERS

```sh
http://localhost:5173/vendors/auth/login
```

> VENDORS LOGIN PAGE

```sh
http://localhost:5173/admin/auth/login
```

> ADMIN LOGIN PAGE

```sh
http://localhost:5173/auth/login
```

> CUSTOMER LOGIN PAGE
