async function getWord(topWordsMap){
	const words = Array.from(topWordsMap.entries());
	console.log(topWordsMap);
	const output={};
	const results = await Promise.allSettled(words.map(([word,count]) => {
		output[word] = {
			"count":count,
			"syn":[],
			"pos":[]
		};
		return getData(word);
	}));

	results.map((result,index) => {
		const currentKey = words[index][0];
		if(result.status === 'fulfilled'){
			if(result.value["def"])
			{
				const dictionaryResult = parseJSONData(result.value["def"]);
				if(dictionaryResult["syn"]){
					output[currentKey]["syn"] = dictionaryResult["syn"];
				}
				if(dictionaryResult["pos"]){
					output[currentKey]["pos"] = dictionaryResult["pos"];
				}
			}
			return result.value;
		} else{
			alert("error getting data!");
		}
	});
	return output;
}
	

async function getData(key){
	console.log("inside async");
	const response = await fetch('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9&lang=en-en&text='+key); 
	return await response.json(); 
}

function parseJSONData(data){
	const result = data.reduce((acc,item) => {
		acc["syn"] = acc["syn"] || [];
		acc["pos"] = acc["pos"] || [];
		if(item["tr"]){
			item["tr"].map((trItem) => {
				if(trItem["syn"]){
					trItem["syn"].reduce((synAcc,synItem) => {
						acc["syn"].push(synItem["text"]);
						acc["pos"].push(synItem["pos"]);
						return synAcc;
					},[]);
				}			
			},[]);
		}
		return acc;
	},{});

	return result;	
}