sap.ui.define([]
				,function(){
					"use strict";
					return {
						//format the invoice status
						statusText: function (sStatus) {
							var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
							switch (sStatus) {
								case "A":
									return resourceBundle.getText("invoiceStatusA");
								case "B":
									return resourceBundle.getText("invoiceStatusB");
								case "C":
									return resourceBundle.getText("invoiceStatusC");
								default:
									return sStatus;
							}
						},
						//next  input value format 
						roundToMillion: function(fValue) {
							if (fValue) {
								return "> " + Math.floor(fValue/1000) + "K";
							}
							return "0";
						},
						//icon change in S20_1
						iconChange:function(oVal){
							return oVal>10 ? "sap-icon://status-positive":"sap-icon://status-negative";
						},
						//validate the zipcode
						zipcodeValidate: function(sVal){
							if(/^\d{6}&/.test(sVal)) return sVal;
							else throw new ValidateException("Zip code must have 5 digits!");
						}
					};
});