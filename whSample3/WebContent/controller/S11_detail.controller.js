/*
 * S11_detail.controller.js
 * */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/core/UIComponent",
               "sap/ui/core/routing/History",
               "sap/m/MessageToast"
               ]
				,function(Controller, UIComponent ,History, MessageToast){
					"use strict";
					return Controller.extend("whSample3.controller.S11_detail",{
						//
						onInit: function () {
							var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
							oRouter.getRoute("S11DetailPage").attachPatternMatched(this._onObjectMatched, this);
						},
						onAfterRendering: function(oEvent){  
							this.byId("objectHeader").setNumber("90");
						},
						_onObjectMatched: function (oEvent) {
							//list the pattern 
							//console.log(oEvent.getParameter("arguments").invoicePath);
							//reset ProductRater
							this.byId("rating").reset();
							//bind to view
							this.getView().bindElement({
								path: "invoice>/Invoices/" + oEvent.getParameter("arguments").invoicePath,
								model: "invoice"
							});							 
						},
						//show product rator message 
						onRatingChange: function (oEvent) {
							var fValue = oEvent.getParameter("value");  
							var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

							MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
						},
						//navigate back to previous
						onNavBack: function () {
							var oHistory =  History.getInstance(2);
							var sPreviousHash = oHistory.getPreviousHash();  

							if (sPreviousHash !== undefined) {
								window.history.go(-1);
							} else {
								var oRouter = UIComponent.getRouterFor(this);
								oRouter.navTo("overview", {}, true);
							}
						}
						
					});
					
});