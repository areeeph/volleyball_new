export default {
  apps: [
    {
      name: "volleyball",
      script: "npm",
      args: "start",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
      env_production: "production",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
