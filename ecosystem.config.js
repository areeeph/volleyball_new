module.exports = {
  apps: [
    {
      name: "Volleyball Scoreboard",
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
    },
  ],
};
