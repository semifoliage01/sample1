sap.ui.define([
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/resource/ResourceModel"
               ]
				,function(JSONModel, ResourceModel){
					"use strict";
					return {
						nowDate: function(){
							var date=new Date();
							return date.toLocaleDateString();
						},
						//
						abc:function(){
							
						}
					};
});