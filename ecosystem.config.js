module.exports = {
  apps: [
    {
      name: 'revelsoft_backoffice',
      port: 5261,
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
