/*
 * employeeList.controller.js
 * */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/RouterBase"
               ]
				,function(Controller, RouterBase){
					"use strict";
					return Controller.extend("whSample3.controller.employee.employeeList",{
						onInit: function(){
							
						},
						//nav back
						onNavBack:function(){
							RouterBase.onNavBack(this);
						},
						//nav to EmployeeDetail
						onPressEmployeeDetail:function(oE){
							var oItem=oE.getSource(); 
							RouterBase.getRouter(this).navTo("employeeDetail",{
									employeePath: oItem.getBindingContext("employees").getPath().substr(11)});
						}
					});
});