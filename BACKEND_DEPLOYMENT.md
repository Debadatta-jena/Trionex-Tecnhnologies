# 🚀 **Backend Service Deployment Guide**

## ✅ **Service Configuration**

### **🔧 Recommended Settings**
```
Name: trionex-backend
Project: trionex-platform
Environment: postgresql
Language: Docker
Branch: main
Region: Oregon (US West)
Root Directory: backend
Instance Type: Free
```

---

## 📋 **Step-by-Step Setup**

### **1. Create Web Service**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `Debadatta-jena/Trionex-Tecnhnologies`

### **2. Configure Service Details**
```
Name: trionex-backend
Project: trionex-platform (create if doesn't exist)
Environment: postgresql
Language: Docker
Branch: main
Region: Oregon (US West)
Root Directory: backend
Instance Type: Free
```

### **3. Build Settings**
The service will automatically use your `backend/Dockerfile` and `backend/package.json`

### **4. Environment Variables**
Add these environment variables (copy from your `.env.render` file):

```env
NODE_ENV=production
PORT=10000
JWT_SECRET=your-generated-secret
JWT_REFRESH_SECRET=your-generated-secret
SESSION_SECRET=your-generated-secret
DATABASE_URL=postgresql://me:wmvRuDxrLXDawkAJ9gukVaJxfrUBTJhF@dpg-d6app52li9vc73e9c7ug-a/ai_solutions
FRONTEND_URL=https://trionex.onrender.com
CORS_ORIGIN=https://trionex.onrender.com
```

### **5. Deploy Service**
1. Click **"Create Web Service"**
2. Wait for deployment to complete (3-5 minutes)
3. Monitor the build logs

---

## 🔧 **Service Architecture**

### **Docker Configuration**
Your backend uses Docker with this setup:
- **Base Image**: Node.js with optimized layers
- **Build Process**: Multi-stage build for smaller images
- **Security**: Non-root user execution
- **Health Checks**: Built-in health monitoring

### **API Endpoints**
- **Health Check**: `/api/v1/health`
- **Authentication**: `/api/v1/auth/*`
- **Users**: `/api/v1/users/*`
- **Projects**: `/api/v1/projects/*`
- **Testimonials**: `/api/v1/testimonials/*`
- **Contact**: `/api/v1/contact`

---

## 🧪 **Post-Deployment Testing**

### **1. Health Check**
```bash
curl https://your-backend-url.onrender.com/api/v1/health
```

### **2. Database Connection Test**
```bash
curl https://your-backend-url.onrender.com/api/v1/users/count
```

### **3. Create Admin User**
```bash
# In Render service shell
cd backend && npm run seed-admin
```

---

## 📊 **Performance Specifications**

### **Free Instance**
- **RAM**: 512 MB
- **CPU**: 0.1 cores
- **Concurrent Requests**: Up to 100
- **Monthly Hours**: 750 (free tier limit)

### **Scaling Options**
- **Starter**: $7/month (better for production)
- **Standard**: $25/month (professional use)
- **Pro**: $85/month (enterprise-ready)

---

## 🔒 **Security Features**

### **Production Security**
- ✅ **HTTPS enforcement** (automatic)
- ✅ **SSL/TLS certificates** (Let's Encrypt)
- ✅ **CORS protection** configured
- ✅ **Environment variables** encrypted
- ✅ **Database SSL** required

### **Application Security**
- ✅ **JWT authentication** with httpOnly cookies
- ✅ **CSRF protection** implemented
- ✅ **Rate limiting** (100 requests/minute)
- ✅ **Input validation** and sanitization
- ✅ **SQL injection prevention**

---

## 📈 **Monitoring & Logs**

### **Render Dashboard Features**
- **Real-time logs** and error tracking
- **Performance metrics** and response times
- **Memory and CPU usage** monitoring
- **Request/response** statistics
- **Health check** status

### **Troubleshooting**
1. Check **Service Logs** for errors
2. Verify **Environment Variables** are set
3. Test **Database Connection** via health endpoint
4. Monitor **Resource Usage** for scaling needs

---

## 🚀 **Deployment Success Indicators**

✅ **Service Status**: "Live"  
✅ **Health Endpoint**: Returns 200 OK  
✅ **Database Connection**: Successful  
✅ **API Endpoints**: Respond correctly  
✅ **Frontend Connection**: CORS working  

---

## 📞 **Next Steps**

1. **Create the web service** with settings above
2. **Add environment variables** from `.env.render`
3. **Wait for deployment** to complete
4. **Test health endpoint** and database connection
5. **Create admin user** via seed script
6. **Connect frontend** to backend API

**Your backend service will be production-ready with full database connectivity!** 🚀

---

## 🚨 **Important Notes**

### **Free Tier Limits**
- **750 hours/month** free usage
- **Auto-sleep** after 15 minutes of inactivity
- **Wake-up time** ~30 seconds on first request

### **Environment Variables**
Make sure to copy ALL variables from `backend/.env.render` to prevent configuration issues.

### **Database Connection**
The backend will automatically:
- Connect to PostgreSQL database
- Run database migrations
- Create required tables
- Establish connection pooling

**Ready to deploy your backend service!** 🗄️
