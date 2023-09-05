 module.exports = {
    apps: [
        {
            name: 'TAXLIST',
            exec_mode: 'cluster',
            interpreter: "none",
            instances: '1', // Or a number of instances
            script: 'npm',
            args: 'run dev',
            // max_memory_restart: "500M"
        },
    ],
}
