var storage = chrome.storage.local;
var hosts = [];

function addHostToList(host, list)
{
	if (0 > list.indexOf(host))
	{
		list.push(host);
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

function setupListeners() 
{
	addUrlToList("http://google.com");
}

console.log("Adding listeners.");
setupListeners();
console.log("All listeners added.");
