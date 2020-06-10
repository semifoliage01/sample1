/*NotFound.controller.js
 * 
 * */
sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/core/UIComponent",
   "sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
   "use strict";
   return Controller.extend("whSample3.controller.NotFound", {
      onInit: function () {
      },
      //nav back
      onNavBack:function(){
    	  var oHistory =  History.getInstance(2);
			var sPreviousHash = oHistory.getPreviousHash();   

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("S11", {}, true);
			}
      }
   });
});