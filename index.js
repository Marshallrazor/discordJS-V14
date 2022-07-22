const {
Client,
GatewayIntentBits,
Partials,
} = require("discord.js");
const config = require("./config.js");
const token = config.token;

const client = new Client({
partials: [
Partials.Message, // for message
Partials.Channel, // for text channel
Partials.GuildMember, // for guild member
Partials.Reaction, // for message reaction
Partials.GuildScheduledEvent, // for guild events
Partials.User, // for discord user
Partials.ThreadMember, // for thread member
],
intents: [
GatewayIntentBits.Guilds, // for guild related things
GatewayIntentBits.GuildMembers, // for guild members related things
GatewayIntentBits.GuildBans, // for manage guild bans
GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
GatewayIntentBits.GuildIntegrations, // for discord Integrations
GatewayIntentBits.GuildWebhooks, // for discord webhooks
GatewayIntentBits.GuildInvites, // for guild invite managing
GatewayIntentBits.GuildVoiceStates, // for voice related things
GatewayIntentBits.GuildPresences, // for user presence things
GatewayIntentBits.GuildMessages, // for guild messages things
GatewayIntentBits.GuildMessageReactions, // for message reactions things
GatewayIntentBits.GuildMessageTyping, // for message typing things
GatewayIntentBits.DirectMessages, // for dm messages
GatewayIntentBits.DirectMessageReactions, // for dm message reaction
GatewayIntentBits.DirectMessageTyping, // for dm message typinh
GatewayIntentBits.MessageContent, // enable if you need message content things
],
});

module.exports = client;

fs.readdir("./events", (_err, files) => {
files.forEach((file) => {
if (!file.endsWith(".js")) return;
const event = require(`./events/${file}`);
let eventName = file.split(".")[0];
console.log(`👌 Loadded Event: ${eventName}`);
client.on(eventName, event.bind(null, client));
delete require.cache[require.resolve(`./events/${file}`)];
});
});

client.login(token); 
