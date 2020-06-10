/*
 * oDataSample/oDataMain.controller.js
 * */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/RouterBase"
               ]
				,function(Controller, RouterBase){
					"use strict";
					return Controller.extend("whSample.controller.oDataSample.oDataMain", {
						//
						onInit: function(){
							
						},
						// nav back
						onNavBack:function(){
							RouterBase.onNavBack(this);
						} 
					});
});