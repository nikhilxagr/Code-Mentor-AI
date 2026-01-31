import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set strictQuery option
    mongoose.set('strictQuery', false);
    
    // Try to connect with DNS resolution workaround
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increased timeout
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4
      directConnection: false,
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}\n`);
    
    // Set global variable to track connection status
    global.isMongoConnected = true;
    
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(`Error: ${error.message}\n`);
    
    global.isMongoConnected = false;
    
    // Provide specific troubleshooting based on error
    if (error.message.includes('ECONNREFUSED') || error.message.includes('querySrv')) {
      console.log("🔧 DNS Resolution Issue Detected!");
      console.log("\n📋 SOLUTION OPTIONS:\n");
      console.log("Option 1 - Get Standard Connection String (RECOMMENDED):");
      console.log("   1. Go to MongoDB Atlas → Database → Connect");
      console.log("   2. Choose 'Connect your application'");
      console.log("   3. Select 'mongodb' (not mongodb+srv)");
      console.log("   4. Copy the standard connection string format");
      console.log("   5. Update MONGO_URI in .env file\n");
      
      console.log("Option 2 - Use Local MongoDB:");
      console.log("   1. Install MongoDB locally");
      console.log("   2. Update MONGO_URI to: mongodb://localhost:27017/codementorai\n");
      
      console.log("Option 3 - Network Troubleshooting:");
      console.log("   • Disable VPN/Proxy temporarily");
      console.log("   • Try different network/mobile hotspot");
      console.log("   • Check firewall settings");
      console.log("   • Flush DNS: ipconfig /flushdns\n");
    }
    
    console.log("⚠️  Server running in OFFLINE MODE\n");
    console.log("💡 You can still test the UI, but auth won't work without MongoDB\n");
  }
};

export default connectDB;
