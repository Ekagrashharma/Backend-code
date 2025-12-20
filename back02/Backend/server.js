import express from "express"


const app= express()

app.get('/api/fruits', (req,res)=>{
    const fruits = [
  {
    id: 1,
    name: "Apple",
    detail: "A crunchy fruit rich in fiber and vitamin C, commonly red or green."
  },
  {
    id: 2,
    name: "Banana",
    detail: "A soft, sweet fruit high in potassium and energy-boosting carbohydrates."
  },
  {
    id: 3,
    name: "Orange",
    detail: "A juicy citrus fruit packed with vitamin C and antioxidants."
  },
  {
    id: 4,
    name: "Mango",
    detail: "A tropical fruit with a sweet taste, rich in vitamins A and C."
  },
  {
    id: 5,
    name: "Grapes",
    detail: "Small, juicy fruits that grow in clusters and are rich in antioxidants."
  },
  {
    id: 6,
    name: "Pineapple",
    detail: "A tropical fruit with a tangy-sweet flavor and digestive enzymes."
  },
  {
    id: 7,
    name: "Strawberry",
    detail: "A red, sweet berry rich in vitamin C and antioxidants."
  },
  {
    id: 8,
    name: "Watermelon",
    detail: "A refreshing, water-rich fruit ideal for hydration in summer."
  },
  {
    id: 9,
    name: "Papaya",
    detail: "A soft tropical fruit that aids digestion and supports immunity."
  },
  {
    id: 10,
    name: "Kiwi",
    detail: "A small fruit with green flesh, high in vitamin C and fiber."
  }
];
     res.send(fruits);
});

const PORT = process.env.PORT | 3000 ;

app.listen(PORT, ()=>{
    console.log(`Server at http://localhost:${PORT}`);
    }
)
