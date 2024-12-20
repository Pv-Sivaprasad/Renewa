import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser'
import logger from './logger';
import morgan from 'morgan';
dotenv.config();



const app = express();
const targets = {
  userService: process.env.USER_SERVICE_URL,
  adminService: process.env.ADMIN_SERVICE_URL,
  doctorService: process.env.DOCTOR_SERVICE_URL
};
const morganFormat = ":method :url :status :response-time ms";


app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
})); 

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


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













// import express from 'express';
// import cors from 'cors';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import dotenv from 'dotenv';
// import cookieparser from 'cookie-parser'



// const app = express();
// dotenv.config();
// app.use(cookieparser())
// app.use(express.urlencoded({extended:true}))


// app.use(cors({
//   origin:'http://localhost:5173',
//   credentials:true
// })); 

// const targets = {
//   userService: process.env.USER_SERVICE_URL,
//   adminService: process.env.ADMIN_SERVICE_URL,
//   doctorService: process.env.DOCTOR_SERVICE_URL
// };



// app.use(
//   '/user',
//   createProxyMiddleware({
//     target: targets.userService,
//     changeOrigin: true,
//     pathRewrite: {
//       '^/user': '/', 
//     }
//   })
// );


// app.use(
//   '/admin',
//   createProxyMiddleware({
//     target: targets.adminService,
//     changeOrigin: true,
//     pathRewrite: {
//       '^/admin': '/', 
//     }
//   })
// );


// app.use(
//   '/doctor',
//   createProxyMiddleware({
//     target: targets.doctorService,
//     changeOrigin: true,
//     pathRewrite: {
//       '^/doctor': '/', 
//     }
//   })
// );


// const PORT = process.env.PORT ;
// app.listen(PORT, () => {
//   console.log(`API Gateway is running on port ${PORT}`);
// });
