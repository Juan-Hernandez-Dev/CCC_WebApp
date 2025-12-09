const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/components/products.json', 'utf8'));

data.categorias.forEach(categoria => {
  categoria.productos.forEach(producto => {
    if (!producto.descripcion) {
      if (producto.capacidad) {
        producto.descripcion = `Capacidad: ${producto.capacidad}`;
      } else {
        producto.descripcion = 'Producto de alta calidad';
      }
    }
  });
});

fs.writeFileSync('src/components/products.json', JSON.stringify(data, null, 2));
console.log('Descriptions added successfully');
