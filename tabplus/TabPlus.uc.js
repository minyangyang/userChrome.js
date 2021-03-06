// ==UserScript==
// @description  Tab Plus 
// @include      chrome://browser/content/browser.xul
// ==/UserScript==

(function() {
    /*open bookmark/history in new tab */
    try {
  	var str = openLinkIn.toString();
		  str = str.replace('w.gBrowser.selectedTab.pinned',
	        '(!w.isTabEmpty(w.gBrowser.selectedTab) || $&)');
		  str = str.replace(/&&\s+w\.gBrowser\.currentURI\.host != uriObj\.host/,'');
		  eval("openLinkIn = " + str);
    }catch(e){}
	
	/*open bookmarklets on the page*/
eval("openUILinkIn = " + openUILinkIn.toString()
  .replace(/(?=if \(where == "save"\))/, 'if (url.match(/^javascript:/)) where = "current";')
);

    /*open url in new tab */
    try {
		location=="chrome://browser/content/browser.xul"&&eval("gURLBar.handleCommand="+gURLBar.handleCommand.toString().replace(/^\s*(load.+);/gm,"/^javascript:/.test(url)||content.location=='about:blank'?$1:gBrowser.loadOneTab(url, {postData: postData, inBackground: false, allowThirdPartyFixup: true});"))
    }catch(e){}

    /*open home in new tab  */
    try {
        eval("BrowserGoHome = " + BrowserGoHome.toString().replace(
            /switch \(where\) {/, "where = (gBrowser.currentURI.spec!="
            +"'about:blank' || gBrowser.webProgress.isLoadingDocument"+
            ") ? 'tab' : 'current'; $&")); 
    }catch(e){}

    /*open search in new tab*/
    try {
        var searchbar = document.getElementById("searchbar");
        eval("searchbar.handleSearchCommand="+searchbar.handleSearchCommand.
            toString().replace(/this.doSearch\(textValue, where\);/,
            "if (!gBrowser.webProgress.isLoadingDocument && gBrowser.curren"
            +"tURI.spec=='about:blank') where='current'; else where='tab'; "
            +"$&"));
    }catch(e){}

})();
 
 /*open page in the blank */
function _LoadURL(aTriggeringEvent, aPostData)
{
    var where = (gBrowser.currentURI.spec!='about:blank' ||
        gBrowser.webProgress.isLoadingDocument) ? 'tab' :
        'current';
    if (gURLBar.value!='') openUILinkIn(gURLBar.value, where);
    return true;
}

 /*close tab on double click */ 
gBrowser.mTabContainer.addEventListener('dblclick', function (event){
	if (event.target.localName == 'tab' && event.button == 0){
		document.getElementById('cmd_close').doCommand();
	}
}, false);

/* Drag n Go */
eval("handleDroppedLink = " + handleDroppedLink.toString()
  .replace('url.indexOf(" ", 0) != -1 ||', "")
  .replace(/.*loadURI.*/, "try {openNewTabWith(uri, arguments[0].target.ownerDocument, postData.value, null, false);} catch (e) {BrowserSearch.loadSearch(url, true);}")
);
gBrowser.mPanelContainer.setAttribute("ondragover", "browserDragAndDrop.dragOver(event);");