const { Telegraf } = require("telegraf");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { message } = require("telegraf/filters");
const { registration } = require("./reg.js");
const { dotenv } = require("dotenv").config();

const uri = process.env.URI
  

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let state;

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) =>
  ctx.reply("lets register!", {
    reply_markup: {
      keyboard: [[{ text: "/register" }]],
    },
  })
);

bot.command("register", async (ctx) => {
  state = "reg";
  registration(ctx, bot, state);
});

bot.launch();

module.exports = bot;
