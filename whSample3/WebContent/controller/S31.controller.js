/*
 *S31.controller.js  
*/
sap.ui.define([
               "sap/ui/core/mvc/Controller"
               ]
				,function(Controller){
				"use strict";
				return Controller.extend("whSample3.controller.S31", {
					
					//onPress of ok button
					okPress: function(oE){
						var oItem=oE.getSource();						
						var oUser={name:this.byId("userId").getValue(), password:this.byId("userPw").getValue()}; console.log(oUser)
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("S11",{
							userInfo: oUser
						});
					}
				});
});