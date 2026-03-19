require('dotenv').config();

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');

const app = express();
app.use(express.json());

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`🤖 Bot online as ${client.user.tag}`);
});


// 🔥 ENDPOINT PER LOG
app.post('/verify-log', async (req, res) => {
  try {
    const { userId, username, ip } = req.body;

    const channel = await client.channels.fetch(process.env.LOG_CHANNEL);

    const embed = new EmbedBuilder()
      .setColor('#cc0000')
      .setTitle('✅ New User Verified')
      .setDescription(
        `👤 **User:** ${username}\n` +
        `🆔 **ID:** ${userId}\n` +
        `🌐 **IP:** ${ip}\n` +
        `📅 **Time:** <t:${Math.floor(Date.now()/1000)}:F>`
      )
      .setFooter({ text: 'Verification Logs' });

    await channel.send({ embeds: [embed] });

    res.sendStatus(200);

  } catch (err) {
    console.error("LOG ERROR:", err);
    res.sendStatus(500);
  }
});


// 🔥 TEST ROUTE
app.get('/', (req, res) => {
  res.send("Bot is running");
});


// 🔥 PORT FIX (IMPORTANTISSIMO)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 API running on ${PORT}`));


// 🔥 LOGIN BOT
client.login(process.env.TOKEN);
