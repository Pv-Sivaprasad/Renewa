import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser'
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import rateLimit from 'express-rate-limit';
import path from 'path'
import cookieParser from 'cookie-parser';



dotenv.config();



const app = express();

const accessLogStream = createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'logs') 
});

app.use(morgan('combined',{stream:accessLogStream}))
const limiter = rateLimit({
  windowMs:15*60*1000,
  max:100,
  message:'Too much requests, please try again later'
})

const targets = {
  userService: process.env.USER_SERVICE_URL,
  adminService: process.env.ADMIN_SERVICE_URL,
  doctorService: process.env.DOCTOR_SERVICE_URL,
  paymentService: process.env.PAYMENT_SERVICE_URL

};


app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
})); 



app.use(
  '/user',
  createProxyMiddleware({
    target: targets.userService,
    changeOrigin: true,
    pathRewrite: {
      '^/user': '/', 
    }
  })
);


app.use(
  '/admin',
  createProxyMiddleware({
    target: targets.adminService,
    changeOrigin: true,
    pathRewrite: {
      '^/admin': '/', 
    }
  })
);


app.use(
  '/doctor',
  createProxyMiddleware({
    target: targets.doctorService,
    changeOrigin: true,
    pathRewrite: {
      '^/doctor': '/', 
    }
  })
);
app.use(
  '/payment',
  createProxyMiddleware({
    target: targets.paymentService,
    changeOrigin: true,
    pathRewrite: {
      '^/payment': '/', 
    }
  })
);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
