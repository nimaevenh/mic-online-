const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

const CHANNEL_ID = 'YOUR_VOICE_CHANNEL_ID';
const GUILD_ID = 'YOUR_GUILD_ID';

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  updateVoiceChannelCount();
  updateMemberCount();

  setInterval(updateVoiceChannelCount, 10000);
  setInterval(updateMemberCount, 10000);
});

client.on('voiceStateUpdate', updateVoiceChannelCount);

async function updateVoiceChannelCount() {
  const channel = await client.channels.fetch(CHANNEL_ID);
  if (channel && channel.isVoice()) {
    const memberCount = channel.members.size;
    client.user.setUsername(`Users: ${memberCount}`);
  }
}

async function updateMemberCount() {
  const guild = await client.guilds.fetch(GUILD_ID);
  const memberCount = guild.memberCount;
  client.user.setActivity(`members: ${memberCount}`, { type: 'WATCHING' });
}

client.login(process.env.TOKEN);
