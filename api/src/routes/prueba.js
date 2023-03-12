fetch('http://localhost:3001/recipes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'Mi receta', ingredients: ['ingrediente 1', 'ingrediente 2'] })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));