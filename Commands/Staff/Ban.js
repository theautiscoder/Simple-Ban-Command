// Creating a simple ban command with formatted logging

const D = require('discord.js');

module.exports = {
    data: new D.SlashCommandBuilder()
    .setName('ban-a-mf')
    .setDescription('Ban someone from ur server')
    .addUserOption(option => 
        option
        .setName('target')
        .setDescription('Who are you banning')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('reason')
        .setDescription('Why ban them?')
    ),
    /**
     * 
     * @param {D.ChatInputCommandInteraction} interaction 
     * @param {D.Client} client 
     */
    async execute(interaction, client) {
        const User = interaction.options.getMember('target');
        const Reason = interaction.options.getString('reason') || 'No reason provided';

        if(!interaction.memberPermissions.has('BanMembers')) {
            interaction.reply({
                content: 'You cannot ban anyone as you do not have the correct permissions',
                ephemeral: true
            })
        }

        if(!User.bannable) {
            interaction.reply({
                content: 'This user cannot be banned',
                ephemeral: true
            })
        }

        User.ban({reason: Reason + ` - Banned By: ${interaction.member}`}).then(() => {
            interaction.reply({
                content: `<@${User.id}> was banned successfully.`,
                ephemeral: true
            })
        }).then(() => {
            interaction.guild.channels.cache.get('1178409940096913518').send({
                embeds: [new D.EmbedBuilder()
                    .setTimestamp()
                    .setTitle('NEW BAN')
                    .setFields(
                        {name: `User Banned:`, value: `<@${User.id}>`},
                        {name: `Ban Reason:`, value: `\`\`\`${Reason}\`\`\``},
                        {name: `User who issued ban:`, value: `${interaction.member}`}
                    )
                ]
            })
        })
    }
}