/*init mockserver*/

sap.ui.define([
               "../localService/mockserver"
               ],function(mockserver){
					"use strict";
					
					//initiale mockserver
					mockserver.init(); 
					// initialize the embedded component on the HTML page
					sap.ui.require(["sap/ui/core/ComponentSupport"]);
});