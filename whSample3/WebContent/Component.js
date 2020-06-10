sap.ui.define([
               "sap/ui/core/UIComponent",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/resource/ResourceModel",
               "./controller/model/HelloDialog"
               ]
				,function(UIComponent, JSONModel, ResourceModel, HelloDialog){
					"use strict";
					return UIComponent.extend("whSample3",{
						/*metadata : {
					         rootView: {
					            "viewName": "whSample3.view.S9",
					            "type": "XML",
					            "async": true,
					            "id": "whSample3"
					         }
					      },
					      */
						metadata : {
				            manifest: "json"
						},
					    init: function(){
								UIComponent.prototype.init.apply(this, arguments);
								 
								// create the views based on the url/hash
								this.getRouter().initialize();
								 
								
								//initial i18n resourceModel
								var i18nModel=new ResourceModel({
									bundleName: "whSample3.i18n.i18n"
								});
								this.setModel(i18nModel, "i18n");
								
								//initial JSONModel
								var oData= {
								            recipient : {
								                name : "your step 7 JSON",
								                num:	"111145.56",
								                zip: "200434"
								             },
								             p:[
								                {Product: "Power Projector", Weight: "1467"},
								                {Product: "Gladiator MX", Weight: "321"},
								                {Product: "Hurricane GX", Weight: "588"},
								                {Product: "Webcam", Weight: "700"},
								                {Product: "Monitor Locking Cable", Weight: "40"},
								                {Product: "Laptop Case", Weight: "1289"}
								              ]
											};
								var oModel=new JSONModel(oData);
								this.setModel(oModel);
								
								// set dialog
								this._helloDialog = new HelloDialog(this.getRootControl());
							},
							//destroy helloDialog when closing component
							exit : function() {
								//destroy helloDialog
								this._helloDialog.destroy();
								//delete the this._helloDialog because the dialog still exist in browser memory
								delete this._helloDialog;
							},
							//open HelloDialog	
							openHelloDialog : function () {
								this._helloDialog.open();
							}
					});
})