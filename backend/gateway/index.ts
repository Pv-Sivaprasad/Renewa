import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors()); 


const targets = {
  userService: process.env.USER_SERVICE_URL,
  adminService: process.env.ADMIN_SERVICE_URL,
  doctorService: process.env.DOCTOR_SERVICE_URL
};


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


const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
