import { Resolver } from "dns/promises";
import mongoose from "mongoose";

const DEFAULT_DNS_SERVERS = ["8.8.8.8", "1.1.1.1"];

const parseDnsServers = () => {
  const configured = process.env.DNS_SERVERS || DEFAULT_DNS_SERVERS.join(",");
  return configured
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
};

const isSrvUri = (uri) => uri?.startsWith("mongodb+srv://");

const isSrvDnsFailure = (error) => {
  const text = String(error?.message || "").toLowerCase();
  return (
    text.includes("querysrv") ||
    text.includes("econnrefused") ||
    text.includes("enotfound") ||
    text.includes("eservfail") ||
    text.includes("dns")
  );
};

const mergeTxtOptions = (txtRows, searchParams) => {
  for (const txtRow of txtRows) {
    const rowText = txtRow.join("");
    if (!rowText) {
      continue;
    }

    const parsed = new URLSearchParams(rowText);
    for (const [key, value] of parsed.entries()) {
      if (!searchParams.has(key)) {
        searchParams.set(key, value);
      }
    }
  }
};

const buildStandardUriFromSrv = async (srvUri) => {
  const parsed = new URL(srvUri);
  const dnsServers = parseDnsServers();
  const resolver = new Resolver();
  resolver.setServers(dnsServers);

  const srvLookupName = `_mongodb._tcp.${parsed.host}`;
  const srvRecords = await resolver.resolveSrv(srvLookupName);

  if (!srvRecords.length) {
    throw new Error(`No SRV records returned for ${srvLookupName}`);
  }

  const txtRows = await resolver.resolveTxt(parsed.host).catch(() => []);
  const params = new URLSearchParams(parsed.searchParams);
  mergeTxtOptions(txtRows, params);

  if (!params.has("retryWrites")) {
    params.set("retryWrites", "true");
  }
  if (!params.has("w")) {
    params.set("w", "majority");
  }
  if (!params.has("tls")) {
    params.set("tls", "true");
  }

  const hosts = [...new Set(srvRecords.map((record) => `${record.name}:${record.port || 27017}`))].join(",");
  const dbName =
    parsed.pathname && parsed.pathname !== "/"
      ? parsed.pathname.slice(1)
      : process.env.MONGO_DB_NAME || "codementorai";

  const authPart = parsed.username
    ? `${parsed.username}${parsed.password ? `:${parsed.password}` : ""}@`
    : "";

  return {
    uri: `mongodb://${authPart}${hosts}/${dbName}?${params.toString()}`,
    dnsServers
  };
};

const connectWithMongoose = async (uri) => {
  mongoose.set("strictQuery", false);

  const connection = await mongoose.connect(uri, {
    family: 4,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 15000
  });

  return connection;
};

const attachConnectionEvents = () => {
  mongoose.connection.on("connected", () => {
    global.isMongoConnected = true;
  });

  mongoose.connection.on("disconnected", () => {
    global.isMongoConnected = false;
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("error", (error) => {
    global.isMongoConnected = false;
    console.error("MongoDB runtime error:", error.message);
  });
};

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  global.isMongoConnected = false;

  if (!mongoUri) {
    console.error("MongoDB URI missing. Set MONGO_URI or MONGODB_URI in backend .env");
    return;
  }

  attachConnectionEvents();

  try {
    const conn = await connectWithMongoose(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.name} @ ${conn.connection.host}`);
    return;
  } catch (primaryError) {
    console.error("MongoDB primary connection failed:", primaryError.message);

    if (!isSrvUri(mongoUri) || !isSrvDnsFailure(primaryError)) {
      return;
    }
  }

  try {
    const { uri: standardUri, dnsServers } = await buildStandardUriFromSrv(mongoUri);
    console.log(`Retrying MongoDB with standard URI via DNS servers: ${dnsServers.join(", ")}`);

    await mongoose.disconnect().catch(() => {});
    const conn = await connectWithMongoose(standardUri);
    console.log(`MongoDB connected with DNS fallback: ${conn.connection.name} @ ${conn.connection.host}`);
  } catch (fallbackError) {
    global.isMongoConnected = false;
    console.error("MongoDB DNS fallback failed:", fallbackError.message);
    console.error(
      "If this persists, add a non-SRV Mongo URI in MONGO_URI or use a stable DNS/VPN connection."
    );
  }
};

export default connectDB;
