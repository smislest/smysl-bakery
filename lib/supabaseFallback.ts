import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const endpoint = process.env.SUPABASE_S3_ENDPOINT;
const region = process.env.SUPABASE_S3_REGION || 'eu-central-1';
const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY;
const secretAccessKey = process.env.SUPABASE_S3_SECRET_KEY;
const bucket = process.env.SUPABASE_S3_BUCKET || 'SMYSL_BAKERY_STORAGE';

let cachedClient: S3Client | null = null;

const getClient = () => {
  if (typeof window !== 'undefined') {
    console.log('[Supabase] Client-side, skipping S3 client');
    return null;
  }
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    console.warn('[Supabase] Missing env vars:', { endpoint: !!endpoint, accessKeyId: !!accessKeyId, secretAccessKey: !!secretAccessKey });
    return null;
  }

  if (!cachedClient) {
    cachedClient = new S3Client({
      region,
      endpoint,
      forcePathStyle: true,
      credentials: { accessKeyId, secretAccessKey },
    });
  }
  return cachedClient;
};

const streamToString = async (body: Readable | Blob | any): Promise<string> => {
  if (!body) return '';

  // Web stream case (node 18 fetch response)
  if (typeof body?.getReader === 'function') {
    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    return Buffer.concat(chunks).toString('utf-8');
  }

  // Blob case (edge/runtime)
  if (typeof body?.arrayBuffer === 'function') {
    const buffer = await body.arrayBuffer();
    return Buffer.from(buffer).toString('utf-8');
  }

  // Node Readable stream
  if (body instanceof Readable || typeof body.on === 'function') {
    const chunks: Uint8Array[] = [];
    return await new Promise((resolve, reject) => {
      body.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      body.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
      body.on('error', reject);
    });
  }

  return '';
};

export async function readJsonFallback<T>(key: string): Promise<T | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    const body = await streamToString(response.Body as Readable);
    if (!body) return null;
    return JSON.parse(body) as T;
  } catch (error) {
    console.warn(`Supabase fallback read failed for ${key}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

export async function writeJsonFallback(key: string, data: unknown): Promise<void> {
  const client = getClient();
  if (!client) {
    console.warn(`[Supabase] No S3 client, skipping write for ${key}`);
    return;
  }

  try {
    const body = JSON.stringify(data);
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: 'application/json',
      CacheControl: 'no-cache',
    }));
    console.log(`✅ [Supabase] Saved ${key} (${Array.isArray(data) ? data.length : 1} items)`);
  } catch (error) {
    console.error(`❌ [Supabase] Write failed for ${key}:`, error instanceof Error ? error.message : error);
  }
}
