import { createAdminUser } from '../src/lib/auth';

async function main() {
  try {
    console.log('Initializing admin user...');
    await createAdminUser();
    console.log('Admin user initialization completed!');
    console.log('Email: admin@sindhisanchaya.in');
    console.log('Password: adminpassword@321');
  } catch (error) {
    console.error('Admin initialization failed:', error);
    process.exit(1);
  }
}

main();
