import thinky from 'thinky';
import { v4 as uuidv4 } from 'uuid';
import dbConfig from '../database/rdbConfig.js';
import playerRepository from './playerRepository.js';

const t = thinky(dbConfig);
const r = t.r;

const Table = t.createModel('Table', {
  id: t.type.string(),
  name: t.type.string().min(1),
  invitationToken: t.type.string(),
  createdAt: t.type.date().default(r.now()),
  createdAt: t.type.date()
});

Table.hasMany(playerRepository.Player, 'players', 'id', 'tableId');

async function addTable(name) {
  const newTable = new Table({
    name,
    invitationToken: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: null
  });

  return Table.save(newTable);
}

async function findTable(tableId) {
    return await Table.get(tableId).getJoin({ players: { avatar: true } }).run();
}

async function findTableByInvitationToken(invitationToken) {
  return Table.filter({ invitationToken }).getJoin({ players: true }).run().then(tables => tables[0]);
}

async function changeTableName(tableId, name) {
  return Table.get(tableId).update({ name }).run();
}

export default { addTable, findTable, findTableByInvitationToken, changeTableName }