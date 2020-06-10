/*
 * routerBase.js 
 */
sap.ui.define([ 
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function( History, UIComponent) {
	"use strict";

	return  {

		getRouter : function (that) {
			return UIComponent.getRouterFor(that);
		},

		onNavBack: function (that) {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				that.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		}

	};

});