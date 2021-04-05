// module.exports = {
//     consumer_key: '8eQAxrFFSZkZxBLg9CLqjBJ0S',  
//     consumer_secret: 'Na2SPf8N2lXXPf9FaczpxDNVYAPHWyIJ97XGs5HJgVGicddSWq',
//     access_token: '1375893337824055298-bX6BYfRJB6kOA0R3IIcSyKrLrT1cge',  
//     access_token_secret: 'IAqxD2FF6kErAw4QlcxYqmCfEju1hCjtJa3PbVIT09iQR'
//   }

module.exports = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
}