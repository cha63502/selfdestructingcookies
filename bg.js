var storage = chrome.storage.local;
var hosts = [];

function addHostToList(host, list)
{
	if (0 > list.indexOf(host))
	{
		var prePushLen = list.length;
		if (list.push(host) > prePushLen)
		{
			console.log("added " + host);
		} else
		{
			console.warning("Failed to add " + host);
		}

	}

}

function removeHostFromList(host, list)
{
	var index = list.indexOf(host);
	if (index >= 0)
	{
		list.splice(index, 1);
	}
}

function extractNetLoc(url)
{
	var re = new RegExp("^.*://([\\d\\w\\.-]+\\.[a-z]{2,6})");
	var match = re.exec(url);
	return match[1];
}

function setupListeners() 
{
	addHostToList(extractNetLoc("http://www.google.com/test"), hosts);
	console.log(hosts);
}

console.log("Adding listeners.");
setupListeners();
console.log("All listeners added.");
