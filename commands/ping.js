 module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		// Send a message
        const msg = message.channel.send(`🏓  Pinging....`);

        // Edit the message
        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`);
	},
};