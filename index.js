require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client({
  partials: ['MESSAGE', 'REACTION'],
});

// Bot login
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Add role to user after introduction
client.on('message', async (message) => {
  // return if message isn't send in introduce-yourself channel
  if (message.channel.name !== '👋introduce-yourself') return;

  // return if users is already a member
  if (message.member._roles.length > 0) return;

  // add member role
  const member = await message.member.roles.add('767719049168945212'); // TODO: change to member role in production discord

  console.log(`New member: ${member.user.username}`);
});

// role selector
client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.message.channel.name !== '✅choose-role') return;

  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  // get id of message to add role reactions
  const firstMessage = await reaction.message.channel.messages.fetch({
    after: 0,
    limit: 1,
  });
  const firstMsgId = firstMessage.first().id;

  if (reaction.message.id === firstMsgId) {
    switch (name) {
      case '🔴':
        member.roles.add('767384522341482516');
        break;
      case '🟢':
        member.roles.add('767367132249063454');
        break;
      case '🟠':
        member.roles.add('767731817871704064');
        break;
      case '🔵':
        member.roles.add('767730132139245610');
        break;
      case '🟣':
        member.roles.add('767730135272390709');
        break;
    }
  }
});

// role remover
client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.channel.name !== '✅choose-role') return;

  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  // get id of message to add role reactions
  const firstMessage = await reaction.message.channel.messages.fetch({
    after: 0,
    limit: 1,
  });
  const firstMsgId = firstMessage.first().id;

  if (reaction.message.id === firstMsgId) {
    switch (name) {
      case '🔴':
        member.roles.remove('767384522341482516');
        break;
      case '🟢':
        member.roles.remove('767367132249063454');
        break;
      case '🟠':
        member.roles.remove('767731817871704064');
        break;
      case '🔵':
        member.roles.remove('767730132139245610');
        break;
      case '🟣':
        member.roles.remove('767730135272390709');
        break;
    }
  }
});
