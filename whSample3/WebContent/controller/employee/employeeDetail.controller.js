/*
 * employeeDetail.controller.js
 * */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/RouterBase",
               "sap/m/MessageToast"
               ]
				,function(Controller, RouterBase, MessageToast){
					"use strict";
					return Controller.extend("whSample3.controller.employee.employeeDetail",{
						onInit: function(){
							//bind the data
							var oRouter = RouterBase.getRouter(this);
							oRouter.getRoute("employeeDetail").attachPatternMatched(this._onObjectMatched, this);
							
						},
						_onObjectMatched: function (oEvent) {
							//list the pattern 
							//console.log(oEvent.getParameter("arguments").invoicePath);
							
							//bind to view
							this.getView().bindElement({
								path: "employees>/Employees/" + oEvent.getParameter("arguments").employeePath,
								model: "employess"
							});							 
						},
						//nav to Resume page
						onShowEmployeeResume:function(oE){ 
							console.log(  this.getView().getElementBinding().getBoundContext())
							var oItem=oE.getSource(); console.log(oItem.getBindingContext("employees").getPath())
							RouterBase.getRouter(this).navTo("employeeResume",{
									employeePath: oItem.getBindingContext("employees").getPath().substr(11)});
						},
						//nav back
						onNavBack:function(){
							RouterBase.onNavBack(this);
						},
						/**
						 * fired when the setting button is changed 
						 * to enable save and cancel button and disable the setting button 
						 */
						onChange:function(){
							this._setUIChanges(true)
						},
						/**
						 * save the change of the input field 
						 * to check whether the Json can be changed
						 */
						onSave:function(){
							this.getView().getModel().setData();
							this._setUIChanges(false);
						},
						/**
						 *cancel the change 
						 *the save and cancel button are disable and setting button is enabled 
						 */
						onCancel:function(){
							this.getView().getBinding("items").refresh();
							this._setUIChanges(false);
						},
						/**
						 * fired when the input is changed 
						 * the toolbar of the simpleform is shown
						 */
						onInputChange:function(){
							this._setUIChanges(true);
						},
						/**
						 * set the uiInputChange 
						 * the save and cancel button will show, but the setting button is hidden
						 */
						_setUIChanges : function (bHasUIChanges) {
							/*if (this._bTechnicalErrors) {
								// If there is currently a technical error, then force 'true'.
								bHasUIChanges = true;
							} else if (bHasUIChanges === undefined) {
								bHasUIChanges = this.getView().getModel().hasPendingChanges();
							}*/
							var oModel = this.getView().getModel("view");
							oModel.setProperty("/currencys/hasUIChanges", bHasUIChanges);
						}
					});
});