const fs = require('fs');

fs.readFile('src/components/products.json', 'utf8', (err, data) => {
  if (err) throw err;
  let json = JSON.parse(data);

  json.categorias.forEach(categoria => {
    categoria.productos.forEach(producto => {
      // Fix URL: add =s220 if not present
      if (!producto.imagen.endsWith('=s220')) {
        producto.imagen += '=s220';
      }
      
      // Fix capacidad: extract from name if present
      const match = producto.nombre.match(/(\d+)(ml|g|L)/i);
      if (match) {
        producto.capacidad = match[1] + match[2].toLowerCase();
      }
    });
  });

  fs.writeFile('src/components/products_fixed.json', JSON.stringify(json, null, 2), 'utf8', (err) => {
    if (err) throw err;
    console.log('Fixed products saved to products_fixed.json');
  });
});
