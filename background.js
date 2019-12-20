var siteData;

chrome.webRequest.onBeforeRequest.addListener(
	function(info) {
		var siteData = JSON.parse("[" + localStorage.getItem("siteData") + "]").flat(1);
		if (localStorage["enabled"] === "false" || !siteData) {
			return;
		}
		for (var match in siteData) {
			var str = siteData[match];
			if (str !== "" && info.url.match(new RegExp(str))) {
				return {cancel: true};
			}
		}

		return;
	},
	{urls: ["http://*/*", "https://*/*"]},
	["blocking"]);
