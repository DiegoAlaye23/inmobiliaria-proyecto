const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necesario para Supabase
  }
});

pool.connect()
  .then(() => console.log('📦 Conectado a PostgreSQL en Supabase'))
  .catch((err) => console.error('❌ Error de conexión:', err));

module.exports = pool;
  