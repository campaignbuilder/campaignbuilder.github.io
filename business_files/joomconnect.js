/**	
 * Daxle jQuery Plugin - v1.0.0 - 2013-05-15
 * 
 * @version   $Id$
 * @author    Directive http://www.directive.com
 * @copyright Copyright (C) 2008 - 2013 Directive Technology Inc
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */

// jQuery.hasAttr
var intervalCwExistsusrsync;  // Empty variable initialize for existing user sync screen.



// Contents of this file - 
//
// jQuery.daxle
// jQuery.daxle.toolbar (l2) - Method to load a toolbar for a view.
// jQuery.daxle.updateSub - Method to update the toolbar based on what button is clicked on the control panel
// jQuery.daxle.display (l2) - Method to fetch and display a requested view
// jQuery.daxle.ctrls (l2)
// jQuery.daxle.script
// jQuery.daxle.form
// jQuery.daxle.cloak
// jQuery.daxle.datepicker ()
// jQuery.daxle.lytebox (l2)
// jQuery.daxle.slider
// jQuery.daxle.test
// jQuery.daxle.pbar
// jQuery.daxle.resetForm
// jQuery.daxle.getFile
// jQuery.daxle.isChecked
// jQuery.daxle.searchKeydown
// Find and Replace function
// IsJsonString function
// Function to toggle version
// jQuery.daxle.wizard
// jQuery.daxle.lastPassBackSteps
// jQuery.daxle.lastPassMoveSteps




/**
 * ( function( $, undefined ) { } ( jQuery )
 * 
 * We wrap with this format to ensure that if we need to use noConflict for multiple library handling, we will still be able to access 
 * jQuery functions via jQuery() instead of with $()
 * 
 */

(function ($, undefined) {
    /**
     * Method to check if an element has a specific attribute.
     *
     * @param void arg	An array of elements
     *
     * @return boolean True if attribute exists
     *
     * @since 4.0.0
     */
    $.fn.hasAttr = function (arg) {
        return this.attr(arg) !== 'undefined' && this.attr(arg) !== false;
    }
}(jQuery)
);


// jQuery.daxle
(function ($, undefined) {
    // prevent duplicate loading
    // this is only a problem because we proxy existing functions
    // and we don't want to double proxy them
    $.daxle = $.daxle || {};
    if ($.daxle.version) {
        return;
    }

    $.extend
    (
        $.daxle,
        {
            version: "1.0.0",

            keyCode:
            {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }
    );
}(jQuery)
);


// jQuery.daxle.toolbar (l2)
(function ($, undefined) {
    $.daxle.toolbar = function (fn, args) {
        switch (fn) {
            /**
             * Method to load a toolbar for a view.
             *
             * @param object options		Defines an associative list of parameters.
             * 		@param string disp		Defines the display to load the toolbar for.
             * 		@param string ui		Defines the layout of the display to load the toolbar for (if any).
             *		@param string platform	Defines the platform the toolbar is for (i.e. "joomla", "wordpress", "drupal").
             *
             * @return void
             *
             * @since 1.0
             */
            case "load":
                {
                    var options = $.extend
					(
						{
						    // Default values
						    disp: "",
						    ui: "",
						    platform: "joomla"
						},
						args
					);

                    // Define authorized toolbar buttons
                    var dtoolbar_options = ['start', 'tbnew', 'tbedit', 'tbcopy', 'tbup', 'tbdown', 'tbsave', 'tbapply', 'tbcancel', 'tbpub', 'tbunpub', 'tbdelete', 'tbopt', 'tbsync', 'tbsyncexisusr', 'tbsyncforcefirstcron', 'tbportalassign', 'tbresetpwd', 'tbcancel', 'tbstats', 'tbinfo', 'end'];

                    // Define toolbar content per page
                    var dtoolbar =
						{
						    controlpnl:
                              {
                                  start: ""
                                  , tbsync: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"configuration\",  ui: \"cwsync\", type: \"lbox\", data: { width: 480 } } );'>Sync</div><div id='' class='dtt'>Sync</div></div>"
                                  , end: ""
                              }
							, newsupd:
								{
								    start: ""
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"newsupd\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, compat:
								{
								    start: ""
									, end: ""
								}
							, configuration:
								{
								    cwsync:
									{
									    start: ""
										, end: ""
									}
									, start: ""
									, tbsync: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"configuration\",  ui: \"cwsync\", type: \"lbox\", data: { width: 450 } } );'>Sync</div><div id='' class='dtt'>Sync</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"configuration\",  ui: \"info\", type: \"lbox\", data: { width: 480 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.validate_config();'>Save</div><div id='' class='dtt'>Save</div></div>"
									, end: ""
								}
							, integration:
								{
								    apiupdate:
                                      {
                                          start: ""
                                          , tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"integration\",  ui: \"apiupdate\", cmd: \"saveAPI\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Save</div><div id='' class='dtt'>Save</div></div>"
                                          , end: ""
                                      }
									, start: ""
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"integration\",  ui: \"info\", type: \"lbox\", data: { width: 480 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, installwizard:
								{
								    start: ""
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.wizard( { disp: \"installwizard\",  ui: \"step1\", cmd: \"saveConfig\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Save</div><div id='' class='dtt'>Save</div></div>"
									, end: ""
								}
							, language:
								{
								    start: ""
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"language\",  ui: \"info\", type: \"lbox\", data: { width: 480 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, users:
								{
								    edituserform:
									{
									    start: ""
										, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:saveUser();'>Save</div><div id='' class='dtt'>Save</div></div>"
										, tbcancel: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"users\", type: \"admin\", method: \"POST\" } );'>Cancel</div><div id='' class='dtt'>Cancel</div></div>"
										, end: ""
									}
									, start: ""
									, tbsave: "<div class='dpw'><div id='__jcd_btn' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"syncusr\", type: \"lbox\", data: { type : \"submitForm\", formName : \"userForm\", width: 500 }, method: \"POST\" } );'><i class=\"jcd_btn_sync_i\"></i>Sync</div><div id='' class='dtt'>Save</div></div>"
									, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"edituserform\", type: \"admin\", method: \"POST\" } );'>New</div><div id='' class='dtt'>New</div></div>"
									, tbpub: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.userForm.boxchecked.value==0){alert(\"Please first make a selection from the list\");}else{javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"groupSub\", type: \"lbox\", data: { type : \"submitForm\", formName : \"userForm\" }, method: \"POST\" } );}'>Subscribe</div><div id='' class='dtt'>Subscribe</div></div>"
									, tbresetpwd: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.userForm.boxchecked.value==0){alert(\"Please first make a selection from the list\");}else{javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"portalPwd\", type: \"lbox\", data: { type : \"submitForm\", formName : \"userForm\" }, method: \"POST\" } );}'>Reset Password</div><div id='' class='dtt'>Reset Password</div></div>"
									, tbportalassign: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.userForm.boxchecked.value==0){alert(\"Please first make a selection from the list\");}else{javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"portalSub\", type: \"lbox\", data: { type : \"submitForm\", formName : \"userForm\" }, method: \"POST\" } );}'>Portal Assign</div><div id='' class='dtt'>Portal Assign</div></div>"
									, tbdelete: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.userForm.boxchecked.value==0){alert(\"Please first make a selection from the list\");}else{var r = confirm(\"Are you sure to delete users?\");if(r == true){javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"users\", cmd: \"deleteUsers\", type: \"admin\", data: { type : \"submitForm\", formName : \"userForm\", action : \"deleteTask\" }, method: \"POST\" } );}}'>Delete</div><div id='' class='dtt'>Delete</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"info\", type: \"lbox\", data: { width: 480 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							,
						    usersnotincw:
								{
								    edituserform:
									{
									    start: ""
										, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:saveUser();'>Save</div><div id='' class='dtt'>Save</div></div>"
										, tbcancel: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"users\", type: \"admin\", method: \"POST\" } );'>Cancel</div><div id='' class='dtt'>Cancel</div></div>"
										, end: ""
									}
									, start: ""

									, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"edituserform\", type: \"admin\", method: \"POST\" } );'>New</div><div id='' class='dtt'>New</div></div>"
									, tbdelete: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.userForm.boxchecked.value==0){alert(\"Please first make a selection from the list\");}else{var r = confirm(\"Are you sure to delete users?\");if(r == true){javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"users\", cmd: \"deleteUsers\", type: \"admin\", data: { type : \"submitForm\", formName : \"userForm\", action : \"deleteTask\" }, method: \"POST\" } );}}'>Delete</div><div id='' class='dtt'>Delete</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"info\", type: \"lbox\", data: { width: 480 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, mailchimp:
								{
									edituserform:
									{
										  start: ""
										, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:saveUser();'>Save</div><div id='' class='dtt'>Save</div></div>"
										, tbcancel: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"users\", type: \"admin\", method: \"POST\" } );'>Cancel</div><div id='' class='dtt'>Cancel</div></div>"
										, end: ""
									}
									, start: ""
									
									, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"edituserform\", type: \"admin\", method: \"POST\" } );'>New</div><div id='' class='dtt'>New</div></div>"
									, tbdelete: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.userForm.boxchecked.value==0){alert(\"Please first make a selection from the list\");}else{var r = confirm(\"Are you sure to delete users?\");if(r == true){javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"users\", cmd: \"deleteUsers\", type: \"admin\", data: { type : \"submitForm\", formName : \"userForm\", action : \"deleteTask\" }, method: \"POST\" } );}}'>Delete</div><div id='' class='dtt'>Delete</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"users\",  ui: \"info\", type: \"lbox\", data: { width: 480 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							,mailchimp:
								{
									campaign:
									{
									    start: ""
										, tbstats: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"stats\", type: \"admin\", method: \"POST\" } );'>Stats</div><div id='' class='dtt'>Stats</div></div>"
										, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"mailchimp\", type: \"admin\", method: \"POST\" } );'>List</div><div id='' class='dtt'>List</div></div>"
										, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"campaign\", type: \"admin\", method: \"POST\" } );'>Campaign</div><div id='' class='dtt'>Campaign</div></div>"
										, tbsync: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"updmktgrp\", type: \"lbox\", data: { width: 600 }, method: \"POST\" } );'>Sync Contacts</div><div id='' class='dtt'>Sync Contacts</div></div>"
										, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"campinfo\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
										, end: ""
									}
									, stats:
									{
									    start: ""
										, tbstats: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"stats\", type: \"admin\", method: \"POST\" } );'>Stats</div><div id='' class='dtt'>Stats</div></div>"
										, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"mailchimp\", type: \"admin\", method: \"POST\" } );'>List</div><div id='' class='dtt'>List</div></div>"
										, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"campaign\", type: \"admin\", method: \"POST\" } );'>Campaign</div><div id='' class='dtt'>Campaign</div></div>"
										, tbsync: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"updmktgrp\", type: \"lbox\", data: { width: 600 }, method: \"POST\" } );'>Sync Contacts</div><div id='' class='dtt'>Sync Contacts</div></div>"
										, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"statinfo\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
										, end: ""
									}
									, start: ""
									, tbstats: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"stats\", type: \"admin\", method: \"POST\" } );'>Stats</div><div id='' class='dtt'>Stats</div></div>"
									, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"mailchimp\", type: \"admin\", method: \"POST\" } );'>List</div><div id='' class='dtt'>List</div></div>"
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"campaign\", type: \"admin\", method: \"POST\" } );'>Campaign</div><div id='' class='dtt'>Campaign</div></div>"
									, tbsync: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"updmktgrp\", type: \"lbox\" , data: { width: 600 },  method: \"POST\" } );'>Sync Contacts</div><div id='' class='dtt'>Sync Contacts</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mailchimp\",  ui: \"listinfo\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, constantcontact:
								{
								    campaign:
									{
									    start: ""
										, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"constantcontact\", type: \"admin\", method: \"POST\" } );'>List</div><div id='' class='dtt'>List</div></div>"
										, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"campaign\", type: \"admin\", method: \"POST\" } );'>Campaign</div><div id='' class='dtt'>Campaign</div></div>"
										, tbsync: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"updmktgrp\", type: \"lbox\", data: { width: 600 }, method: \"POST\" } );'>Sync Contacts</div><div id='' class='dtt'>Sync Contacts</div></div>"
										, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"campinfo\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
										, end: ""
									}
									, mkgroup:
									{
									    start: ""
										, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"campaign\", type: \"admin\", method: \"POST\" } );'>Campaign</div><div id='' class='dtt'>Campaign</div></div>"
										, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"updmktgrp\", type: \"admin\", data: { width: 600 }, method: \"POST\" } );'>Sync Contacts</div><div id='' class='dtt'>Sync Contacts</div></div>"
										, end: ""
									}
									, start: ""
									, tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"constantcontact\", type: \"admin\", method: \"POST\" } );'>List</div><div id='' class='dtt'>List</div></div>"
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"campaign\", type: \"admin\", method: \"POST\" } );'>Campaign</div><div id='' class='dtt'>Campaign</div></div>"
									, tbsync: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"updmktgrp\", type: \"lbox\", data: { width: 600 }, method: \"POST\" } );'>Sync Contacts</div><div id='' class='dtt'>Sync Contacts</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"constantcontact\",  ui: \"listinfo\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, usrsync:
								{
								    start: ""
									, tbsave: "<div class='dpw'><div id='__jcd_btn' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"usrsync\",  ui: \"syncusr\", type: \"lbox\", data: { type : \"submitForm\", formName : \"adminForm\", width: 500 }, method: \"POST\" } );'><i class=\"jcd_btn_sync_i\"></i>Sync</div><div id='' class='dtt'>Save</div></div>"
								    /*, tbsyncexisusr: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"usrsync\",  ui: \"cwexistsusrsync\", type: \"lbox\", data: { width: 450 } } );'>Sync Existing Users</div><div id='' class='dtt'>Sync Existing Users</div></div>"*/
									, tbsyncforcefirstcron: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='if( confirm(\"Do you really want to start over the first cron job?\" ) )javascript:jQuery.daxle.display( { disp: \"usrsync\",  ui: \"forcefirstcron\", type: \"admin\", data: { width: 250 } } );'>Force First Cron Job</div><div id='' class='dtt'>Force First Cron Job</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"usrsync\",  ui: \"info\", type: \"lbox\", data: { width: 480 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, commerce:
								{
								    start: ""
									, tbpub: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.adminFormCat.boxchecked.value==0){alert(\"Please first make a selection from the list !\");}else{javascript:jQuery.daxle.display( { disp: \"commerce\",  ui: \"synccat\", type: \"lbox\", data: { type : \"submitForm\", formName : \"adminFormCat\", width: 700 }, method: \"POST\" } );}'>Sync and Publish</div><div id='' class='dtt'>Sync and Public</div></div>"
									, tbunpub: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"commerce\",  ui: \"commerce\", cmd: \"unpubCats\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminFormCat\" }, method: \"POST\" } );'>Unpublish</div><div id='' class='dtt'>Unpublish</div></div>"
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"commerce\",  ui: \"commerce\", cmd: \"saveCatData\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminFormCat\" }, method: \"POST\" } );'>Save</div><div id='' class='dtt'>Save</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"commerce\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, tracks:
								{
								    start: ""
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"tracks\",  ui: \"tracks\", cmd: \"saveTracks\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Save</div><div id='' class='dtt'>Save</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"tracks\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, mktgrps:
								{
								    start: ""
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mktgrps\",  ui: \"mktgrps\", cmd: \"saveMktgrps\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Save</div><div id='' class='dtt'>Save</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mktgrps\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, mngcontact:
								{
								    start: ""
									, tbdelete: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.adminForm.boxchecked.value==0){alert(\"Please first make a selection from the list !\");}else{ if( confirm(\"Are you sure you want to delete this record?\" ) ) javascript:jQuery.daxle.display( { disp: \"mngcontact\",  ui: \"mngcontact\", cmd: \"deleteMngContact\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );}'>Delete</div><div id='' class='dtt'>Delete</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mngcontact\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, usrprtlassn:
								{
								    start: ""
									, tbpub: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"usrprtlassn\",  ui: \"usrprtlassn\", cmd: \"pubPrtlAssn\", type: \"admin\", data: { type : \"submitForm\", formName : \"usrPrtlAssnForm\" }, method: \"POST\" } );'>Publish</div><div id='' class='dtt'>Publish</div></div>"
									, tbunpub: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"usrprtlassn\",  ui: \"usrprtlassn\", cmd: \"unpubPrtlAssn\", type: \"admin\", data: { type : \"submitForm\", formName : \"usrPrtlAssnForm\" }, method: \"POST\" } );'>Un-Publish</div><div id='' class='dtt'>Un-Publish</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"usrprtlassn\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, mngfields:
								{
								    start: ""
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mngfields\",  ui: \"mngfields\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Save Order</div><div id='' class='dtt'>Save Order</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mngfields\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, mngstates:
								{
								    states:
                                         {
                                             start: ""
                                       , tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mngstates\",  ui: \"addstate\", type: \"lbox\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Add New State</div><div id='' class='dtt'>Add New State</div></div>"
                                       , end: ""
                                         }
									, start: ""
									, tbpub: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mngstates\",  ui: \"mngstates\", cmd: \"pubMngState\",type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Publish</div><div id='' class='dtt'>Publish</div></div>"
									, tbunpub: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"mngstates\",  ui: \"mngstates\", cmd: \"unpubMngState\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );'>Unpublish</div><div id='' class='dtt'>Unpublish</div></div>"
									, end: ""
								}
							, forms:
								{
								    forms:
                                        {
                                            start: ""
                                          , tbnew: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"new\", type: \"admin\" } );'>New</div><div id='' class='dtt'>New</div></div>"
                                          , tbcopy: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.adminForm.boxchecked.value==0){alert(\"Please first make a selection from the list !\");}else{javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"forms\", cmd: \"copyForms\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );}'>Copy</div><div id='' class='dtt'>Copy</div></div>"
                                          , tbup: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"import\", type: \"lbox\",data: { width: 390 } } );'>Import</div><div id='' class='dtt'>Import</div></div>"
                                          , tbdown: "<div class='dpw'><div id='' class='dmsb formExport' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.adminForm.boxchecked.value==0){alert(\"Please first make a selection from the list !\");}else{javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"forms\", cmd: \"exportForms\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\", resultSet: \"1\" }, method: \"POST\" } ); setTimeout(function(){jQuery.daxle.getFile()}, 1000);}'>Export</div><div id='' class='dtt'>Export</div></div>"
                                          , tbdelete: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if (document.adminForm.boxchecked.value==0){alert(\"Please first make a selection from the list !\");}else{ if( confirm(\"Are you sure you want to delete this record?\" ) )javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"forms\", cmd: \"deleteForms\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\" }, method: \"POST\" } );}'>Delete</div><div id='' class='dtt'>Delete</div></div>"
                                          , tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
                                          , end: ""
                                        }
									, start: ""
									, tbapply: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.validate( \"edit\" );'>Apply</div><div id='' class='dtt'>Apply</div></div>"
									, tbsave: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.validate( \"forms\" );'>Save</div><div id='' class='dtt'>Save</div></div>"
								    /*, tbcancel: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.validate( \"forms\" );'>Close</div><div id='' class='dtt'>Close</div></div>"*/
									, tbcancel: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"forms\", type: \"admin\", method: \"POST\" } );'>Close</div><div id='' class='dtt'>Close</div></div>"

									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"forms\",  ui: \"forminfo\", type: \"lbox\", data: { width: 600 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, rollback:
								{
								    start: ""
									, tbapply: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='if( confirm(\"Do you really want to rollback?\" ) )javascript:jQuery.daxle.display( { disp: \"rollback\",  ui: \"rollback\", cmd: \"applyRollback\", type: \"admin\", data: { type : \"submitForm\", formName : \"adminForm\", resultSet: \"1\" },method: \"POST\" } );'>Rollback</div><div id='' class='dtt'>Rollback</div></div>"
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"rollback\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, queue:
								{
								    start: ""
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"queue\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								}
							, log:
								{
								    start: ""
									, tbinfo: "<div class='dpw'><div id='' class='dmab' role='button' tabindex='0' aria-haspopup='false' onclick='javascript:jQuery.daxle.display( { disp: \"log\",  ui: \"info\", type: \"lbox\", data: { width: 377 } } );'>Help</div><div id='' class='dtt'>Help</div></div>"
									, end: ""
								},
							lastpass:
                                {
                                    start: ""
                                            , tbsync: "<div class='dpw'><div id='' class='dmsb' role='button' tabindex='0' aria-haspopup='false' onclick='updateMultipleLastPassConfigs();javascript:updateLastPassConfig(\"add\");'>Sync</div><div id='' class='dtt'>Sync</div></div>"
											, end: ""
                                }
						};

                    // Prepare variable to store toolbar-to-make
                    var tbcontent = "";

                    // Check if requested toolbar is an authorized option
                    if (!$.isEmptyObject(dtoolbar[options['disp']])) {
                        // Check if requested ui toolbar is available
                        if (!$.isEmptyObject(dtoolbar[options['disp']][options['ui']])) {
                            $.each
							(
								dtoolbar[options['disp']][options['ui']],
								function (key, value) {
								    // Check if requested button is an authorized option
								    if ($.inArray(key, dtoolbar_options) > -1) {
								        // Add content to toolbar string
								        tbcontent += value;
								    }
								}
							);
                        } else {	// There is no ui toolbar requested or it does not exist. Fall back to default toolbar options for display (if any)
                            $.each
							(
								dtoolbar[options['disp']],
								function (key, value) {
								    // Check if requested button is an authorized option
								    if ($.inArray(key, dtoolbar_options) > -1) {
								        // Add content to toolbar string
								        tbcontent += value;
								    }
								}
							);
                        }
                    }

                    // Render the toolbar content
                    $.daxle.display
					(
						{
						    // Prepare options array
						    content: tbcontent,
						    type: 'toolbar'
						},
						"load"
					);
                } break;// End "load" case.

            case "destroy":
                {
                    $.daxle.display
					(
						{
						    // Prepare options array
						    content: "",
						    type: 'toolbar'
						},
						"load"
					);
                } break;// End "destroy" case.
        }
    }
}(jQuery)
);


// jQuery.daxle.updateSub
(function ($, undefined) {
    $.daxle.updateSub = function (icon, view) {
        /**
		 * Method to update the toolbar based on what button is clicked on the control panel
		 *
		 * @param object topNave		Defines the list of subnav items. Used to set and remove the active class.
		 * @param string text			Will hold the text to display next to the toolbar icon.
		 * @param string icon		Defines the category of the view that was clicked on.
		 * @param string view		Defines the name of the view that was clicked on.
		 *
		 * @return void
		 *
		 * @since 1.0
		*/

        clearTimeout(window.timer);
        /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

        var text = '';
        var topNav =
		{
		    sub:
			{
			    newsupd: $(document.getElementById(':H:SN:B:newsupd')),
			    compat: $(document.getElementById(':H:SN:B:cmptbl')),
			    configuration: $(document.getElementById(':H:SN:B:cfg')),
			    integration: $(document.getElementById(':H:SN:B:intgrt')),
				boards: $(document.getElementById(':H:SN:B:boards')),
			    language: $(document.getElementById(':H:SN:B:libmng')),
			    rollback: $(document.getElementById(':H:SN:B:rollback')),
			    mktgrps: $(document.getElementById(':H:SN:B:mktgrps')),
			    tracks: $(document.getElementById(':H:SN:B:tracks')),
			    users: $(document.getElementById(':H:SN:B:users')),
			    usrpmssns: $(document.getElementById(':H:SN:B:usrpmssns')),
			    usrsync: $(document.getElementById(':H:SN:B:usrsync')),
			    mngcontact: $(document.getElementById(':H:SN:B:mngcontact')),
			    usrnosync: $(document.getElementById(':H:SN:B:usrnosync')),
			    usrprtlassn: $(document.getElementById(':H:SN:B:usrprtlassn')),
			    usersnotincw: $(document.getElementById(':H:SN:B:usersnotincw')),
			    forms: $(document.getElementById(':H:SN:B:mngfrms')),
			    mngfields: $(document.getElementById(':H:SN:B:mngfields')),
			    mngstates: $(document.getElementById(':H:SN:B:mngstates')),
			    commerce: $(document.getElementById(':H:SN:B:qckcom')),
			    mailchimp: $(document.getElementById(':H:SN:B:qcpmc')),
			    constantcontact: $(document.getElementById(':H:SN:B:qcpcc')),
			    qckcmpgncds: $(document.getElementById(':H:SN:B:qckcmpgncds')),
			    qckgotointgrt: $(document.getElementById(':H:SN:B:qckgotointgrt')),
			    queue: $(document.getElementById(':H:SN:B:queue')),
			    log: $(document.getElementById(':H:SN:B:log')),
			    lastpass: $(document.getElementById(':H:SN:B:lastpass'))
			}
		}

        switch (icon) {
            case 'cfg':
                {
                    text = 'Global Settings';
                } break;

            case 'jcacl':
                {
                    text = 'JC-ACL';
                } break;

            case 'jcusr':
                {
                    text = 'JC Users';
                } break;

            case 'forms':
                {
                    text = 'Forms';
                } break;

            case 'addons':
                {
                    text = 'Add-ons';
                } break;

            case 'logs':
                {
                    text = 'Logs';
                } break;

        }

        // Remove the active class from all submenu items
        $.each
		(
			topNav['sub'],
			function (x, y) {
			    y.removeClass('active');
			}
		);

        // Don't forget to set the place holder by first building the proper html
        var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + text + "</div>";

        // Clearing the classes from the placeholder
        $(document.getElementById(':H:N:Ph')).removeClass();

        // Resetting the placeholder class attribute
        $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

        // Adding the current active class to load the proper icon
        $(document.getElementById(':H:N:Ph')).addClass('dmnc-' + icon);

        // And finally setting the placeholder text
        $(document.getElementById(':H:N:Ph')).html(innerText);

        // Show the submenu based on the view that was clicked
        $(document.getElementById(':H:SN:C')).show();
        $(document.getElementById(':H:SN:C:' + icon)).show();

        // Add the active class to the respective submenu item
        topNav['sub'][view].addClass('active');
    }
}(jQuery)
);

(function ($, undefined) {
    $.daxle.updateSubMenu = function (icon, view) {
        /**
		 * Method to update the toolbar based on what button is clicked on the control panel
		 *
		 * @param object topNave		Defines the list of subnav items. Used to set and remove the active class.
		 * @param string text			Will hold the text to display next to the toolbar icon.
		 * @param string icon		Defines the category of the view that was clicked on.
		 * @param string view		Defines the name of the view that was clicked on.
		 *
		 * @return void
		 *
		 * @since 1.0
		*/

        clearTimeout(window.timer);
        /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

        var text = '';
        var topNav =
		{
		    sub:
			{
			    newsupd: $(document.getElementById(':H:SN:B:newsupd')),
			    compat: $(document.getElementById(':H:SN:B:cmptbl')),
			    configuration: $(document.getElementById(':H:SN:B:cfg')),
			    integration: $(document.getElementById(':H:SN:B:intgrt')),
				boards: $(document.getElementById(':H:SN:B:boards')),
			    language: $(document.getElementById(':H:SN:B:libmng')),
			    rollback: $(document.getElementById(':H:SN:B:rollback')),
			    mktgrps: $(document.getElementById(':H:SN:B:mktgrps')),
			    tracks: $(document.getElementById(':H:SN:B:tracks')),
			    users: $(document.getElementById(':H:SN:B:users')),
			    usrpmssns: $(document.getElementById(':H:SN:B:usrpmssns')),
			    usrsync: $(document.getElementById(':H:SN:B:usrsync')),
			    mngcontact: $(document.getElementById(':H:SN:B:mngcontact')),
			    usrnosync: $(document.getElementById(':H:SN:B:usrnosync')),
			    usrprtlassn: $(document.getElementById(':H:SN:B:usrprtlassn')),
			    usersnotincw: $(document.getElementById(':H:SN:B:usersnotincw')),
			    forms: $(document.getElementById(':H:SN:B:mngfrms')),
			    mngfields: $(document.getElementById(':H:SN:B:mngfields')),
			    mngstates: $(document.getElementById(':H:SN:B:mngstates')),
			    commerce: $(document.getElementById(':H:SN:B:qckcom')),
			    mailchimp: $(document.getElementById(':H:SN:B:qcpmc')),
			    constantcontact: $(document.getElementById(':H:SN:B:qcpcc')),
			    lastpass: $(document.getElementById(':H:SN:B:lastpass')),
			    campcodes: $(document.getElementById(':H:SN:B:campcodes')),
			    qckcmpgncds: $(document.getElementById(':H:SN:B:qckcmpgncds')),
			    qckgotointgrt: $(document.getElementById(':H:SN:B:qckgotointgrt')),
			    queue: $(document.getElementById(':H:SN:B:queue')),
			    log: $(document.getElementById(':H:SN:B:log'))
			},
		    main:
			{
			    cfg: $(document.getElementById(':H:SN:C:cfg')),
			    jcacl: $(document.getElementById(':H:SN:C:jcacl')),
			    jcusr: $(document.getElementById(':H:SN:C:jcusr')),
			    forms: $(document.getElementById(':H:SN:C:forms')),
			    addons: $(document.getElementById(':H:SN:C:addons')),
			    logs: $(document.getElementById(':H:SN:C:logs'))
			}
		}

        switch (icon) {
            case 'cfg':
                {
                    text = 'Global Settings';
                } break;

            case 'jcacl':
                {
                    text = 'JC-ACL';
                } break;

            case 'jcusr':
                {
                    text = 'JC Users';
                } break;

            case 'forms':
                {
                    text = 'Forms';
                } break;

            case 'addons':
                {
                    text = 'Add-ons';
                } break;

            case 'logs':
                {
                    text = 'Logs';
                } break;

        }

        // Remove the active class from all submenu items
        $.each
		(
			topNav['sub'],
			function (x, y) {
			    y.removeClass('active');
			}
		);
        $.each
		(
			topNav['main'],
			function (x, y) {
			    $(document.getElementById(':H:SN:C:' + x)).hide();
			}
		);

        // Don't forget to set the place holder by first building the proper html
        var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + text + "</div>";

        // Clearing the classes from the placeholder
        $(document.getElementById(':H:N:Ph')).removeClass();

        // Resetting the placeholder class attribute
        $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

        // Adding the current active class to load the proper icon
        $(document.getElementById(':H:N:Ph')).addClass('dmnc-' + icon);

        // And finally setting the placeholder text
        $(document.getElementById(':H:N:Ph')).html(innerText);

        // Show the submenu based on the view that was clicked
        $(document.getElementById(':H:SN:C')).show();
        $(document.getElementById(':H:SN:C:' + icon)).show();

        // Add the active class to the respective submenu item
        topNav['sub'][view].addClass('active');
    }
}(jQuery)
);


// jQuery.daxle.display (l2)
(function ($, undefined) {
    $.daxle.display = function (args, fn) {
        // When you first load JC, the top icon will not display correctly. This is set here.
        if (!$(document.getElementById(':H:N:Ph')).text().trim().length) {
            // Don't forget to set the place holder by first building the proper html
            var innerText = "<div class='dpnmi' ></div><div class='dbt'>Home</div>";

            // Clearing the classes from the placeholder
            $(document.getElementById(':H:N:Ph')).removeClass();

            // Resetting the placeholder class attribute
            $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

            // And finally setting the placeholder text
            $(document.getElementById(':H:N:Ph')).html(innerText);
        }

        //var timeout = setTimeout( "location.href = '/';", 5000 );

        if (fn == "" || fn == 0 || fn == '0' || fn == null || fn == false) {
            /**
             * Method to fetch and display a requested view
             *
             *		@param options object		Defines an associative array of parameters
             * 		@param string disp		Defines the requested view (This is the view name)
             * 		@param string ui		Defines the layout requested (This is the layout name, default is disp value)
             * 		@param string cmd		Reserved for specifying controller method
             * 		@param string mod		Used for leaving the scope of JoomConnect (i.e. com_users, com_config)
             * 		@param string type		Defines the type of content (i.e. Admin, Site, Toolbar, etc)
             * 		@param object data		An array/obj used to pass extra variables/data to get/post methods
             * 		@param string sid		For passing session id's in custom platforms
             * 		@param string method	Leave blank for GET, otherwise specify POST
             *
             * @return void
             *
             * @since 1.0
             */

            var options = $.extend
            (
                {
                    // Default values
                    disp: "controlpnl",
                    ui: "",
                    cmd: "0",
                    mod: "0",
                    type: "admin",
                    data: "0",
                    sid: "0",
                    method: "GET",
                    anchor: '',
                    hidemenu: 0
                },
                args
            );

            if (options['disp'] === "") {
                options['disp'] = "controlpnl";
            }

            if (options['hidemenu'] == 1) {
                $("#\\:H\\:N\\:Ph").hide();
            } else {
                $("#\\:H\\:N\\:Ph").show();
            }

            // Prepare variables
            var response = null;
            var url = null;
            var params = "";
            var resultSet = false;

            if ((options['ui'] == '') || (options['ui'] == null) || (options['ui'] == '0') || (options['ui'] == 0)) {
                options['ui'] = options['disp'];
            }

            switch (options['method']) {
                case 'GET':
                    {
                        if (options['mod'] === 'com_users') {
                            url = 'index.php?option=com_config&view=' + options['disp'] + '&component=' + options['mod'] + '&path=';
                        } else {
                            url = 'index.php?option=com_joomconnect&view=' + options['disp'] + '&type=' + options['ui'];
                            if ((options['cmd'] != 0) && (options['cmd'] != '0') && (options['cmd'] != '')) {
                                url += '&task=' + options['cmd'];
                            }
                            if ((options['mod'] != 0) && (options['mod'] != '0') && (options['mod'] != '') && (options['mod'] != 'pbar')) {
                                url += '&option=' + options['mod'];
                            }
                            if ((options['data'] != 0) && (options['data'] != '0') && (options['data'] != '')) {
                                if (!$.isEmptyObject(options['data'])) {
                                    $.each
									(
										options['data'],
										function (key, value) {
										    url += '&' + key + '=' + value;
										}
									);

                                    if (options['data']['resultSet'] == '1') {
                                        resultSet = true;
                                    }
                                }
                            }
                        }

                        url += '&tmpl=component';
                    } break;

                case 'POST':
                    {
                        url = 'index.php?option=com_joomconnect&view=' + options['disp'] + '&type=' + options['ui'];
                        if ((options['cmd'] != 0) && (options['cmd'] != '0') && (options['cmd'] != '')) {
                            url += '&task=' + options['cmd'];
                        }
                        if ((options['mod'] != 0) && (options['mod'] != '0') && (options['mod'] != '')) {
                            url += '&option=' + options['mod'];
                        }
                        url += '&tmpl=component';
                        if ((options['data'] != 0) && (options['data'] != '0') && (options['data'] != '')) {
                            if (options['data']['type'] == 'submitForm') {
                                var forms = options['data']['formName'].split(",");
                                params = {};
                                if (forms.length > 1) {
                                    for (var i = 0; i < forms.length; i++) {
                                        var temp = $.daxle.form(forms[i]);
                                        $.extend(params, temp);
                                    }
                                } else {
                                    params = $.daxle.form({ formName: options['data']['formName'] });
                                }
                                //console.log( JSON.stringify( params ) );
                            } else {
                                params = options['data'];
                                // Do here what you will.  
                            }

                            if (options['data']['resultSet'] == '1') {
                                resultSet = true;
                            }
                        } else {
                            // Do here what you will.
                        }
                    } break;
            }
            //console.log( JSON.stringify( params ) );

            var daxleData = '';
            if ($.type(params) == 'object') {
                daxleData = "daxledata=" + JSON.stringify(params);
            }

            /*
             Here we get an html page via Ajax
 
             All scripts included in DOM are executed automatically
             only if you set the content within a div using:
             jQuery( 'element_id' ).html( content );
            */
            $.ajax
            (
                {
                    url: url,
                    async: true,
                    type: options['method'],
                    dataType: 'html',
                    data: daxleData,
                    beforeSend: function () {
                        if (options['type'] !== 'ibox' && options['type'] !== 'lbox' && options['type'] !== 'overlay' && options['type'] !== 'progress') {
                            $.daxle.display
                            (
                                {
                                    content: "<div class='dlg' align='right'><img src='../media/com_joomconnect/images/loaders/loading1.gif'></div>",
                                    type: 'toolbar'
                                },
                                "load"
                            );
                        }

                        if (options['mod'] === "pbar") {
                            $.daxle.lytebox('load', { ui: 'pbar' });
                            $.daxle.script({ file: 'pbar.js' });
                        }
                    },
                    success: function (data, textStatus, xhr) {
                        $.daxle.display
                        (
                            {
                                content: data,
                                type: options['type'],
                                disp: options['disp'],
                                ui: options['ui'],
                                sysmsg: resultSet,
                                height: options['data']['height'],
                                width: options['data']['width'],
                                anchor: options['anchor']
                            },
                            "load"
                        );
                        if (options['type'] === "progress") {
                            $.daxle.pbar('update');
                        }

                        if (options['disp'] === "forms" && (options['ui'] === "edit" || options['ui'] === 'new')) {
                            // Fixed uneditable tab issue on load, no idea why but it did
                            $.daxle.dsort('tab');

                            $.daxle.dsort();
                        }

                        // Prep tabs and controls
                        $.daxle.tabs();
                        $.daxle.ctrls();
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $.daxle.display
                        (
                            {
                                content: textStatus + ": " + errorThrown,
                                type: options['type'],
                                disp: options['disp']
                            },
                            "load"
                        );
                    }
                }
            );
        }


        if (fn === "load") {
            /**
             * Method to render content to the display
             *
             * @param object	options		Defines an associative array of parameters.
             * 		@param HTML 	content		Defines the content string.
             * 		@param string 	type		Defines the type of content to render.
             * 		@param string 	disp		Defines the view index for the daxleLoadTB() function.
             * 		@param array	ui			Defines the layout of the display to load the toolbar for (if any).
             *		@param boolean	sysmsg		Defines whether to display a system message or not.  Defaults to false.
             *
             * @return void
             *
             * @since 1.0.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    content: "",
                    type: "",
                    disp: "",
                    ui: "",
                    sysmsg: false,
                    anchor: ''
                },
                args
            );
            // Parse the type of content to render
            switch (options['type']) {
                case 'toolbar':
                    {
                        document.getElementById(':H:Tb').innerHTML = options['content'];
                        return true;
                    } break;

                case 'testapi':
                    {
                        document.getElementById('__div_msg_show').innerHTML = options['content'];
                    } break;

                case 'testmssql':
                    {
                        document.getElementById('__div_mssql_msg_show').innerHTML = options['content'];
                    } break;
				
				case 'testrestkey':
                    {
                        document.getElementById('__div_restmsg_show').innerHTML = options['content'];
                    } break;
					
				case 'checkrestkey':
                    {
                        document.getElementById('__div_checkrestmsg_show').innerHTML = options['content'];
                    } break;	

                case 'admin':
                    {
                        document.getElementById(':B:JC').innerHTML = options['content'];
                        if (options['anchor'] !== '') {
                            location.hash = options['anchor'];
                            // Need this for webkit based browsers. Also need to set it twice due to webkit bug
                            location.href = location.hash;
                            location.href = location.hash;
                        }

                        if (options['sysmsg'] == true) {
                            var message = jQuery(document.getElementById(':B:JC')).find(document.getElementById(':B:JC:SM')).html();
                            $.daxle.display
							(
								{
								    msg: message
								},
								'sysmsg'
							);
                        }
                    } break;

                case 'overlay':
                    {
                        document.getElementById(':B:JC:LB:O:x').innerHTML = options['content'];
                        $.daxle.lytebox
						(
							"load",
							{
							    overlay: 1
							}
						);
                        return true;
                    } break;

                case 'lbox':
                    {
                        document.getElementById(':B:JC:LB:x').innerHTML = options['content'];
                        if (options['ui'] === 'pbar') {
                            $.daxle.lytebox("load", { ui: 'pbar' });
                        } else {
                            $.daxle.lytebox("load", { height: options['height'], width: options['width'] });
                        }

                        // Prep tabs and controls
                        $.daxle.tabs();
                        $.daxle.ctrls();
                        if (options['ui'] == "cwexistsusrsync") {
                            intervalCwExistsusrsync = setInterval(function () { refreshCwExistsusrsync() }, 4000);
                        }
                        return true;
                    } break;

                case 'ibox':
                    {
                        // Let's figure out what iframe we need
                        if (options['ui'] === 'component') {
                            document.getElementById(':B:JC:LB:x').innerHTML = '<iframe id="jcd_lytebox_iframe" width="800px" height="600px" scrolling="auto" src="index.php?option=com_config&view=component&component=com_users&path=&tmpl=component"></iframe>';
                        }

                        if (options['ui'] === 'portalupdate') {
                            document.getElementById(':B:JC:LB:x').innerHTML = '<iframe id="jcd_lytebox_iframe" style="border:0px" width="600px" height="350px" scrolling="auto" src="index.php?option=com_joomconnect&view=integration&type=portalupdate&tmpl=component&portal_integration_id=4"></iframe>';
                        }

                        if (options['ui'] === 'pbar') {
                            $.daxle.lytebox("load", { ui: 'pbar', vscroll: 1 });
                        } else {
                            $.daxle.lytebox("load", { vscroll: 1 });
                        }
                        return true;
                    } break;

                case 'progress':
                    {

                        document.getElementById(':B:JC:LB:pb:st:x').innerHTML = options['content'];
                        return true;
                    } break;
            }
            // Load the toolbar
            $.daxle.toolbar
            (
                "load",
                {
                    disp: options['disp'],
                    ui: options['ui']
                }
            );
        };

        if (fn === "destroy") {
            document.getElementById('djcx').innerHTML = "";
            document.getElementById('dtbx').innerHTML = "";
        }


        if (fn === "sysmsg") {
            /**
             * Method to process a system message.
             *
             * @param object options		Defines an associative list of parameters.
             *		@param string type		Defines the id of the form to save ( adminForm if not set ).
             *		@param string msg		Defines the message to display to the user.		
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    type: "",
                    msg: ""
                },
                args
            );

            if (options['msg'] !== '') {
                var type = '';
                if (document.getElementById(':B:JC:SMT')) {
                    type = document.getElementById(':B:JC:SMT').innerHTML;
                }
                document.getElementById(':B:JC:SM:F').innerHTML = options['msg'];

                // Remove all current classes then add the di class and type class
                $(document.getElementById(':B:JC:SM:F')).removeClass();
                $(document.getElementById(':B:JC:SM:F')).addClass('di');
                $(document.getElementById(':B:JC:SM:F')).addClass(type);

                if ((options['type'] === '') || (options['type'] === 0) || (options['type'] === '0')) {
                    $(document.getElementById(':B:JC:SM:F')).fadeIn(800);
                    $(document.getElementById(':B:JC:SM:F')).delay(10000).fadeOut(800);
                } else {
                    $(options['type']).fadeIn(800);
                    $(options['type']).delay(10000).fadeOut(800);
                }
            }
        }
        if (options['content'] == "Login Session Expire") {
            window.location = "index.php";
        }
    }
}(jQuery)
);


// jQuery.daxle.ctrls (l2)
(function ($, undefined) {
    $.daxle.ctrls = function () {
        // Set the behavior of all of our controls

        // Multi-Select button click behavior
        $('div.dpob').on
        (
            "click",
            function (event) {
                if ($(this).find('div.dpol').is(":hidden")) {
                    $(this).find('div.dpos').hide(),
                    $(this).find('div.dpol').fadeIn(500);
                } else {
                    $(this).find('div.dpol').fadeOut
                    (
                        500,
                        function () {
                            $(this).closest('div.dpob').find('div.dpos').show();
                        }
                    );
                }
            }
        );


        // Multi-Select button mouseover/mouseout behavior
        $('#\\:B\\:JC\\:FM\\:PV div.dfbod').mouseover
        (
            function (event, ui) {
                $(this).find('div.dfbeb-ctrls').first().show();
            }
        ).mouseout
        (
            function (event, ui) {
                $(this).find('div.dfbeb-ctrls').first().hide();
            }
        );

        // On Load and On Submit events mouseover/mouseout
        $('div.dfbad').mouseover
        (
            function (event, ui) {
                $(this).find('div.dfbeb-ctrls').show();
            }
        ).mouseout
        (
            function (event, ui) {
                $(this).find('div.dfbeb-ctrls').hide();
            }
        );


        // Multi-Select button mouseover/mouseout behavior
        $('div.dpob').mouseover
        (
            function (event, ui) {
                $(this).closest('div.dpobw').find('div.dtt').show();
            }
        ).mouseout
        (
            function (event, ui) {
                $(this).closest('div.dpobw').find('div.dtt').hide();
            }
        );

        // Multi-Select options ctrl+ mouse click / mouse click behavior
        $('ol.dpole').selectable
        (
            {
                stop: function (e) {
                    var result = $("#select-result").empty();
                    var selected = $("#selected").html();
                    var options = {};
                    var selection = "";

                    $(".ui-selected", this).each
                    (
                        function () {
                            var index = $("ol.dpole li").index(this);
                            result.append(" #" + (index + 1));

                            options[index] = $(this).text();
                            //alert( jQuery(this).text() );
                            //alert( index )
                        }
                    );

                    if ($.isEmptyObject(options)) {
                        selection = "Select a value.."
                    } else {
                        selection = "";
                        $.each
                        (
                            options,
                            function (k, v) {
                                if (selection === "") {
                                    selection += v;
                                } else {
                                    selection += ", " + v;
                                }
                            }
                        );
                    }

                    //alert( JSON.stringify( options ) );
                    $(this).closest('div.dpob').find('div.dpos').html(selection);
                    if (!e.ctrlKey) {
                        $(this).closest('div.dpob').find('div.dpol').fadeOut(500);
                        $(this).closest('div.dpob').find('div.dpos').show();
                    }
                }
            }
        );

        // Load datepicker for calender inputs
        $('.datepicker').datepicker();

			$( ".progress" ).progressbar( {
				value: 1
			} );
			
			$(function() {
			  $("#Campaign, #MarketingCampaign").customselect();
			});
		}
	}( jQuery )
);


// jQuery.daxle.script
(function ($, undefined) {
    $.daxle.script = function (args) {
        /**
         * Method to load an external script.
         *
         * @param object options		Defines an associative list of parameters.
         * 		@param string file		Defines the file name of the external script to load ( extension included ).
         * 		@param string type		Un-used.
         *
         * @return void
         *
         * @since 1.0
         */
        var options = $.extend
        (
            {
                // Default values
                file: "",
                type: ""
            },
            args
        );

        var c_url = window.location.href;
        var n_url = c_url.replace("/administrator/index.php", "/libraries/daxle/core/js/includes/" + options['file']);
        $.getScript(n_url).fail
        (
            function (jqxhr, settings, exception) {
                alert('Failed to load script: ' + n_url);
            }
        );
    }
}(jQuery)
);


// jQuery.daxle.form
(function ($, undefined) {
    $.daxle.form = function (args, fn) {
        if (fn == "" || fn == 0 || fn == '0' || fn == null || fn == false) {
            /**
             * Method to save a form via AJAX.
             *
             * @param object options		Defines an associative list of parameters.
             * 		@param string file		Defines the id of the form to save ( adminForm if not set ).
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {	// Defaults
                    formName: "adminForm"
                },
                args
            );

            var data = $('#' + options['formName']).serializeArray(), obj = {}, j = 0, k = 0;
            var key = null;
            //alert( JSON.stringify( data ) );
            if (options['formName'] == "userForm" || options['formName'] == "groupSettings" || options['formName'] == "adminMCListForm" || options['formName'] == "adminCCListForm" || options['formname'] == "adminFormPagination") {
                $('form#' + options['formName'] + ' input[type=checkbox]:checked').each
                (
                    function () {
                        if (this.checked) {
                            var input = $(this); // This is the jquery object of the input, do what you will
                            var name = input.attr("name");
                            var value = input.attr("value");
                            obj['cid_' + k] = value;
                        }
                        k++;
                    }
                );
                $('form#' + options['formName'] + ' input[type=text]').each
                (
                    function () {
                        var input = $(this); // This is the jquery object of the input, do what you will
                        var name = input.attr("name");
                        var value = $(this).val();
                        obj[name] = value;
                    }
                );
                $('form#' + options['formName'] + ' input[type=hidden]').each
                (
                    function () {
                        var input = $(this); // This is the jquery object of the input, do what you will
                        var name = input.attr("name");
                        var value = $(this).val();
                        obj[name] = value;
                    }
                );
                $('form#' + options['formName'] + ' select').each
                (
                    function () {
                        var items = [];
                        var input = $(this); // This is the jquery object of the input, do what you will
                        var selectid = input.attr("id");
                        var name = input.attr("name");
                        var value = input.attr("value");
                        $('#' + selectid + ' option:selected').each(function () { items.push($(this).val()); });
                        var result = items.join(',');
                        obj[name] = result;
                    }
                );
                //alert( JSON.stringify( obj ) );
                return obj;
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name in obj)                                                //Used for select multiple
                    {
                        key = data[i].name + '_' + j;
                        replaceVal = findAndReplace(data[i].value, '');
                        //obj[key] = encodeURIComponent( replaceVal );
                        obj[key] = replaceVal;
                        //obj[key] = data[i].value;
                        j++;
                    } else {
                        key = data[i].name;
                        replaceVal = findAndReplace(data[i].value, '');
                        if (key == "dfbol" || key == "dfbos" || key == "dfbdc") {
                            //alert( "data = " + data[i].value + "     replaced = " + replaceVal );
                            obj[key] = replaceVal;
                        } else {
                            // obj[key] = encodeURIComponent( replaceVal );	// Commented until we find a case that the code needs this statement to execute properly
                            obj[key] = replaceVal;
                        }
                        //obj[key] = encodeURIComponent( replaceVal );
                        //str = data[i].value;
                        //str.replace("&","&amp;");
                        //obj[data[i].name] = str;
                    }
                };

                $('#' + options['formName'] + ' input[type=checkbox]:not(:checked)').map
                (
                    function () {
                        return obj[this.name] = '0';
                    }
                ).get();

                //alert(JSON.stringify(obj));
                return obj;
            }
        }

        if (fn === "reset") {
            /**
             * Method to reset a form
             *
             * @param	object	options		An associative array of parameters
             * 		@param string 	form	Defines the id of the form to reset.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    formName: ""
                },
                args
            );

            var value = "";
            $('#' + options['form']).find('select').val(value).attr('selected', true);
            $('#' + options['form']).find('input[type=text]').val(value);
            $('#' + options['form']).find('input[type=checkbox]').removeAttr('checked');
        }

        if (fn === "msMoveRows") {
            /**
             * Method to move select options from one multiple select box to another. 
             * The function also sorts the options alphabetically after moving
             *
             * @param	object	options		An associative array of parameters
             * 		@param string 	from	Defines the source multiple select box.
             *		@param string 	to		Defines the destination multiple select box.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    from: "",
                    to: "",
                    sort: ""
                },
                args
            );

            var selectedItems = $('#' + options['from'] + " :selected").toArray();
            $('#' + options['to']).append(selectedItems);
            selectedItems.remove;

            if (options['sort'] != '') {
                var items = $('#' + options['to'] + ' option');
                items.sort
                (
                    function (a, b) {
                        if (a.text.toLowerCase() > b.text.toLowerCase())	//Need to use toLowerCase to ensure matches are correct
                        {
                            return 1;
                        } else if (a.text.toLowerCase() < b.text.toLowerCase()) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
                $('#' + options['to']).empty().append(items);
            }
        }

        if (fn === "msToggleSelectAll") {
            /**
             * Method to select or deselect all values in a multiple select box.
             *
             * @param	object	options		An associative array of parameters
             * 		@param string 	select		Defines the id of the multiple select box where you want all values selected.
             *		@param string 	deseelct	Defines the id of the multiple select box where you want all values deselected.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    select: "",
                    deselect: ""
                },
                args
            );

            $('#' + options['select']).each
            (
                function () {
                    $('#' + options['select'] + ' option').attr("selected", "selected");
                }
            );

            $('#' + options['deselect']).each
            (
                function () {
                    $('#' + options['deselect'] + ' option').removeAttr("selected");
                }
            );
        }

        if (fn === "msOrder") {
            /**
             * Method to reorder select options inside a multiple select box. 
             *
             * @param	object	options		An associative array of parameters
             * 		@param string 	id	Defines the multiple select box.
             *		@param string   dir	Defines the direction to move selected elements.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    id: "",
                    dir: ""
                },
                args
            );

            if (options['dir'] == 'up') {
                $('#' + options['id'] + ' option:selected').each
                (
                    function () {
                        if (!$(this).prev().length) return false;
                        $(this).insertBefore($(this).prev());
                    }
                );
                $('#' + options['id']).focus().blur();
            }

            if (options['dir'] == 'down') {
                $($('#' + options['id'] + ' option:selected').get().reverse()).each(function (i, selected) {
                    if (!$(this).next().length) return false;
                    $(this).insertAfter($(this).next());
                });
                $('#' + options['id']).focus().blur();
            }
        }
    }
}(jQuery)
);


// jQuery.daxle.cloak
(function ($, undefined) {
    $.daxle.cloak = function (args, fn) {
        if (fn == "" || fn == 0 || fn == '0' || fn == null || fn == false) {
            /**
             * Method to toggle the display of specified elements.
             *
             * @param object options		Defines an associative list of parameters.
             * @param string element		Defines the id of the element to toggle the display of.		
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    element: "",
                    field_id: ""
                },
                args
            );

            var e_length = options['element'].length;
            for (var i = 0; i < e_length; i++) {
                $('#' + options['element'][i]).toggle();
            };
        }
    }
}(jQuery)
);


// jQuery.daxle.datepicker ()
/*( function($, undefined )
	{
		$.daxle.datepicker	= function (fn, args)
		{
		    alert("herere");
			//alert(fn['calformat']);
			var options = $.extend
			(
				{
					calformat : "dd-mm-yy"
				},
				fn
			);
			//alert( options["calformat"] );
			$( '.daxlepicker' ).datepicker( {
				dateFormat: options["calformat"]
			});
		}
	}( jQuery )
);*/


// jQuery.daxle.lytebox (l2)
(function ($, undefined) {
    $.daxle.lytebox = function (fn, args) {
        if (fn === "load") {
            /**
             * Method for rendering a lightbox for modal views
             *
             * @param object options		An associative array of parameters
             * 		@param int width		Defines a width to set the lightbox to, in pixels ( optional ).
             *  	@param int height		Defines a height to set the lightbox to, in pixels (optional ).
             *  	@param int vscroll		Defines whether to allow vertical scrolling ( 1 = yes, 0 = no ).
             *  	@param int overlay	    Defines whether to only call the overlay, set this to 1 ( true ), else 0 ( false ).
             *
             * @return void
             *
             * @since 1.0
             */
            $("#\\:B\\:JC\\:LB").resizable();
            var options = $.extend
            (
                {
                    // Default values
                    width: "",
                    height: "",
                    vscroll: 1,
                    overlay: 0,
                    ui: ""
                },
                args
            );

            if (options['overlay'] === 1) {
                // Here we render the elements of the lytebox overlay

                $('#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB\\:O\\:x').animate({ 'opacity': '.50' }, 300, 'linear');
                $('#\\:B\\:JC\\:LB\\:O\\:x').animate({ 'opacity': '1.00' }, 300, 'linear');
                $('#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB\\:O\\:x').css('display', 'block');
            } else {
                // Here we render the elements of the lytebox

					// If a progress bar is requested, we have to hide the lytebox_xml in place of the progress-xml
					if( options['ui'] === 'pbar' )
					{
						$( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x' ).animate( { 'opacity': '.50' }, 300, 'linear' );
						$( '#\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x' ).animate( { 'opacity': '1.00' }, 300, 'linear' );
						$( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x' ).css( 'display', 'block' );
					}else
					{
						$( '#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x' ).animate( { 'opacity': '.50' }, 300, 'linear' );
						$( '#\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x' ).animate( { 'opacity': '1.00' }, 300, 'linear' );
						$('#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x').css('display', 'block');
						$('#\\:B\\:JC\\:LB').css('width', options['width']);
					}

                // This enables users to scroll content that overflows the lightbox container
                if (options['vscroll'] == 1) {
                    $('#\\:B\\:JC\\:LB').css('overflow-y', 'none');
                } else {
                    $('#\\:B\\:JC\\:LB').css('overflow-y', 'none');
                }

                if (options['height'] != '' && options['height'] != null) {
                    $('#\\:B\\:JC\\:LB').height(options['height']);
                } else if ($('#\\:B\\:JC\\:LB').height() > ($('#\\:B\\:JC\\:LB\\:O').height() * .75)) {
                    $('#\\:B\\:JC\\:LB').height(($('#\\:B\\:JC\\:LB\\:O').height() * .75));
                } else if (jQuery('#\\:B\\:JC\\:LB').height() < 200) {
                    $('#\\:B\\:JC\\:LB').height(200);
                }

                /* 
                    Here we divide the width and height of the lytebox in half, and sutract those values
                    from the corresponding margins to keep the lytebox in the center of the screen.
                    We have to set the left and top via javascript, otherwise the display is glitchy and will
                    not behave properly.
                */
                $('#\\:B\\:JC\\:LB').css('left', '50%');
                $('#\\:B\\:JC\\:LB').css('margin-left', -($('#\\:B\\:JC\\:LB').width() / 2));

                /* 
                    Here we set the offset and width of the header div after the main div has been modified to prevent any undesired behavior
                    $( '#\\:B\\:JC\\:LB\\:h' ).css( 'margin-left', '-13px' );
                    $( '#\\:B\\:JC\\:LB\\:h' ).css( 'margin-top', '-32px' );
                    $( '#\\:B\\:JC\\:LB\\:h' ).width( $( '#\\:B\\:JC\\:LB' ).width() + 10 );
                */
                $('#\\:B\\:JC\\:LB').draggable
                (
                    {
                        handle: '#\\:B\\:JC\\:LB\\:h'
                    }
                );
            }
        }

        if (fn === "close") {
            clearInterval(intervalCwExistsusrsync);
            if (document.getElementById("reloadPage") && document.getElementById("reloadPageForm")) {	// This will reload parent page before popup close.
                reloadViewName = document.getElementById("reloadPage").value;
                reloadFormName = document.getElementById("reloadPageForm").value;
                catDpaginate = document.getElementById("dpaginate").value;
                catSearchKeyword = document.getElementById("search_keyword").value;
                //	alert( reloadViewName );
                //	alert( reloadFormName ); return;
                if (reloadFormName == "adminFormCat" && reloadViewName == "commerce") {
                    jQuery.daxle.display({ disp: reloadViewName, ui: reloadViewName, type: 'admin', data: { dpaginate: '' + catDpaginate + '', search_keyword: '' + catSearchKeyword + '' }, method: 'POST' });
                } else {
                    jQuery.daxle.display({ disp: reloadViewName, ui: reloadViewName, type: 'admin', data: { type: 'submitForm', formName: 'reloadFormName' }, method: 'POST' });
                }
            }
            /**
             * Method to close the lytebox.	
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    ui: ""
                },
                args
            );

            var lyteboxElements;

            // Here we hide the lytebox and overlay
            if (options['ui'] === 'pbar') {
                lyteboxElements = $('#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:x');
            } else {
                lyteboxElements = $('#\\:B\\:JC\\:LB\\:O, #\\:B\\:JC\\:LB, #\\:B\\:JC\\:LB\\:pb\\:x');
            }

            lyteboxElements.animate
            (
                { 'opacity': '0' },
                300,
                'linear',

                function () {
                    lyteboxElements.css('display', 'none');
                    $('#\\:B\\:JC\\:LB\\:x').html('');

                    /*
                     Here we unset everything we set in renderlytebox() so that all the css values we set are unset and we have no conflicts.
                     Removing this will make it so that after opening a small modal, opening a large one will make the display
                     behave improperly.  In order to correct this, unsetting values we manually set with jQuery is required.
                    */

                    //document.getElementById( ':B:JC:LB:x' ).innerHTML = 'Please wait..'; // Was throwing an error in firebug that the element was not found...so no need :)
                    $('#\\:B\\:JC\\:LB').css('display', 'none');
                    $('#\\:B\\:JC\\:LB').css('left', '');
                    $('#\\:B\\:JC\\:LB').css('top', '');
                    $('#\\:B\\:JC\\:LB').css('margin-left', '');
                    $('#\\:B\\:JC\\:LB').css('margin-top', '');

                    $('#\\:B\\:JC\\:LB').css('width', 'auto');
                    $('#\\:B\\:JC\\:LB').css('height', 'auto');
                    $('#\\:B\\:JC\\:LB').css('overflow-y', 'hidden');
                    $('#\\:B\\:JC\\:LB\\:h').css('margin-left', '');
                    $('#\\:B\\:JC\\:LB\\:h').css('margin-top', '');
                    $('#\\:B\\:JC\\:LB\\:h').width();
                }
            );
        }
    }
}(jQuery)
);


// jQuery.daxle.slider
(function ($, undefined) {
    $.daxle.slider = function (args) {
        /**
         * Method for rendering a slider effect on Check-boxes
         *
         * @param	object	options		An associative array of parameters
         * 		@param string 	slider	Defines the id of the slider element.
         *  	@param string 	target	Defines the id of the check-box to manipulate.
         *  	@param string 	msg		Defines the msg to display in slider button.
         *  	@param bool		init	Not used.
         *
         * @return void
         *
         * @since 1.0
         */
        var options = $.extend
        (
            {
                // Default values
                slider: "",
                target: "",
                msg: {},
                init: 0
            },
            args
        );

        if ($('#' + options['target']).is(':checked')) {
            $('#' + options['slider']).removeClass('on');
            $('#' + options['slider']).html(options['msg'][1]);
            $('#' + options['target']).removeAttr('checked');
        } else {
            $('#' + options['slider']).addClass('on');
            $('#' + options['slider']).html(options['msg'][0]);
            $('#' + options['target']).prop('checked', 'checked');
        }
    }
}(jQuery)
);


// jQuery.daxle.test
(function ($, undefined) {
    $.daxle.test = function (fn, args) {
        if (fn === "restkey") {
            /**
             * Method to test and set the member REST API key if its valid
             *
             * @param	object	options		An associative array of parameters
             * 		@param string 	element	Defines the id of the checkbox that determines if we will use user entered credentials, or pull credentials from the db.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    element: ""
                },
                args
            );
            var memberId = $('#rest_key_member_id').val();												
			$.daxle.display({ disp: 'configuration', ui: 'checkapimssql', type: 'testrestkey', data: { memberId: memberId, checktype: 'restkey' } });
            return true;
        }
		
		if (fn === "checkrestkey") {
            /**
             * Method to test the REST API key
             *
             * @param	object	options		An associative array of parameters
             * 		@param string 	element	Defines the id of the checkbox that determines if we will use user entered credentials, or pull credentials from the db.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    element: ""
                },
                args
            );
            var privateKey = $('#__jcd_rest_private_key').val();
			var publicKey = $('#__jcd_rest_public_key').val();
			var cwRestURL = $('#__jcd_def_cw_rest_url').val();
			$.daxle.display({ disp: 'configuration', ui: 'checkapimssql', type: 'checkrestkey', data: { privateKey: privateKey, publicKey: publicKey, cwRestURL: cwRestURL, checktype: 'checkrestkey' } });
            return true;
        }
		
		if (fn === "api") {
            /**
             * Method to test the API connection to ConnectWise from JoomConnect
             *
             * @param	object	options		An associative array of parameters
             * 		@param string 	element	Defines the id of the checkbox that determines if we will use user entered credentials, or pull credentials from the db.
             *
             * @return void
             *
             * @since 1.0
             */
            var options = $.extend
            (
                {
                    // Default values
                    element: ""
                },
                args
            );
            var manualInsert = $('#auth_man_api_cred').is(':checked')										// Check Manually Insert Credentials is check or not.
            var log_id = $('#__jcd_def_api_int_id').val();												// Integrator Id
            var log_pwd = $('#__jcd_def_api_int_pwd').val();												// Integrator Password
            var log_api_id = $('#__jcd_def_api_int').val();													// Integrator Numeric Id same as Table ID
            var cmp_name = $('#__jcd_def_cw_company_name').val();												// Connectwise Company for CURL
            var cmp_url = $('#__jcd_def_cw_api_url').val();													// Company Api URL for CURL
            $.daxle.display({ disp: 'configuration', ui: 'checkapimssql', type: 'testapi', data: { manualInsert: manualInsert, log_id: log_id, log_pwd: log_pwd, log_api_id: log_api_id, cmp_name: cmp_name, cmp_url: cmp_url, formName: 'adminForm' }, method: 'POST' });
            return true;
        }

        if (fn === "mssql") {
            /**
             * Method to test the MSSQL connection to ConnectWise from JoomConnect
             *
             * @return void
             *
             * @since 1.0
             */
            var mssql_hst = $('#__jcd_def_mssql_hst').val();													// MSSQL HOST
            var mssql_prt = $('#__jcd_def_mssql_prt').val();													// MSSQL PORT
            var mssql_db = $('#__jcd_def_mssql_db').val();														// MSSQL DATABASE
            var mssql_usr = $('#__jcd_def_mssql_usr').val();													// MSSQL USERNAME
            var mssql_pwd = $('#__jcd_def_mssql_pwd').val();													// MSSQL PASSWORD
            var tm = new Date().getTime();
            $.daxle.display({ disp: 'configuration', ui: 'checkapimssql', type: 'testmssql', data: { mssql_hst: mssql_hst, mssql_prt: mssql_prt, mssql_db: mssql_db, mssql_usr: mssql_usr, mssql_pwd: encodeURIComponent(mssql_pwd), checktype: 'MSSQL', tm: tm } });
        }
    }
}(jQuery)
);


// jQuery.daxle.pbar
(function ($, undefined) {
    $.daxle.pbar = function (fn, args) {
        if (fn == "" || fn == 0 || fn == '0' || fn == null || fn == false) {
            // We'll hide the retry button as soon as the progress bar or action that uses the progress bar is started
            $('#__jcd_pbar_retry_btn').hide();

            var progressbar = $('#progressbar'),
                                                progresslabel = $('.progress-label');

            // The centering of the label at first is off, so let's set it manually to be centered.
            var distance = progresslabel.width() / 2;
            progresslabel.css('margin-left', -distance);

            // Prep the progress bar.
            progressbar.progressbar
            (
                {
                    value: false,
                    change: function () {
                        // When the change method is running, the label is centered properly for some reason (wtf jQuery??), so let's remove our CSS fix.
                        progresslabel.css('margin-left', '0');

                        progresslabel.text(progressbar.progressbar('value') + '%');
                    },
                    complete: function () {
                        progresslabel.text('Complete!');

                        // The centering of the label will be off again, so let's set it manually to be centered one last time.
                        distance = progresslabel.width() / 2;
                        progresslabel.css('margin-left', -distance);

                        // Show the retry button after the action is complete and progress bar has completed (reached 100% and finished)
                        $('#__jcd_pbar_retry_btn').show();
                    }
                }
            );
        }

        if (fn == "check") {
            // First grab a page which can see the PHP Session Variable, and embed it into an HTML Element.
            $.daxle.display({ disp: "configuration", ui: "pbar_status", type: "progress" });
        }

        if (fn == "update") {
            var progressbar = $('#progressbar'),
                                                progresslabel = $('.progress-label');

            // Next, get the string value from the HTML Element
            var strVal = $('#pbar_status').find('#dsystem_progress').html();

            // Convert the string value to an integer value with a radix of 10 for accurate readings.
            var intVal = parseInt(strVal, 10);

            //alert( strVal );
            //alert( intVal );

            // Finally, set the progressbar value (Only very long scripts will process slowly, most of the time the script will finish before the first progress call is made.)
            progressbar.progressbar('value', intVal);

            // If we're not at 100% progress complete, we'll schedule this method to run again.
            if (intVal < 99) {
                setTimeout
                (
                    function () {
                        $.daxle.pbar('check');
                    },
                    100
                );
            }
        }

        if (fn == "" || fn == 0 || fn == '0' || fn == null || fn == false) {
            // Since we've only just defined the progress bar, let's call our progress checking method for the first time, 3 seconds after the page finishes loading.
            setTimeout
            (
                function () {
                    $.daxle.pbar('check');
                },
                3000
            );
        }
    }
}(jQuery)
);


// jQuery.daxle.resetForm
(function ($, undefined) {
    $.daxle.resetForm = function (btn) {
        var form = $(btn).closest('fieldset');
        $.each
		(
			$(form).find(':input:not(:button):not(:reset)'),
			function (key, val) {
			    var type = $(val)[0].nodeName.toLowerCase();
			    if (type === 'input') {
			        $(val).attr('value', '');
			        $(val).val('');
			    } else if (type === 'select') {
			        var id = $(val).attr('id');
			        $('#' + id + ' > option').each
					(
						function () {
						    $(this).removeAttr('selected');
						}
					);
			    }
			}
		);

        $(btn).closest('.dcbc').find("#__jcd_btn").click();
    }
}(jQuery)
);


// jQuery.daxle.getFile
(function ($, undefined) {
    $.daxle.getFile = function () {
        /**
		 * Method to get the forms export and provide a download.
		 *
		 * @return void
		 *
		 * @since 1.0
		 */

        $("body").append("<iframe src='/libraries/daxle/export/forms_UNZIP_FIRST.zip' style='display: none;' ></iframe>");
    }
}(jQuery)
);

// jQuery.daxle.isChecked
(function ($, undefined) {
    $.daxle.checkAll = function (thisform) {
        /**
		 * Method to update the boxchecked value in the form field.
		 *
		 * @return void
		 *
		 * @since 1.0
		**/
        //alert("here");
        /*var checkedStatus = this.checked;
		alert( checkedStatus );
		if( $( ".dicb" ).is( ':checked' ) )
		{
			//$(this).prop('checked',false);
			alert( "is checked" );
			$( 'form#' + thisform + ' dmcl' ).find( 'input[type=checkbox]' ).each( function()
			{
				$( this ).prop( 'checked', true );
			} );
		} else
		{
			//$(this).prop('checked',true);
			alert( "not checked" );
		}
		jQuery( "form#" + thisform ).find( "input[type=checkbox]" ).prop( "checked", checkedStatus );
		var count = jQuery( "form#" + thisform ).find( "input[type=checkbox]:checked" ).length;
		jQuery( "form#" + thisform ).find( "input[name=boxchecked]" ).val( count - 1 );*/
    }
}(jQuery)
);

// jQuery.daxle.isChecked
(function ($, undefined) {
    $.daxle.isChecked = function (a, thisform) {
        /**
		 * Method to update the boxchecked value in the form field.
		 *
		 * @return void
		 *
		 * @since 1.0
		**/
        var dValue = jQuery("form#" + thisform + " .boxchecked").val();
        if (!0 == a) {
            jQuery("form#" + thisform + " .boxchecked").val(Number(dValue) + Number("1"));
        } else {
            jQuery("form#" + thisform + " .boxchecked").val(Number(dValue) - Number("1"));
        }
    }
}(jQuery)
);


// jQuery.daxle.searchKeydown
(function ($, undefined) {
    $.daxle.searchKeydown = function (event) {
        /**
		 * Method to control key bindings on search fields in various views. This will allow you to submit search by pressing Enter and 
		 * use browser autocomplete history as well.
		 *
		 * @return void
		 *
		 * @since 1.0
		**/

        var field = event.currentTarget;
        if (event.keyCode == 13)	// If key pressed is enter key, enter here
        {
            event.preventDefault();
            setTimeout
			(
				function () {
				    $(field).closest('.dcbc').find("#__jcd_btn").click();
				},
				10
			);
        }
    }
}(jQuery)
);

// jQuery.daxle.AdvSearchHS
(function ($, undefined) {
    $.daxle.AdvSearchHS = function (classes) {
        $(" .AdvSearchHS ").toggle();
    }
}(jQuery)
);

// Find and Replace function
function findAndReplace(text, skipSectionWise) {
    /**/if (text != "") {
        text = text.replace("\\r\\n", "\\\\r\\\\n", "g");	// To handle text area where newline code comes with "\r\n".
        text = text.replace("\\n", "\\\\n", "g");		    // To handle text area where newline code comes with "\n".
        text = text.replace(/\n/g, '\r\n');
        text = text.replace(/\\n/g, "\\\\r\\\\n");		    // To handle text area where newline code comes with "\n".
        text = text.replace(/'/g, "--__--");				// To handle single quote (').		
        if (skipSectionWise != "formEvent") {
            text = text.replace(/"/g, '\\"');					// To handle double quote (").
        }
        text = text.replace(/&/g, '%26');					// To handle ampersand (&).
        text = text.replace(/\+/g, '#plus#');					// To handle ampersand (&).
    }
    return text;
}

/*
 * Method to convert special character values to String.
*/
function rhtmlspecialchars(str) {
    if (typeof (str) == "string") {
        str = str.replace(/&gt;/ig, ">");
        str = str.replace(/&lt;/ig, "<");
        str = str.replace(/&#39;/g, "'");
        str = str.replace(/&quot;/ig, '"');
        str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
    }
    return str;
}

/*
 * Method to convert special character values to String.
*/
function htmlspecialchars(str) {
    if (typeof (str) == "string") {
        str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
    }
    return str;
}

// IsJsonString function
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// Function to toggle version text on the News & Updates view
function toggleVersion(ver) {
    jQuery.each
	(
		jQuery('.dvn'),
		function (i) {
		    jQuery('.dli' + i).hide();
		}
	);

    jQuery('.' + ver).show();
}


// jQuery.daxle.showFullNameMobile
(function ($, undefined) {
    $.daxle.showFullNameMobile = function (event) {
        var toggleWidth = $("#applyPhone_" + event).width() == 80 ? "200px" : "80px";
        $(" #applyPhone_" + event).animate({ width: toggleWidth });
    }
}(jQuery)
);



// jQuery.daxle.lastPassMoveSteps
(function ($, undefined) {
    $.daxle.lastPassMoveSteps = function (event) {
        if (event == 'firstNextStep') {
            jQuery(".firstPage").hide();
            jQuery(".secondPage").show();
            jQuery(".thirdPage").hide();
        }
        else if (event == 'secondNextStep') {
            jQuery(".firstPage").hide();
            jQuery(".secondPage").hide();
            jQuery(".thirdPage").show();
        }
    }
}(jQuery)
);

// jQuery.daxle.lastPassBackSteps
(function ($, undefined) {
    $.daxle.lastPassBackSteps = function (event) {
        if (event == 'secondBackStep') {
            jQuery(".firstPage").show();
            jQuery(".secondPage").hide();
            jQuery(".thirdPage").hide();
        }
        else if (event == 'ThirdBackStep') {
            jQuery(".firstPage").hide();
            jQuery(".secondPage").show();
            jQuery(".thirdPage").hide();
        }
    }
}(jQuery)
);

// jQuery.daxle.updatStartTime 
( function( $, undefined )
{
	$.daxle.updatStartTime = function(event,val)
	{
		var StartTimeHidden = $('#StartTimeHidden').val();
		var splitStr 		= StartTimeHidden.split(':');
		
		if( typeof splitStr[1] == 'undefined' || splitStr[1] == '' )
		{
			splitStr[1] = '00';
		}
		if( typeof splitStr[2] == 'undefined' || splitStr[2] == '' )
		{
			splitStr[2] = '00';
		}
		if(event == 'hh')
		{
			var finalTimeForHour = val+':'+splitStr[1]+':'+splitStr[2];
			$('#StartTimeHidden').val(finalTimeForHour);
		}
		else if(event == 'mm')
		{
			var finalTimeForMin = splitStr[0]+':'+val+':'+splitStr[2];
			$('#StartTimeHidden').val(finalTimeForMin);
		}
		else 
		{
			var finalTimeForSec = splitStr[0]+':'+splitStr[1]+':'+val;
			$('#StartTimeHidden').val(finalTimeForSec);
		}
	}
}( jQuery )
);

// jQuery.daxle.updatEndTime 
(function ($, undefined) {
    $.daxle.updatEndTime = function (event, val) {
        var EndTimeHidden = $('#EndTimeHidden').val();
        var splitStr = EndTimeHidden.split(':');

        if (typeof splitStr[1] == 'undefined' || splitStr[1] == '') {
            splitStr[1] = '00';
        }
        if (typeof splitStr[2] == 'undefined' || splitStr[2] == '') {
            splitStr[2] = '00';
        }
        if (event == 'hh') {
            var finalTimeForHour = val + ':' + splitStr[1] + ':' + splitStr[2];
            $('#EndTimeHidden').val(finalTimeForHour);
        }
        else if (event == 'mm') {
            var finalTimeForMin = splitStr[0] + ':' + val + ':' + splitStr[2];
            $('#EndTimeHidden').val(finalTimeForMin);
        }
        else {
            var finalTimeForSec = splitStr[0] + ':' + splitStr[1] + ':' + val;
            $('#EndTimeHidden').val(finalTimeForSec);
        }
    }
}(jQuery)
);

(function ($, undefined) {
    $.daxle.validate_config = function () {
        var con_err = 0;
        var def_company_type = $('select[name="def_company_type"]').val();
        var def_jgrp_sync = $('select[name="def_jgrp_sync"]').val();
        var def_prtl_sec = $('select[name="def_prtl_sec"]').val();
        var err_msg = '';
        //console.log($('.def_company_type option').length);
        if (def_company_type == '' && $('.def_company_type option').length > 1) {
            err_msg = "Please select default company type.\n";
            con_err = 1;
        }
        if (def_jgrp_sync == '' && $('.def_jgrp_sync option').length > 1) {
            err_msg = err_msg + "Please select default Joomla group.\n";
            con_err = 1;
        }
        if (def_prtl_sec == '' && $('.def_prtl_sec option').length > 1) {
            err_msg = err_msg + "Please select Portal Security level.\n";
            con_err = 1;
        }
        if (con_err == 0) {
            $.daxle.display({ disp: "configuration", ui: "configuration", cmd: "saveConfiguration", type: "admin", data: { type: "submitForm", formName: "adminForm", resultSet: "1" }, method: "POST" });
        } else {
            alert(err_msg);
        }
    }
	
}(jQuery)
);