/**
 * dataBindingS8.controller.js
 */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/RouterBase",
               "sap/ui/model/json/JSONModel",
               "sap/m/library"
               ]
				, function(Controller, RouterBase, JSONModel, mobileLibrary){
					"use strict";
					return Controller.extend("whSample3.controller.dataBindingS8",{
						//init
						onInit: function(){
							//create the Json model for this view
							var oModel = new JSONModel({
								firstName: "Harry",
								lastName: "Hawk",
								enabled: true,
								address: {
									street: "Dietmar-Hopp-Allee 16",
									city: "Walldorf",
									zip: "69190",
									country: "Germany"
								},
								"salesToDate" : 12345.6789,
								"currencyCode" : "EUR",
								"priceThreshold": 15,
								emailBody:"Hello Colleagues,"
									+"I am the Critical Case Manager in MCC SEA. We notice that Petroliam Nasional Berhad (MY) reported this incident about 404 no extension found.  I just would like to summarize the current situation here and see if you need help to escalate further."
									+"Incident 92094 / 2019 / 404 no extension found"
									+"Status: Very High, Customer Action"
									+"#Management Summary:"
									+"#Business Impact: "
									+"#Current Status:"
									+"#Action Plan:"
							});
							//sap.ui.getCore().setModel(oModel, "dataBinding2");
							//this.getView().setModel(oModel, "dataBinding");
							this.getOwnerComponent().setModel(oModel, "dataBinding");
						},
						/**
						 * email format
						 */
						formatMail: function(sFirstName, sLastName) {
							var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();//this.getCore().getModel("i18n").getResourceBundle();
							return mobileLibrary.URLHelper.normalizeEmail(
								sFirstName + "." + sLastName + "@example.com",
								oBundle.getText("mailSubject", [sFirstName]),
								oBundle.getText("mailBody"));
						},
						/**
						 * send email to the CCM
						 */
						formatMailCCM: function(sSendTo, sSubject, sBody, sSendCC) {
							var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();//this.getCore().getModel("i18n").getResourceBundle();
							/*return mobileLibrary.URLHelper.normalizeEmail(
								sFirstName + "." + sLastName + "@example.com",
								oBundle.getText("mailSubject", [sFirstName]),
								oBundle.getText("mailBody")); */
							return mobileLibrary.URLHelper.normalizeEmail(sSendTo, sSubject, sBody, sSendCC);
						},
						/**
						 * onSuggest on the searchField
						 * to get the filter of customer and country
						 */
						onSuggest: function (event) {
							var value = event.getParameter("suggestValue");
							var filters = [];
							if (value) {
								filters = [
									new sap.ui.model.Filter([
										new sap.ui.model.Filter("Customer", function(sText) {
											return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
										}),
										new sap.ui.model.Filter("Country", function(sDes) {
											return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
										})
									], false)
								];
							}
							var oView = this.getView();
							this.oSF = oView.byId("searchCustomer");
							this.oSF.getBinding("suggestionItems").filter(filters);
							this.oSF.suggest();
						},
						/**
						 * onSearch is fired when the search is trigger
						 * the return data is shown to the simpleField
						 */
						onSearch: function(oE){  
							var item = oE.getParameter("suggestionItem"); 
							if (item) {
								sap.m.MessageToast.show("Search for: " + item.getText());
							} else {
								sap.m.MessageToast.show("Search is fired!");
							};
							// build filter array to list
							var aFilter = [];
							var sQuery = oE.getParameter("query");
							if (sQuery) {
								aFilter.push(new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.Contains, sQuery)); 
							};  

							// filter binding
							var oList = this.byId("searchCustomer");
							var oBinding = oList.getBinding("suggestionItems");
							var oSuggest=oBinding.filter(aFilter);  
							//var oSuggestValue=oSuggest.getParameters("suggestValue"); console.log(oSuggestValue)
						},
						/**
						 * fired when suggested item in input is selected
						 * the selected item will be filled in the following simple form
						 */
						onInputItemSelected: function(oEvent){
							var oSelectedItem = oEvent.getSource();
							var oContext = oSelectedItem.getBindingContext("email"); 
							var sPath = oContext.getPath();
							var oProductDetailPanel = this.byId("SimpleFormDisplay354wide_2");
							oProductDetailPanel.bindElement({ path: sPath, model: "email" });
						},
						/**
						 * fired when the list item is selected (in the email list)
						 * the data is binded to simpleform by using ElementBinding
						 */
						onEmailSelected: function(oEvent){
							var oSelectedItem = oEvent.getSource();  
							var oContext = oSelectedItem.getBindingContext("email"); 
							var sPath = oContext.getPath();
							var oProductDetailPanel = this.byId("SimpleFormDisplay354wide_2");
							oProductDetailPanel.bindElement({ path: sPath, model: "email" });
						},
						/**
						 * nav to the next page for the agregration binding
						 * page:dataBindingS12.view.xml
						 */
						onNextPage: function(){
							RouterBase.getRouter(this).navTo("dataBindingS12");
						},
						//nav back
						onNavBack: function(){
							RouterBase.onNavBack(this);

						}
					});
	
});