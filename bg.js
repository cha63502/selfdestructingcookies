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
	console.debug("Extracting domain from [" + url + "]");
	var re = new RegExp("^(?:.*://)?([\\d\\w\\.-]*)");
	var match = re.exec(url);
	console.debug("Matches: ", match);
	if (match)
		return match[1];
	else
		return null;
}

function removeCookie(cookie, index, array)
{

	var url;
	if (cookie.secure)
		url = "https://";
	else
		url = "http://";

	url += cookie.domain + cookie.path;

	console.debug("Removing cookie named: " + cookie.name + " URL: " + url);
	chrome.cookies.remove({"name": cookie.name,"url": url},function(details){
		if (!details)
		{
			console.error("Failed to remove cookie: "+cookie.name);
		} else
		{
			removeHostFromList(cookie.domain, hosts);
		}
	});
}

function checkCookiesAgainstTabs(cookieHosts, currentTabs)
{
	cookieHosts.forEach(function(storedDomain, index, array){
		var cookieDoesntHaveTab = true;
		var len = currentTabs.length;
		var i = 0;
		while (i < len &&cookieDoesntHaveTab)
		{
			if ((new RegExp(storedDomain)).test(currentTabs[i].url))
			{
				cookieDoesntHaveTab = false;
			}

			i++;
		}

		if (cookieDoesntHaveTab)
		{
			chrome.cookies.getAll({"domain":storedDomain}, function(cookies){
				if (cookies)
					cookies.forEach(removeCookie);
				else
					console.debug("No cookies for URL");
			});
		}
	});
}

function setupListeners() 
{
	// addHostToList(extractNetLoc("http://www.google.com/test"), hosts);
	chrome.cookies.onChanged.addListener(function(changeInfo){
		var added = !changeInfo.removed;

		if (added)
		{
			var cookie = changeInfo.cookie;
			addHostToList(cookie.domain, hosts);
		}
	});

	chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
		chrome.tabs.query({},function(tabs){
			checkCookiesAgainstTabs(hosts, tabs);
		});
	});
}

console.log("Adding listeners.");
setupListeners();
console.log("All listeners added.");
