

const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');

const fs = require('fs');

const names = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set']

const products = [];


for (const name of names) {
    const start = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
    const end = new Date(start.setTime(start.getTime() + (Math.floor(Math.random() * 10)) * 86400000));
    const price = Math.random() * 10000;

    products.push({
        id: uuidv4(),
        ownerId: uuidv4(),
        name: name,
        description: `This is description of ${name}`,
        dateStart: start,
        dateEnd: end,
        estimateDateEnd: end,
        estimatePrice: price,
        actualPrice: price,
        milestones: [],
        users: []
    });
}

//console.log(JSON.stringify(products))

fs.writeFile('products.json', JSON.stringify(products), function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });



