const express = require('express');
const app = express();

app.use(express.json());

// endpoint per ricevere verifica
app.post('/verify-log', async (req, res) => {
  try {
    const { userId, username, ip } = req.body;

    const channel = await client.channels.fetch(process.env.LOG_CHANNEL);

    await channel.send({
      embeds: [
        {
          color: 0xcc0000,
          title: "✅ New User Verified",
          description:
            `👤 **User:** ${username}\n` +
            `🆔 **ID:** ${userId}\n` +
            `🌐 **IP:** ${ip}\n` +
            `📅 **Time:** <t:${Math.floor(Date.now()/1000)}:F>`
        }
      ]
    });

    res.sendStatus(200);

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// server interno bot
app.listen(4000, () => console.log("Bot API running on 4000"));