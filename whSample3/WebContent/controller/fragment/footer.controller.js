sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/core/Fragment"
               ]
				,function(Controller, Fragment){
					"use strict";
					return Controller.extend("whSample3.controller.fragment.footer",{
						//initiate the menu button on footer
						handlePressOpenMenu: function(oEvent){
							var oButton = oEvent.getSource();

							// create menu only once
							if (!this._menu) {
								this._menu = sap.ui.xmlfragment(
									"whSample3.view.fragment.menuOnFooter",
									this
								);
								this.getView().addDependent(this._menu);
							}

							var eDock = sap.ui.core.Popup.Dock;
							this._menu.open(this._bKeyboard, oButton, eDock.BeginTop, eDock.BeginBottom, oButton);
						},
						//dialog
						onOpenDialog: function(){
							var oView=this.getView();
							// create dialog
							if(!this.byId("logonDialog")){
								Fragment.load({
									id:oView.getId(),
									name:"whSample3.view.fragment.dialog",
									controller:this
								}).then(function(oDialog){
									oView.addDependent(oDialog);
									oDialog.open();
								});								
							}else{
								this.byId("logonDialog").open();
							};
						},
						onCloseDialog : function () {
							this.byId("logonDialog").close();
						}
						//next
					});	
});