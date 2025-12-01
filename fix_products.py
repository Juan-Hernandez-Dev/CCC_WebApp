import json
import re

with open('src/components/products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for categoria in data['categorias']:
    for producto in categoria['productos']:
        # Fix URL: add =s220 if not present
        if not producto['imagen'].endswith('=s220'):
            producto['imagen'] += '=s220'
        
        # Fix capacidad: extract from name if present
        name = producto['nombre']
        match = re.search(r'(\d+)(ml|g|L)', name, re.IGNORECASE)
        if match:
            producto['capacidad'] = match.group(1) + match.group(2).lower()
        # else leave as is

with open('src/components/products_fixed.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
