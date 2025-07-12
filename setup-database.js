const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');
    
    // Read and execute create tables script
    const createTablesSQL = fs.readFileSync(path.join(__dirname, 'scripts', '01-create-tables.sql'), 'utf8');
    const createStatements = createTablesSQL.split(';').filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'));
    
    for (const statement of createStatements) {
      if (statement.trim()) {
        try {
          await sql([statement]);
        } catch (error) {
          console.log(`⚠️ Statement skipped (may already exist): ${error.message.substring(0, 50)}...`);
        }
      }
    }
    console.log('✅ Tables setup completed');
    
    // Test connection and show tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('📋 Available tables:');
    tables.forEach(table => console.log(`  - ${table.table_name}`));
    
    // Test data
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    const productCount = await sql`SELECT COUNT(*) as count FROM products`;
    const categoryCount = await sql`SELECT COUNT(*) as count FROM categories`;
    
    console.log('\n📊 Data summary:');
    console.log(`  - Users: ${userCount[0].count}`);
    console.log(`  - Products: ${productCount[0].count}`);
    console.log(`  - Categories: ${categoryCount[0].count}`);
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    throw error;
  }
}

setupDatabase().then(() => {
  console.log('\n🎉 Database setup completed!');
  process.exit(0);
}).catch(error => {
  console.error('Setup failed:', error);
  process.exit(1);
});
