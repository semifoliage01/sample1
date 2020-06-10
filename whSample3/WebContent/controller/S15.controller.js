sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/m/MessageToast"
               ]
				,function(Controller, MessageToast){
					"use strict";
					return Controller.extend("whSample3.controller.S15", {
						onShowHello : function () {
					         // read msg from i18n model
					         var oBundle = this.getView().getModel("i18n").getResourceBundle();
					         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
					         var sMsg = oBundle.getText("helloMsg", [sRecipient]);
					         // show message
					         MessageToast.show(sMsg);
					      },
					    onBack: function(){
					    	this.byId("whSample3").to(this.byId("S11"));
					    }
					});
	
});