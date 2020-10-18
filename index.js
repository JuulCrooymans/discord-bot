const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

// Bot login
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Add role to user after introduction
client.on('message', (message) => {
  // return if message isn't send in introduce-yourself channel
  if (message.channel.name !== '👋introduce-yourself') return;

  const hashtags = [
    '#development',
    '#design',
    '#ux-ui',
    '#film',
    '#photography',
    '#marketing',
    '#vr-ar',
  ];

  const lowerCaseMessage = message.content.toLocaleLowerCase();
  const messageArray = lowerCaseMessage.split(' ');
  const userHashtags = messageArray.filter((word) => hashtags.includes(word)); // filter for user hashtags

  if (userHashtags.length > 0) {
    message.guild.roles.cache.forEach((role) => role.delete());
  }

  userHashtags.forEach((hashtag) => {
    const role = hashtag.replace('#', ''); // remove #
    const discordRole = message.guild.roles.cache.find(
      (discordRole) => discordRole.name === role
    );

    if (
      !message.member._roles.some(
        (memberRole) => memberRole.id === discordRole.id
      )
    ) {
      message.member.roles
        .add(discordRole.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// Add role to user after introduction edit
client.on('messageUpdate', (oldMessage, message) => {
  // return if message isn't send in introduce-yourself channel
  if (message.channel.name !== '👋introduce-yourself') return;

  const hashtags = [
    '#development',
    '#design',
    '#ux-ui',
    '#film',
    '#photography',
    '#marketing',
    '#vr-ar',
  ];

  const lowerCaseMessage = message.content.toLocaleLowerCase();
  const messageArray = lowerCaseMessage.split(' ');
  const userHashtags = messageArray.filter((word) => hashtags.includes(word)); // filter for user hashtags

  if (userHashtags.length > 0) {
    message.guild.roles.cache.forEach((role) => role.delete());
  }

  userHashtags.forEach((hashtag) => {
    const role = hashtag.replace('#', ''); // remove #
    const discordRole = message.guild.roles.cache.find(
      (discordRole) => discordRole.name === role
    );

    if (
      !message.member._roles.some(
        (memberRole) => memberRole.id === discordRole.id
      )
    ) {
      message.member.roles
        .add(discordRole.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
