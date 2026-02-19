# 🗄️ **PostgreSQL Database Setup Guide**

## 📋 **Database Creation Settings**

### **🔧 Recommended Settings**
```
Name: trionex-db
Project: trionex-platform
Environment: postgresql
Database: ai_solutions
User: postgres
Region: Oregon (US West)
PostgreSQL Version: 18
Plan: Free
Storage: 1 GB
Storage Autoscaling: Disabled
High Availability: Disabled
```

---

## 🚀 **Step-by-Step Setup**

### **1. Create PostgreSQL Database**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Fill in the details:
   - **Name**: `trionex-db`
   - **Project**: Select your project or create "trionex-platform"
   - **Environment**: `postgresql`
   - **Database**: `ai_solutions`
   - **User**: `postgres`
   - **Region**: `Oregon (US West)`
   - **Version**: `18`
   - **Plan**: `Free`
   - **Storage**: `1 GB`

4. Click **"Create Database"**

### **2. Wait for Database Creation**
- Database creation takes **2-3 minutes**
- Status will show **"Available"** when ready
- **DO NOT** click away during creation

### **3. Get Connection Details**
After creation, go to database dashboard and copy:
- **Internal Connection String**
- **External Connection String**
- **Host, Port, Username, Password**

---

## 🔧 **Update Environment Variables**

### **Backend Environment Variables**
```env
# Update your .env file with the actual database URL
DATABASE_URL=postgresql://postgres:your_password@your_host:5432/ai_solutions
```

### **Frontend Environment Variables**
```env
# Frontend doesn't need direct database access
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

---

## 🗄️ **Database Schema Setup**

### **Automatic Migration**
When you deploy the backend, TypeORM will automatically:
1. **Create tables** from entity definitions
2. **Set up relationships** between tables
3. **Create indexes** for performance
4. **Apply constraints** and validations

### **Manual Schema Setup** (Optional)
If you need to seed initial data:

```bash
# Connect to your Render database
psql "your-connection-string"

# Run the seed script
\i create-admin.sql
```

---

## 🔗 **Connect Backend to Database**

### **1. Update Render Backend Service**
1. Go to your backend service in Render
2. **Environment** tab
3. Add/Update environment variable:
   ```
   DATABASE_URL=postgresql://postgres:your_actual_password@your_actual_host:5432/ai_solutions
   ```

### **2. Redeploy Backend**
1. **Manual Deploy** → **Deploy latest commit**
2. Monitor logs for database connection success
3. Check health endpoint: `/api/v1/health`

---

## 🧪 **Test Database Connection**

### **Health Check Endpoint**
Your backend has a health check that tests database connection:
```bash
curl https://your-backend-url.onrender.com/api/v1/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

### **Test API Endpoints**
```bash
# Test user registration
curl -X POST https://your-backend-url.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890","password":"password123"}'

# Test contact form
curl -X POST https://your-backend-url.onrender.com/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

---

## 📊 **Database Monitoring**

### **Render Dashboard Features**
- **Connection count** and usage
- **Storage utilization** and growth
- **Query performance** metrics
- **Backup status** and history

### **Performance Tips**
- **Free Plan**: Up to 100 connections
- **Storage**: Monitor usage regularly
- **Backups**: Automatic daily backups included
- **Scaling**: Upgrade plan when needed

---

## 🔒 **Security Considerations**

### **Database Security**
- ✅ **SSL/TLS encryption** enforced
- ✅ **Private networking** within region
- ✅ **Automated backups** with encryption
- ✅ **Access control** via connection strings
- ✅ **IP whitelisting** (if needed)

### **Application Security**
- ✅ **Prepared statements** prevent SQL injection
- ✅ **Input validation** via class-validator
- ✅ **Password hashing** with bcrypt
- ✅ **JWT authentication** with httpOnly cookies
- ✅ **Rate limiting** and DDoS protection

---

## 🚨 **Common Issues & Solutions**

### **Connection Refused**
```
Error: Connection refused
```
**Solution**: Check DATABASE_URL format and credentials

### **Database Does Not Exist**
```
Error: database "ai_solutions" does not exist
```
**Solution**: Verify database name in connection string

### **Authentication Failed**
```
Error: authentication failed for user "postgres"
```
**Solution**: Check password in connection string

### **SSL Connection Error**
```
Error: SSL connection is required
```
**Solution**: Ensure SSL mode is enabled in connection string

---

## 📈 **Scaling Strategy**

### **Free Plan Limitations**
- 256 MB RAM, 0.1 CPU
- 1 GB storage
- Basic monitoring
- Community support

### **Upgrade Path**
- **Basic Plan**: $6/month + storage costs
- **Pro Plan**: $55/month + storage costs
- **Accelerated**: $160/month + storage costs

### **Scaling Triggers**
- High connection count (>50)
- Storage usage >80%
- Slow query performance
- High memory usage

---

## 🎯 **Next Steps**

1. **Create Database** in Render dashboard
2. **Update Environment Variables** in backend service
3. **Deploy Backend** with new database connection
4. **Test API Endpoints** for functionality
5. **Monitor Performance** and usage

**Your PostgreSQL database will be ready for production use!** 🗄️
