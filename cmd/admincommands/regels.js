const discord = require("discord.js");
//File server
const fs = require("fs");
//Setings of the addon
const regels = JSON.parse(fs.readFileSync(`./src/addons/regels.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    const options = [
        {
            label: `${regels.wel}`,
            value: `${regels.wel_roll}`,
            emoji: "✅"
        },
        {
            label: `${regels.niet}`,
            value: `${regels.niet_roll}`,
            emoji: "❌"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("regels-menu")
                .setMinValues(0) //Minimum keuzes
                .setMaxValues(1) //Maximum keuzes
                .setPlaceholder(regels.placholder)
                .addOptions(options)
        );

    var botEmbed = new discord.MessageEmbed()
        .setTitle(regels.placholder)
        .setDescription(regels.discription)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("regelgeving command")

    return message.channel.send({ embeds: [botEmbed], components: [row] }).then(msg => {
        message.delete()
    });

}

module.exports.help = {
    name: "regels",
    category: "admin",
    discription: "Dist is an example code for game roll menu."
}