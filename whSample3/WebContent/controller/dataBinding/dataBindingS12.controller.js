/**
*dataBindingS12.controller.js
*dataBinding S12 agregration binding etc.
*/
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/RouterBase",
               "sap/ui/model/json/JSONModel",
               "sap/m/library",
	           	"sap/ui/core/Locale",
	           	"sap/ui/core/LocaleData",
	           	"sap/ui/model/type/Currency"
               ]
				,function(Controller, RouterBase, JSONModel, mobileLibrary, Locale, LocaleData, Currency){
					"use strict";
					return Controller.extend("whSample3.controller.dataBinding.dataBindingS12",{
						//init
						onInit:function(){
							var oProductModel = new JSONModel();
							oProductModel.loadData("./resources/json/Product.json");
							this.getView().setModel(oProductModel, "products2");
							
						},
						/**
						 * format for the ObjectAttribute
						 */
						formatStockValue: function(fUnitPrice, iStockLevel, sCurrCode) {
							var sBrowserLocale = sap.ui.getCore().getConfiguration().getLanguage();console.log(sBrowserLocale)
							var oLocale = new Locale(sBrowserLocale); 
							var oLocaleData = new LocaleData(oLocale);
							var oCurrency = new Currency(oLocaleData.mData.currencyFormat);
							return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");

						},
						/**
						 * onItemSelected fired when one of the items of the ObjectListItem(products json mode instatiated by S8 page onInit)
						 */
						onItemSelected: function(oEvent){
							var oSelectedItem = oEvent.getSource();  
							var oContext = oSelectedItem.getBindingContext("products2"); 
							var sPath = oContext.getPath();
							var oProductDetailPanel = this.byId("productDetailsPanel");
							oProductDetailPanel.bindElement({ path: sPath, model: "products2" });

						},
						//nav back
						onNavBack: function(){
							RouterBase.onNavBack(this);

						}
					});
});