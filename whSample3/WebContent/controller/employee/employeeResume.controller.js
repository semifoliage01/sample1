/*
 * employeeResume.controller.js
 * */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/RouterBase"
               ]
				,function(Controller, RouterBase){
					"use strict";
					return Controller.extend("whSample3.controller.employee.employeeResume",{
						//init
						onInit: function(){
							//bind the data
							var oRouter = RouterBase.getRouter(this);
							oRouter.getRoute("employeeResume").attachPatternMatched(this._onObjectMatched, this);
						},
						_onObjectMatched: function (oEvent) {
							//list the pattern 
							//console.log(oEvent.getParameter("arguments").invoicePath);
							
							//bind to view
							this.getView().bindElement({
								path: "resume>/Resumes/" + oEvent.getParameter("arguments").employeePath,
								model: "resume"
							});							 
						},
						//nav back
						onNavBack:function(){
							RouterBase.onNavBack(this);
						} 
					});
});