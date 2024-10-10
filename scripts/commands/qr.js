module.exports.config = {
	name: "🎂",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: " ",
  prefix: false, 
  category: "user", 
  usages: "text",
  cooldowns: 5,
  dependencies: {
		"qrcode": "",
		"fs-extra": ""
  }
};

module.exports.languages = {
	"vi": {
		"missingInput": "Hãy nhập đầu vào để có thể tạo qr code"
	},
	"en": {
		"missingInput": "আসসালামু আলাইকুম। সম্মানিত ভাই এবং বোন আপনাদের উদ্দেশ্যে আমরা একটা পার্টি এরেঞ্জ করেছি। সেটা হচ্ছে সবার প্রিয় আনিসার জন্মদিন। আর এই জন্মদিন উপলক্ষে কাল রাত 9 টায় সবাইকে কলে থাকার আমন্ত্রণ রইল এবং একটু গান একটু মজা অনেক অনেক ভালোবাসা নিয়ে আমরা আসবো আনিসার জন্মদিন উদযাপন করতে বন্ধুত্বের ক্যানভাস  গ্রুপের পক্ষ থেকে আপনাদের সবাইকে জানাচ্ছি শুভেচ্ছা ও ভালোবাসা❤️🥰🌺"
	}
}

module.exports.run = async function({ api, event, args, getText }) {
	const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"]
	const text = args.join(" ")
	if(!text) return api.sendMessage(getText("missingInput"),event.threadID);
	var opt = { errorCorrectionLevel: 'H', type: 'image/png', quality: 0.3, scale: 50, margin: 1, color:{ dark: '#000000', light: '#ffffff' } };
	 api.sendTypingIndicator(event.threadID, () => global.nodemodule["qrcode"].toFile(__dirname + '/cache/qr.png', text, opt, (err) => {
		if (err) return err;
		api.sendMessage({
			attachment: createReadStream(__dirname + '/cache/qr.png')
		},event.threadID, () => unlinkSync(__dirname + '/cache/qr.png'), event.messageID);
	}))
}
