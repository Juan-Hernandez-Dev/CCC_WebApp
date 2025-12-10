import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type Product = {
  nombre: string;
  imagen: string;
  capacidad: string;
  descripcion: string;
  precioOriginal: number;
  descuento: number;
  enDescuento: boolean;
  deleted?: boolean;
  active?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { categoryName, product } = body as { categoryName: string; product: any };

    if (!categoryName || typeof categoryName !== 'string') {
      return NextResponse.json({ error: 'categoryName is required and must be a string' }, { status: 400 });
    }

    // Required fields validation
    const required = ['nombre', 'imagen', 'capacidad', 'descripcion', 'precioOriginal', 'descuento', 'enDescuento'];
    for (const f of required) {
      if (!(f in product)) {
        return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 });
      }
    }

    if (typeof product.nombre !== 'string' || product.nombre.trim() === '') {
      return NextResponse.json({ error: 'nombre must be a non-empty string' }, { status: 400 });
    }

    if (typeof product.imagen !== 'string') {
      return NextResponse.json({ error: 'imagen must be a string (URL or path)' }, { status: 400 });
    }

    if (typeof product.descripcion !== 'string') {
      return NextResponse.json({ error: 'descripcion must be a string' }, { status: 400 });
    }

    const precioOriginal = Number(product.precioOriginal);
    const descuento = Number(product.descuento);
    if (Number.isNaN(precioOriginal) || precioOriginal < 0) {
      return NextResponse.json({ error: 'precioOriginal must be a non-negative number' }, { status: 400 });
    }
    if (Number.isNaN(descuento) || descuento < 0) {
      return NextResponse.json({ error: 'descuento must be a non-negative number' }, { status: 400 });
    }

    const enDescuento = Boolean(product.enDescuento);

    const productToInsert: Product = {
      nombre: product.nombre,
      imagen: product.imagen,
      capacidad: typeof product.capacidad === 'string' ? product.capacidad : String(product.capacidad || ''),
      descripcion: product.descripcion,
      precioOriginal,
      descuento,
      enDescuento,
      // control fields for soft-delete / active state
      deleted: false,
      active: true,
    };

    const filePath = path.join(process.cwd(), 'src', 'components', 'products.json');
    const fileStr = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileStr);

    if (!data.categorias || !Array.isArray(data.categorias)) {
      data.categorias = [];
    }

    let categoria = data.categorias.find((c: any) => c.nombre === categoryName);
    if (!categoria) {
      categoria = { nombre: categoryName, productos: [] };
      data.categorias.push(categoria);
    }

    if (!categoria.productos || !Array.isArray(categoria.productos)) categoria.productos = [];
    categoria.productos.push(productToInsert);

    // Record history
    if (!data.historial) data.historial = [];
    data.historial.push({
      action: 'create',
      timestamp: new Date().toISOString(),
      categoryName,
      product: productToInsert,
    });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ ok: true, message: 'Product added', product: productToInsert });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'components', 'products.json');
    const fileStr = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileStr);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { categoryName, nombre } = body as { categoryName: string; nombre: string };
    if (!categoryName || !nombre) {
      return NextResponse.json({ error: 'categoryName and nombre are required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'components', 'products.json');
    const fileStr = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileStr);

    if (!data.categorias || !Array.isArray(data.categorias)) {
      return NextResponse.json({ error: 'No categories available' }, { status: 404 });
    }

    const categoria = data.categorias.find((c: any) => c.nombre === categoryName);
    if (!categoria || !Array.isArray(categoria.productos)) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    // Soft-delete: mark product.deleted = true and active = false, store history
    const idx = categoria.productos.findIndex((p: any) => p.nombre === nombre);
    if (idx === -1) {
      return NextResponse.json({ error: 'Product not found in category' }, { status: 404 });
    }

    const before = { ...categoria.productos[idx] };
    categoria.productos[idx].deleted = true;
    categoria.productos[idx].active = false;

    if (!data.historial) data.historial = [];
    data.historial.push({
      action: 'delete',
      timestamp: new Date().toISOString(),
      categoryName,
      productBefore: before,
    });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ ok: true, message: 'Product soft-deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { categoryName, originalNombre, product } = body as { categoryName: string; originalNombre: string; product: any };
    if (!categoryName || !originalNombre || !product) {
      return NextResponse.json({ error: 'categoryName, originalNombre and product are required' }, { status: 400 });
    }

    // Basic validation of incoming product fields (same as POST)
    const required = ['nombre', 'imagen', 'capacidad', 'descripcion', 'precioOriginal', 'descuento', 'enDescuento'];
    for (const f of required) {
      if (!(f in product)) {
        return NextResponse.json({ error: `Missing field: ${f}` }, { status: 400 });
      }
    }

    const precioOriginal = Number(product.precioOriginal);
    const descuento = Number(product.descuento);
    if (Number.isNaN(precioOriginal) || precioOriginal < 0) {
      return NextResponse.json({ error: 'precioOriginal must be a non-negative number' }, { status: 400 });
    }
    if (Number.isNaN(descuento) || descuento < 0) {
      return NextResponse.json({ error: 'descuento must be a non-negative number' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'components', 'products.json');
    const fileStr = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileStr);

    if (!data.categorias || !Array.isArray(data.categorias)) {
      return NextResponse.json({ error: 'No categories available' }, { status: 404 });
    }

    const categoria = data.categorias.find((c: any) => c.nombre === categoryName);
    if (!categoria || !Array.isArray(categoria.productos)) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const idx = categoria.productos.findIndex((p: any) => p.nombre === originalNombre);
    if (idx === -1) {
      return NextResponse.json({ error: 'Product not found in category' }, { status: 404 });
    }

    const updatedProduct = {
      nombre: product.nombre,
      imagen: product.imagen,
      capacidad: typeof product.capacidad === 'string' ? product.capacidad : String(product.capacidad || ''),
      descripcion: product.descripcion,
      precioOriginal,
      descuento,
      enDescuento: Boolean(product.enDescuento),
      // preserve deleted/active flags if provided, otherwise default
      deleted: Boolean(product.deleted ?? false),
      active: product.active === undefined ? true : Boolean(product.active),
    };

    const before = { ...categoria.productos[idx] };
    categoria.productos[idx] = updatedProduct;

    if (!data.historial) data.historial = [];
    data.historial.push({
      action: 'update',
      timestamp: new Date().toISOString(),
      categoryName,
      productBefore: before,
      productAfter: updatedProduct,
    });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ ok: true, message: 'Product updated', product: updatedProduct });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// PATCH: operations like restore, activate, deactivate, soft-delete by op
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { categoryName, nombre, op } = body as { categoryName: string; nombre: string; op: string };
    if (!categoryName || !nombre || !op) {
      return NextResponse.json({ error: 'categoryName, nombre and op are required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'components', 'products.json');
    const fileStr = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileStr);

    if (!data.categorias || !Array.isArray(data.categorias)) {
      return NextResponse.json({ error: 'No categories available' }, { status: 404 });
    }

    const categoria = data.categorias.find((c: any) => c.nombre === categoryName);
    if (!categoria || !Array.isArray(categoria.productos)) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const idx = categoria.productos.findIndex((p: any) => p.nombre === nombre);
    if (idx === -1) {
      return NextResponse.json({ error: 'Product not found in category' }, { status: 404 });
    }

    const before = { ...categoria.productos[idx] };
    switch (op) {
      case 'soft-delete':
        categoria.productos[idx].deleted = true;
        categoria.productos[idx].active = false;
        break;
      case 'restore':
        categoria.productos[idx].deleted = false;
        categoria.productos[idx].active = true;
        break;
      case 'deactivate':
        categoria.productos[idx].active = false;
        break;
      case 'activate':
        // Prevent activating a logically-deleted product. Must restore first.
        if (categoria.productos[idx].deleted) {
          return NextResponse.json({ error: 'Cannot activate a deleted product. Restore it first.' }, { status: 400 });
        }
        categoria.productos[idx].active = true;
        break;
      default:
        return NextResponse.json({ error: 'Invalid op' }, { status: 400 });
    }

    if (!data.historial) data.historial = [];
    data.historial.push({
      action: op,
      timestamp: new Date().toISOString(),
      categoryName,
      productBefore: before,
      productAfter: { ...categoria.productos[idx] },
    });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ ok: true, message: 'Operation applied', product: categoria.productos[idx] });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

