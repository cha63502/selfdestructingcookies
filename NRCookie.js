

function NRCookie(cookie) 
{
	Cookie.call(this);
	this.cookie = cookie;
	this.tabs = [];
}


NRCookie.prototype.addTab = function(tab)
{
	if (0 > this.tabs.indexOf(tab.id))
	{
		this.tabs.push(tab.id);
	}
};

NRCookie.prototype.removeTab = function(tab)
{
	var index = this.tabs.indexOf(tab.id);
	if (index >= 0)
	{
		this.tabs.splice(index, 1);
	}

	return this.tabs.length;
};