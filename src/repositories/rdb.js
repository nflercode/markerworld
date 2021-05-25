import r from 'rethinkdb';

async function connect() {
  let connection;
  try {
    console.log('pw:', process.env.DB_PASSWORD);
    connection = await r.connect({ host: '10.245.135.3', port: 28015, db: 'nfler_db', password: process.env.DB_PASSWORD, user: 'admin' });
    console.log('Successfully connected to db');
  } catch (err) {
    console.error('Failed to connect to db', err);
    return;
  }

  r.dbList().contains('nfler_db').do(exists =>
    r.branch(
      exists,
      {created: 0},
      r.dbCreate('nfler_db')
    )
  ).run(connection, (err) => {
    if (err)
      console.log('FAILED TO CREATED DB', err);
    else
      console.log('Db created!');

    r.dbList().run(connection, (_, res) => {
      console.log(res);
    })
  });
}

export default { connect }