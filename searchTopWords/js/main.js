const api_url = 'http://norvig.com/big.txt';
window.onload = async function(){
	const finalWords = await getText(api_url);
	const formattedData = await getWord(finalWords);
	displayInTableFormat(formattedData);
}

function displayInTableFormat(data){
	document.getElementById("loader").style.WebkitAnimation = "";
	document.getElementById("loader").style.display = "none";
	let htmlContent = "";
	htmlContent += "<tr><th >WORDS</th><th>COUNT</th><th>SYNONYMS</th><th>POS</th></tr>";
	for(let key in data)
	{
		htmlContent += "<tr><td>"+key+"</td><td>"+data[key]["count"]+"</td><td style = 'text-align:left'>"+data[key]["syn"].join(",")+"</td><td style = 'text-align:left'>"+data[key]["pos"].join(",")+"</td></tr>";
	}
	$("#dataTab").append(htmlContent);
}



