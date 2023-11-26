const D = require('discord.js');

module.exports - {
    name: 'ready',
    once: true,
    /**
     * 
     * @param {D.Client} client 
     */
    execute(client) {
        console.log('Bot is now online')
    }
}