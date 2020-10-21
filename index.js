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
  const member = await message.member.roles.add('767710436480778270'); // TODO: change to member role in production discord

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
        member.roles.add('766274375921696798');
        break;
      case '🟢':
        member.roles.add('766274351573893143');
        break;
      case '🟠':
        member.roles.add('767449505477820417');
        break;
      case '🔵':
        member.roles.add('766661134602207232');
        break;
      case '🟣':
        member.roles.add('766593195714805771');
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
        member.roles.remove('766274375921696798');
        break;
      case '🟢':
        member.roles.remove('766274351573893143');
        break;
      case '🟠':
        member.roles.remove('767449505477820417');
        break;
      case '🔵':
        member.roles.remove('766661134602207232');
        break;
      case '🟣':
        member.roles.remove('766593195714805771');
        break;
    }
  }
});
