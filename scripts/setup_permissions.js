#!/usr/bin/env node

const BASE_URL = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://admin.smislest.ru";
const EMAIL = process.env.ADMIN_EMAIL || process.env.DIRECTUS_ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD || process.env.DIRECTUS_ADMIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error("❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required");
  console.error("📝 Usage: ADMIN_EMAIL=user@example.com ADMIN_PASSWORD=yourpassword node scripts/setup_permissions.js");
  console.error("   Or on Windows: set ADMIN_EMAIL=user@example.com && set ADMIN_PASSWORD=yourpassword && node scripts/setup_permissions.js");
  process.exit(1);
}

async function setupPermissions() {
  try {
    // Login
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD })
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    const token = loginData.data.access_token;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    };

    console.log(`Authorized: ${loginData.data.user?.first_name || 'User'}`);

    // Получаем роль Public
    const rolesResponse = await fetch(`${BASE_URL}/roles?filter[name][_eq]=Public`, { headers });
    const rolesData = await rolesResponse.json();
    
    if (!rolesData.data || rolesData.data.length === 0) {
      throw new Error('Public role not found');
    }

    const publicRoleId = rolesData.data[0].id;
    console.log(`\nPublic role ID: ${publicRoleId}`);

    // Коллекции для публичного доступа
    const collections = ['faq', 'why_gluten_free'];

    console.log('\nSetting up permissions...');
    
    for (const collection of collections) {
      // Проверяем существующие права
      const permissionsResponse = await fetch(
        `${BASE_URL}/permissions?filter[role][_eq]=${publicRoleId}&filter[collection][_eq]=${collection}`,
        { headers }
      );
      const permissionsData = await permissionsResponse.json();

      if (permissionsData.data && permissionsData.data.length > 0) {
        // Обновляем существующие права
        const permissionId = permissionsData.data[0].id;
        const updateResponse = await fetch(`${BASE_URL}/permissions/${permissionId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            action: 'read',
            permissions: {},
            validation: {},
            fields: ['*']
          })
        });

        if (updateResponse.ok) {
          console.log(`  ✓ Updated permissions for ${collection}`);
        } else {
          const errorText = await updateResponse.text();
          console.log(`  ✗ Failed to update ${collection}: ${errorText}`);
        }
      } else {
        // Создаем новые права
        const createResponse = await fetch(`${BASE_URL}/permissions`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            role: publicRoleId,
            collection: collection,
            action: 'read',
            permissions: {},
            validation: {},
            fields: ['*']
          })
        });

        if (createResponse.ok) {
          console.log(`  ✓ Created permissions for ${collection}`);
        } else {
          const errorText = await createResponse.text();
          console.log(`  ✗ Failed to create ${collection}: ${errorText}`);
        }
      }
    }

    console.log('\n✓ Permissions setup complete!');
    console.log('\nTesting public access...');

    // Проверяем публичный доступ
    for (const collection of collections) {
      const testResponse = await fetch(`${BASE_URL}/items/${collection}`);
      if (testResponse.ok) {
        const testData = await testResponse.json();
        console.log(`  ✓ ${collection}: ${testData.data?.length || 0} items accessible`);
      } else {
        console.log(`  ✗ ${collection}: still not accessible`);
      }
    }

  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

setupPermissions();
