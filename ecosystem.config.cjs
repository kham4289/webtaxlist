module.exports = {
    apps: [
      {
        name: 'TAXLIST',
        script: 'node_modules/vite/bin/vite.js',
        args: 'preview --port 7878 --host',
        exec_mode: 'fork',
        instances: 1,
        interpreter: 'node',
      }
    ]
  }
  