import Redis, { Redis as RedisType } from 'ioredis';

const redisClient = new Redis({
  host: '127.0.0.1', // or the Docker container hostname
  port: 6379, // default Redis port
});


redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

export default redisClient;

