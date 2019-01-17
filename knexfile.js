// Update with your config settings.
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './lambda1.sqlite3'
    },
    useNullAsDefault: true
  }
};
