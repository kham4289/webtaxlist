module.exports = {
    apps: [
      {
        name: 'TAXLIST',                                            // set name
        script: 'node_modules/vite/bin/vite.js',
        args: 'preview --host 0.0.0.0 --port 7878',                 // set IP server and port website
        exec_mode: 'fork',
        instances: 1,
        interpreter: 'node',
        // cwd: 'D:/project/ProjectTPlus/React_js/Tplus_Taxlist',   // set path of project
      }
    ]
  }
   // run: pm2 start ecosystem.config.cjs