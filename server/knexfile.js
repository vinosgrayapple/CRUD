// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
             connection: {
                  host : 'localhost',
                  database : 'my_life',
                  user : 'postgres',
                  password : '1004797537'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
