import { createClient } from 'redis';

const client = createClient({
  socket: {
    host: 'localhost',
    port: 6380,
  },
});

client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export async function setCachedItem(key: string, data: any, ttl = 600): Promise<void> {
  await connectRedis();
  await client.set(key, JSON.stringify(data), { // Stringify the data
    EX: ttl,
  });
  console.log(`Cached key "${key}" with TTL ${ttl}s`);
}

export async function getCachedItem(key: string): Promise<any | null> {
  await connectRedis();
  const value = await client.get(key);
  

  return value ? JSON.parse(value) : null;
   
}
export async function removeCachedItem(key:string): Promise<void>{
    await connectRedis();
    const result= await client.del(key)
    if(result){
        console.log(`key${key} remove successfully`)
    }
    else {
    console.log(`Key "${key}" does not exist.`);
  }
}
export async function getKeys(): Promise<void>{
await connectRedis()
const result = await client.keys('*')
if(result.length<0){
    console.log("no keys")
}
else{
    console.log('All Redis Keys:', result);
}
}

// (async () => {
//   try {
//     const key = 'user:102';
//     const userData = JSON.stringify({ name: 'Sumit' });

//     await setCachedItem(key, userData, 300);

//     const result = await getCachedItem(key);
//     console.log('Parsed result:', result ? result : null);
//   } catch (err) {
//     console.error('Error:', err);
//   } finally {
//     await client.quit();
//   }
//   await getKeys()
// })();
