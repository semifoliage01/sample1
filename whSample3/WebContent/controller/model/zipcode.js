sap.ui.define([
               "sap/ui/model/SimpleType",
               "sap/ui/model/ValidateException"
               ]
				,function(SimpleType, ValidateException){
					"use strict";
					return SimpleType.extend("whSample3.controller.model.zipcode", {
						formatValue: function(oValue) {
					        return oValue;
					    },
					    parseValue: function(oValue) {
					        return oValue;
					    },
					    validateValue: function(oValue) {
					       if (!/^\d{6}$/.test(oValue)) {
					            throw new ValidateException("Zip code must have 6 digits!");
					       }
					    }
					});
	
});