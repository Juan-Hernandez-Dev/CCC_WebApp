const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'products.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.categorias.forEach(cat => {
  if (cat.productos) {
    cat.productos.forEach(p => {
      if (p.stock === undefined) p.stock = 0;
      if (p.estado === undefined) p.estado = 'Available';
    });
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✓ JSON actualizado con campos stock y estado');
