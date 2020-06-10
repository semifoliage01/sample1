sap.ui.define([
               "sap/ui/core/mvc/Controller"
               ]
				,function(Controller){
					"use strict";
					return Controller.extend("whSample3.controller.fragment.header", {
						//back to main
						onBack: function(){
							   this.byId("whSample3").to(this.byId("S11"));
						   }
					});
});