function registration(ctx, bot, state) {
  ctx.reply("Whats your full name?", {
    reply_markup: {
      remove_keyboard: true,
    },
  });

  if (state == "reg") {
    bot.on("text", async (ctx) => {
      const name = ctx.message.text;
      ctx.reply(`Welcome, ${name}! You are now registered.`);
    });
  }
}

module.exports = { registration };
