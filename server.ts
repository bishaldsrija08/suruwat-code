import app = require("./src/app");
import envConfig = require("./src/config/envConfig");
import connectDB = require("./src/config/database");

const startServer = async (): Promise<void> => {
  await connectDB();

  const server = app.listen(envConfig.PORT, () => {
    console.log(`Server running on port ${envConfig.PORT}`);
  });

  server.on("error", (error: Error) => {
    console.error("Server failed to start:", error);
    process.exitCode = 1;
  });
};

void startServer().catch((error: unknown) => {
  console.error("Server startup failed:", error);
  process.exitCode = 1;
});