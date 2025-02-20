// import { createClient } from 'redis';

// const redisClient = createClient({
//     socket: {
//         host: '127.0.0.1',
//         port: 6379,
//     }
// });

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// (async () => {
//     try {
//         await redisClient.connect();
//         console.log('✅ Connected to Redis');
//     } catch (err) {
//         console.error('❌ Failed to connect to Redis:', err);
//     }
// })();

// export default redisClient;
