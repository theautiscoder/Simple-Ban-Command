const D = require('discord.js');

const {
    GuildBans, Guilds, GuildMembers, GuildMessageReactions, GuildPresences, GuildVoiceStates, MessageContent, GuildWebhooks
} = D.GatewayIntentBits;

const {
    User, Message, GuildMember, ThreadMember
} = D.Partials;

const client = new D.Client({
    intents: [GuildBans, Guilds, GuildMembers, GuildMessageReactions, GuildPresences, GuildVoiceStates, MessageContent, GuildWebhooks],
    partials: [User, Message, GuildMember, ThreadMember]
});

client.config = require('./config.json')
client.commands = new D.Collection()

const { loadEvents } = require('./Handlers/eventHandler')
const { loadCommands } = require('./Handlers/commandHandler')

client.login(client.config.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
}).catch(console.error)