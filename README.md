## VENDOR

- images -> billboard -> true
- title, description, location
- categories
- products
- orders

```sh
npx prisma migrate dev --name init
```

```sh
npx prisma db push --force-reset
```

## VENDOR DASHBOARD

```sh
http://localhost:5173/vendors/1/dashboard/home
```

## ADMIN DASHBOARD

```sh
http://localhost:5173/admin/dashboard
```

## NEW VENDOR REGISTRATION

```sh
http://localhost:5173/vendors/new
```

## NEW VENDOR LOGIn

```sh
http://localhost:5173/vendors/auth/login
```

```sh
/admin/auth/login
```
