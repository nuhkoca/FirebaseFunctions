const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.emojify =
	functions.database.ref('/messages/{pushId}/text')
	.onWrite(event => {
		if (!event.data.val() || event.data.previous.val()) {
			console.log("not a new write event");
			return;
		}

		console.log("emojifying!");

		const originalText = event.data.val();
		const emojifiedText = emojifyText(originalText);


		return event.data.ref.set(emojifiedText);
	});


function emojifyText(text) {
    var emojifiedText = text;
    emojifiedText = emojifiedText.replace(/\blol\b/ig, "😂");
    emojifiedText = emojifiedText.replace(/\bcat\b/ig, "😸");
    return emojifiedText;
}
