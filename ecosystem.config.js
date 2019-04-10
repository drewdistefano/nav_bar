module.exports = {
  apps: [{
    name: 'nav_bar',
    script: 'server/server_connection.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-19-70-44.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/targit.pem',
      ref: 'origin/master',
      repo: 'https://github.com/targitatx/nav_bar',
      path: '/home/ubuntu/Code/nav_bar/',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}