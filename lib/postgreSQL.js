import pool from '../app/api/postgresql';

export async function getServerSideProps() {
  const query = `SELECT * FROM products`;
  const { rows } = await pool.query(query);
  return {
    props: {
      products: rows,
    },
  };
}
