const createTableWithAuthPayload = (table, players, authToken, refreshToken) => ({
  table: {
    ...table,
    players,
  },
  authToken: {
    ...authToken,
    expiresAt: authToken.expiresAt.toISOString()
  },
  refreshToken: {
    ...refreshToken,
    expiresAt: refreshToken.expiresAt.toISOString()
  }
});

const createTableWithPlayersPayload = (table, players) => ({
  ...table,
  players
});

const createTablePayload = (table) => ({
  ...table
});

export {
  createTableWithAuthPayload,
  createTableWithPlayersPayload,
  createTablePayload
}