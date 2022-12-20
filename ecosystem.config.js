module.exports = {
  apps: [
    {
      name: "joonsmarket",
      script: "npm",
      args: "start",
      cwd: "./",
      exec_mode: "cluster",
      instances: 1,
      autorestart: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};
