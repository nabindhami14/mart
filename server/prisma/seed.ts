// import { faker } from "@faker-js/faker";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//     const users = [];
//     for (let i = 0; i < 5; i++) {
//         const user = await prisma.user.create({
//             data: {
//                 name: faker.person.fullName(),
//                 email: faker.internet.email(),
//                 password: faker.internet.password(),
//                 role: "VENDOR",
//             },
//         });
//         users.push(user);
//     }

//     for (const user of users) {
//         // Generate Vendors for each user
//         for (let j = 0; j < 1; j++) {
//             const vendor = await prisma.vendor.create({
//                 data: {
//                     name: faker.company.name(),
//                     description: faker.lorem.sentence(),
//                     phone: faker.phone.number(),
//                     userId: user.id,
//                 },
//             });

//             // Generate Categories for each vendor
//             const categories = [];
//             for (let k = 0; k < 10; k++) {
//                 const category = await prisma.category.create({
//                     data: {
//                         name: faker.commerce.department(),
//                         vendorId: vendor.id,
//                     },
//                 });
//                 categories.push(category);
//             }

//             // Generate Products for each vendor
//             for (const category of categories) {
//                 for (let l = 0; l < 10; l++) {
//                     const product = await prisma.product.create({
//                         data: {
//                             name: faker.commerce.productName(),
//                             description: faker.commerce.productDescription(),
//                             price: parseFloat(faker.commerce.price()),
//                             stock: faker.number.int({ min: 0, max: 100 }),
//                             vendorId: vendor.id,
//                             categoryId: category.id,
//                         },
//                     });

//                     // Generate Product Images for each product
//                     for (let m = 0; m < 3; m++) {
//                         // Each product has 3 images
//                         await prisma.productImage.create({
//                             data: {
//                                 imageUrl: faker.image.url(),
//                                 productId: product.id,
//                             },
//                         });
//                     }
//                 }
//             }
//         }
//     }
// }

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
