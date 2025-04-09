import pool from '@/app/api/postgresql'; // správne importuj cestu
import Image from 'next/image';
import { bufferImage } from '@/lib/exportImage';

export default async function ProductsPage() {
  const res = await pool.query('SELECT * FROM "Produkty"');
  const products = res.rows;

  return (
    <div>
      <h1>Produkty</h1>
      <ul>
        {products?.map(p => (
          <li key={p.ID}>
            {p.Nazov} {p.Cena}
            <Image 
              src={bufferImage(p.Obrazok)} 
              alt={p.Nazov} 
              width={100} 
              height={100} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
