import {BasicClient} from "./basicClient";
(async ()=>{

	const client = new BasicClient({baseURL: 'https://main-gpt-service-wszwgpjedk.us-west-1.fcapp.run'});
	const requestFn = client.createPost('/bridge/chatCompletion');
	const res = await requestFn({
		"messages":[
			{"role": "system", "content": "You are a helpful assistant."},
			{"role": "user", "content": "what values does css video object-fit has?"}
		],
		"temperature":1
	});
	console.log(res.data);
})()