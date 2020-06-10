/*
 * dataBindingMain.controller.js
 */
sap.ui.define([
               "sap/ui/core/mvc/Controller",
               "../model/RouterBase",
               "sap/m/Text",
               "sap/ui/richtexteditor/RichTextEditor"
               ]
				,function(Controller, RouterBase, Text, RTE){
					"use strict";
					return Controller.extend("whSample3.controller.dataBindingMain",{
						//init
						onInit:function(){
							//create a text
							var oText=new Text({text:"Hi, my name is Harry Hawk--2"});
							var oPage=this.byId("dataBindingMainPage");
							oPage.addContent(oText);
							//create mode
							var oModel=new  sap.ui.model.json.JSONModel({
								greetingText: "Hi, my name is Harry Hawk from JSONModel",
								firstName: "Harry_here",
								lastName: "Hawk",
								enabled: true,
								enabled2: true,
								panelHeaderText: "Data Binding Basics"
							});
							this.getView().setModel(oModel, "dataBinding");
							//set JSON model for note, question, bug, textArea
							var oModelTextArea=new sap.ui.model.json.JSONModel({
								note: "this is note",
								question: "this is questions:"
									+'<ul>' 
									+'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;"> sap.ui.getCore().setModel(oModel); only in index.html? (solved)</span></li>' 
									+'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">step5 note  (not solved)</span></li>' 
									+'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">how to filter element and feed the smartForm, not useBinding?</span></li>' 
									+'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">zipcode.js how to validate the input?</span></li>'  
									+'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">S12 :oProductModel.loadData("./resources/json/Product.json");?  why is work? not ../../resource? </span></li>' 
									+'<li style="font-size: 10pt; font-family: Calibri, sans-serif;"><span style="font-family: sans-serif; color: #353535;">XXXXXXXXXXXXXX</span></li>'  
									+'</ul>' ,
								bug:"this is bug: 1. S15 the unitPrice is not shown"
							});
							this.getView().setModel(oModelTextArea, "learn");
							
							//oneWay binding
							//var modelBindingModel=sap.ui.model.BindingMode;
							//oModel.setDefaultBindingMode(modelBindingMode.OneWay);
							
							//add text to page
							oPage.addContent(
												new Text({text:"{dataBinding>/greetingText}"})
												);
							//create view
							var oPanel=new sap.ui.core.mvc.XMLView({
								viewName:"whSample3.view.dataBinding.panel"
							});
							oPage.addContent(oPanel);
							//create textarea for not questions and bugs and append to page
							var oTextAreaNote=new sap.m.TextArea({
								value:"{learn>/note}",
								cols:100,
								growing: true
							});
							var oTextAreaQuestion=new sap.m.TextArea({
								value:"{learn>/question}",
								cols:100,
								growing: true
							});
							var oTextAreaBug=new sap.m.TextArea({
								value:"{learn>/bug}",
								cols:100,
								growing: true
							});
							var oRichTextEditor = new RTE("myRTE", {
								editorType: sap.ui.richtexteditor.EditorType.TinyMCE4,
								width: "100%",
								height: "300px",
								customToolbar: false,
								showGroupFont: false,
								showGroupLink: false,
								showGroupInsert: false,
								value: "{learn>/question}"
							});
							oPage.addContent(oTextAreaNote).addContent(oRichTextEditor).addContent(oTextAreaBug);
					
						},
						/*
						 * navigate to S8 page
						 */
						onNextPage: function(){
							RouterBase.getRouter(this).navTo("dataBindingS8");
						},
						//nav back
						onNavBack: function(){
							RouterBase.onNavBack(this);

						}
					});
});