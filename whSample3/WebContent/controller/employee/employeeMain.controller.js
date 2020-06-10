/*
 * controller/employee/employeeMain.controller.js
 */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/core/routing/History",
               "../model/RouterBase"
               ]
				,function(Controller, History, RouterBase){
					"use strict";
					var that=this;
					return Controller.extend("whSample3.controller.employee.employeeMain",{
						//init
						onInit: function(){
							//set value of the slider
							var oSlide=this.byId("slide");
							var oText=this.byId("slideText");
							oText.setText(oSlide.getValue())
						},
						
						//navi back
						onNavBack: function(){
							var oHistory, sPreviousHash;

							oHistory = History.getInstance();
							sPreviousHash = oHistory.getPreviousHash();
							if (sPreviousHash !== undefined) {
								window.history.go(-1);
							} else {
								this.getRouter().navTo("S11", {}, true /*no history*/);
							};

						},
						//nav to notFound
						onDisplayNotFound: function(){ 
								var oRouter=RouterBase.getRouter(this);
								oRouter.navTo("notFound");
								//RouterBase.onNavBack(that);
						},
						//nav to employeelist page
						onNavToEmployees: function(){
							RouterBase.getRouter(this).navTo("employeeList");
						},
						//click agree button and increase the value of slider
						onSlideChange: function(oE){ 
							var oSlider=this.byId("slide");
							var sValue=oSlider.getValue();
							var oText=this.byId("slideText")
							var oButtonId=oE.getSource().getId(); 
							if(oButtonId.indexOf("add")>0){
								oSlider.setValue(++sValue);
								oText.setText(sValue); 
							}else{
								oSlider.setValue(--sValue);  
								oText.setText(sValue)
							} 
						}
					});
});