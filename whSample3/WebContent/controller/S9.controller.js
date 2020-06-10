sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "sap/ui/core/UIComponent",
               "sap/ui/core/routing/History",
               "sap/m/MessageToast",
               "sap/ui/core/Fragment",
               "./model/formatter",
               "./model/Tools",
               "./model/zipcode",
               "sap/base/Log"
               ]
			, function(Controller, UICompoent, History, MessageToast, Fragment, formatter, Tools,zipcode, Log){
				"use strict";
				return Controller.extend("whSample3.controller.S9",{
					//initial the formatter
					formatter:formatter,
					Tools:Tools,
					zipcode:zipcode,
				
					//initial controller
					onInit:function(oEvent){
						//to show the exception
						//Predefined data types also offer visual feedback for erroneous user input. To turn this feature on, add the following line to your controller's init function:
						sap.ui.getCore().getMessageManager().registerObject(this.getView(), true);
					},
					onAfterRendering: function(){
						
					},
					
					onShow:function(oE){
						var msInvoice=this.getView().getModel("invoice").getProperty("ProductName");
						console.log(msInvoice);
						MessageToast.show(oE.getSource().getId()+ "this is controller under the component "+ msInvoice);
						//set nowdate
						var oNowDate=this.byId("nowDate");
						oNowDate.setText(Tools.nowDate());
						 
					},
					onShowProperties: function(){
						var oBundle=this.getView().getModel("i18n").getResourceBundle();
						var sRecipient=this.getView().getModel().getProperty("/recipient/name");
						var sMsg=oBundle.getText("showHelloButtonText", [sRecipient]);
						MessageToast.show(sMsg);
					},
					suggestionItemSelected: function name(oEvent) {
					   var oItem = oEvent.getParameter("selectedItem");
					   var oContext = oItem.getBindingContext();
					   alert(JSON.stringify(oContext.getObject()));
					   oContext.getObject().setValueState("Success");
				   },
				   //to back to S11 view
				   onBack: function(){
					   this.byId("whSample3").to(this.byId("S11"));
				   },
				   //to show the 2nd page"S9" in the S11
				   onShowNextPage:function(){
					 this.byId("whSample3").to(this.byId("S9"));  
				   },
				   onShowMainPage: function(){
					   this.byId("whSample3").to(this.byId("S15"));
				   },
				   onOpenDialog: function(){
					   var oView=this.getView();
					   
					   //create dialog
					   if(!this.byId("logonDialog")){
						   //console.log(oView.getId());
						   Fragment.load({
							  id:oView.getId(),
							  name: "whSample3.view.fragment.dialog"
						   }).then(function(oDialog){
							   //connect dialog to view to the root view of this component (models, lifecycle)
							   oView.addDependent(oDialog);
							   oDialog.open();
						   });
					   }else {
						   this.byId("logonDialog").open();
					   };
				   },
				   //open hello delog from component
				   openHelloDialog: function () {
						this.getOwnerComponent().openHelloDialog();
					},
					//selected items in the selector above list
					handleSelectChange: function (oEvent) {
						var mode = oEvent.getParameter("selectedItem").getKey();
						this.byId("invoiceList").setMode(mode);
					},
					//selected items in the list
					onSelectionChange : function (oEvt) {

						var oList = oEvt.getSource();  
						var oLabel = this.byId("idFilterLabel");
						var oInfoToolbar = this.byId("idInfoToolbar");
						var oSelectedItems=this.byId("selectedItems");

						// With the 'getSelectedContexts' function you can access the context paths
						// of all list items that have been selected, regardless of any current
						// filter on the aggregation binding.
						var aContexts = oList.getSelectedContexts(true);
						var aSelectedItems=oList.getSelectedItems();
						
						var sSelectedItems="";
						for(var s in aSelectedItems)  { 
							sSelectedItems+=" / "+aSelectedItems[s].mProperties.title;
						};

						// update UI
						var bSelected = (aContexts && aContexts.length > 0);
						var sText = (bSelected) ? aContexts.length + " selected" : null;
						oInfoToolbar.setVisible(bSelected);
						oLabel.setText(sText);
						oSelectedItems.setText(sSelectedItems);
					},
					
					//format the invoicelist status
					
					//--->S20
					//search the onSearch
					onFilterInvoices: function(oE){  
						var item = oE.getParameter("suggestionItem");
						if (item) {
							sap.m.MessageToast.show("Search for: " + item.getText());
						} else {
							sap.m.MessageToast.show("Search is fired!");
						};
						// build filter array to list
						var aFilter = [];
						var sQuery = oE.getParameter("query");
						if (sQuery) {
							aFilter.push(new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, sQuery)); 
						}

						// filter binding
						var oList = this.byId("invoiceList");
						var oBinding = oList.getBinding("items");
						oBinding.filter(aFilter);
					},
					//suggest of the searchfield
					onSuggest: function (event) {
						var value = event.getParameter("suggestValue");
						var filters = [];
						if (value) {
							filters = [
								new sap.ui.model.Filter([
									new sap.ui.model.Filter("ProductName", function(sText) {
										return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
									}),
									new sap.ui.model.Filter("Qunatity", function(sDes) {
										return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
									})
								], false)
							];
						}
						var oView = this.getView();
						this.oSF = oView.byId("searchField");
						this.oSF.getBinding("suggestionItems").filter(filters);
						this.oSF.suggest();
					},
					//sort getGroupHeader  (to be updated)
					getGroupHeader: function (oGroup){
						return new sap.m.GroupHeaderListItem({
							title: oGroup.key,
							count: 5,
							upperCase: true
						});
					},
					
					//navigate to the detail page of S20
					onPressDetail:function (oEvent) {
						var oItem=oEvent.getSource()
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this); 
						oRouter.navTo("S11DetailPage", {
							invoicePath: oItem.getBindingContext("invoice").getPath().substr(10)});
					},
					//navigate back to S31 from S11  (to be deleted)
					onNavBack:function () {
						var oHistory = History.getInstance(); 
						var sPreviousHash = oHistory.getPreviousHash(); console.log(sPreviousHash)

						if (sPreviousHash !== undefined) {
							window.history.go(-1);
						} else {
							var oRouter = UIComponent.getRouterFor(this);
							oRouter.navTo("overview", {}, true);
						}
					},
					//comboBox item changed
					onComboBoxChanged :function(oE){
						var selectedItem=oE.getSource().getSelectedItem().getKey();				console.log(selectedItem)
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						//navigate to different page 
						switch (selectedItem){
							case 1: 
								oRouter.navTo("S11");
								break;
							case "2":
								oRouter.navTo("employeeMain");
								break;
							case "3":
								oRouter.navTo("oDataMain");
								break;
							case "4":
								oRouter.navTo("dataBindingMain");
								break;
						};
					},
					//S20_4 invice product number -> invoiceDetail.fragment.xml
					onOpenInvoiceDetail: function(oE){
						var oView=this.getView();
						var sValue=oE.getSource().getBindingContext("invoice").getPath().substr(10); console.log(sValue)
						if(!this.byId("invoiceDetail")){
							Fragment.load({
								id: oView.getId(),
								name: "whSample3.view.fragment.InvoiceDetail",
								controller: this
							}).then(function (oDialog) {
								// connect dialog to the root view of this component (models, lifecycle)
								oView.addDependent(oDialog);
								oDialog.open();
							});
						}else {
							this.byId("invoiceDetail").open();
						};
						this._addBingingToFragment(sValue);
					},
					onCloseDialog : function () {
						this.byId("invoiceDetail").close();
					},
					//invoiceDetail.fragment.xml binding to fragment
					_addBingingToFragment:function(sValue){
						
						//bind to view
						this.getView().bindElement({
							path: "invoice>/Invoices/" + sValue,
							model: "invoice"
						});						
					},
					//doSomething button to check the debug tool of UI5
					onDoSomethingPress:function(oEvent){
						var sMessage;
						var oResource=this.getView().getModel("i18n").getResourceBundle();
						try {
							sMessage = oResource.getText("buttonOk", [oEvent.getSourceXYZ().getId()]);
						} catch (oException) {
							sMessage = oResource.getText("buttonErrorOccurred");
							Log.error(oException.stack);
						}
						MessageToast.show(sMessage);
					}

					
				});
	
})