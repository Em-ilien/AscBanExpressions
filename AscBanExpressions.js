registerPlugin({
    name: 'AscBanExpressions',
    version: '1.0',
    description: 'Cela sert à bannir des cancers sur TS automatiquement s\'ils écrivent certaines expressions bloquées.',
    author: 'Em_i <emiliencoss@gmail.com>',
    vars: [{
		name: "expressions",
		title: 'Configurations',
		type: 'array',
		vars: [{
			name: 'expression',
			indent: 1,
			title: 'Expression exacte',
            type: 'string',
            placeholder: "Je vais tous vous ddos"
		}, {
			name: 'reason',
			indent: 1,
			title: 'Motif de bannissement',
            type: 'string',
            placeholder: "[AUTO] Menace de ddos"
		}, {
			name: 'time',
			indent: 1,
			title: 'Durée de bannissement en minutes',
            type: 'number',
            placeholder: '10080'
        }]
    }]
}, function (_, config, meta) {
    var event = require('event');
    var engine = require('engine');
    const backend = require("backend");

    event.on('chat', function(ev) {
        const msg = ev.text;

        for (var j = 0; j < config.expressions.length; j++) {
            const expression = config.expressions[j];
            if (msg.includes(expression.expression)) {
                if (expression.time == undefined)
                    expression.time = 10080;
                ev.client.ban((expression.time*60), expression.reason);
            }
        }
    });
});