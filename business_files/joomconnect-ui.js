/*!	
 * Daxle jQuery Plugin - v1.0.0 - 2013-05-15
 * 
 *
 * @version   $Id$
 * @author    Directive http://www.directive.com
 * @copyright Copyright (C) 2008 - 2013 Directive Technology Inc
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 *
 * YOU MAY NOT USE THIS WITHOUT EXPLICIT PERMISSION.
 *
 * What this file does is handle all interactive elements within the parent browser
 * of the daxle application for JoomConnect, ranging from simple button clicks to menus etc.
 *
 * Please take note to how this application is set up and try to take note of all of the
 * function calls that take place, as there are handlers in other files which handle
 * get/post requests from this function.  This copy is for Joomla! only.  Another
 * version will need to be created for any other CMS.
 */
var intervalAdminLogin;
jQuery(function ($) {
    /* Need to get Joomla timeout value */
    window.lifetime = getCookie("Lifetime") * 60 * 1000;

    /* BUTTONS & VARIABLES */
    //var c_sid									= '<?php //echo session_id() ?>';							// Current session id.s
    var lytebox_olay = jQuery('#jcd_lytebox_olay');								// The overlay for the lightbox
    var msgbx = jQuery('#jcd_msg_box');									// The message div for JC System Messages
    //var disp									= jQuery( '.curDisp' ).html();								// Get current display to set submenu on page load
    /////window.timer								= setTimeout( "location.href = '/';", window.lifetime );
    //intervalCwExistsusrsync = setInterval( function() { checkAdminLogin() }, 900000 );
    // The top navigation object
    var topNav =
		{
		    // Tab containers
		    li:
			{
			    controlpnl: $(document.getElementById(':H:MN:C:cp')),			// Home - Defaults to the control panel
			    configuration: $(document.getElementById(':H:MN:C:cfg')),			// Configuration - Defaults to Configuration
			    mktgrps: $(document.getElementById(':H:MN:C:jcacl')),		// JCACL - Defaults to Marketing Groups
			    users: $(document.getElementById(':H:MN:C:jcusr')),		// JCUser - Defaults to Users
			    forms: $(document.getElementById(':H:MN:C:forms')),		// Forms - Defaults to forms list
			    mailchimp: $(document.getElementById(':H:MN:C:addons')),              // QCP - Defaults to QCP - Mailchimp
			    log: $(document.getElementById(':H:MN:C:logs'))			// Logs - Defaults to logs
			},

		    // tab buttons
		    btn:
			{
			    controlpnl: $(document.getElementById(':H:MN:B:cp')),
			    configuration: $(document.getElementById(':H:MN:B:cfg')),
			    mktgrps: $(document.getElementById(':H:MN:B:jcacl')),
			    users: $(document.getElementById(':H:MN:B:jcusr')),
			    forms: $(document.getElementById(':H:MN:B:forms')),
			    mailchimp: $(document.getElementById(':H:MN:B:addons')),
			    log: $(document.getElementById(':H:MN:B:logs')),
			    lastpass: $(document.getElementById(':H:MN:B:lastpass'))
			},

		    // Sub menu containers
		    div:
			{
			    container: $(document.getElementById(':H:SN:C')),
			    controlpnl: $(document.getElementById(':H:SN:C:cp')),
			    configuration: $(document.getElementById(':H:SN:C:cfg')),
			    mktgrps: $(document.getElementById(':H:SN:C:jcacl')),
			    users: $(document.getElementById(':H:SN:C:jcusr')),
			    forms: $(document.getElementById(':H:SN:C:forms')),
			    mailchimp: $(document.getElementById(':H:SN:C:addons')),
			    log: $(document.getElementById(':H:SN:C:logs'))
			},

		    // Main menu sub menu containers
		    mdiv:
			{
			    controlpnl: $(document.getElementById(':H:N:S:cp')),
			    configuration: $(document.getElementById(':H:N:S:cfg')),
			    mktgrps: $(document.getElementById(':H:N:S:jcacl')),
			    users: $(document.getElementById(':H:N:S:jcusr')),
			    forms: $(document.getElementById(':H:N:S:forms')),
			    mailchimp: $(document.getElementById(':H:N:S:addons')),
			    log: $(document.getElementById(':H:N:S:logs'))
			},

		    // Main menu sub menu buttons
		    msub:
			{
			    newsupd: $(document.getElementById(':H:N:S:newsupd')),
			    compat: $(document.getElementById(':H:N:S:cmptbl')),
			    configuration: $(document.getElementById(':H:N:S:config')),
			    integration: $(document.getElementById(':H:N:S:intgrt')),
			    language: $(document.getElementById(':H:N:S:libmng')),
			    rollback: $(document.getElementById(':H:N:S:rollback')),
			    mktgrps: $(document.getElementById(':H:N:S:mktgrps')),
			    tracks: $(document.getElementById(':H:N:S:tracks')),
			    users: $(document.getElementById(':H:N:S:users')),
			    usrpmssns: $(document.getElementById(':H:N:S:usrpmssns')),
			    usrsync: $(document.getElementById(':H:N:S:usrsync')),
			    mngcontact: $(document.getElementById(':H:N:S:mngcontact')),
			    usrnosync: $(document.getElementById(':H:N:S:usrnosync')),
			    usrprtlassn: $(document.getElementById(':H:N:S:usrprtlassn')),
			    usersnotincw: $(document.getElementById(':H:N:S:usersnotincw')),
			    forms: $(document.getElementById(':H:N:S:mngfrms')),
			    mngfields: $(document.getElementById(':H:N:S:mngfields')),
			    mngstates: $(document.getElementById(':H:N:S:mngstates')),
			    commerce: $(document.getElementById(':H:N:S:qckcom')),
			    mailchimp: $(document.getElementById(':H:N:S:qcp')),
			    qckcmpgncds: $(document.getElementById(':H:N:S:qckcmpgncds')),
			    qckgotointgrt: $(document.getElementById(':H:N:S:qckgotointgrt')),
			    queue: $(document.getElementById(':H:N:S:queue')),
			    log: $(document.getElementById(':H:N:S:log'))
			},

		    msubsub:
            {
                mailchimp: $(document.getElementById(':H:N:S:qcpmc')),
                constantcontact: $(document.getElementById(':H:N:S:qcpcc')),
                lastpass: $(document.getElementById(':H:N:S:lastpass')),
            },

		    // Sub menu buttons
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
			    qckcmpgncds: $(document.getElementById(':H:SN:B:qckcmpgncds')),
			    qckgotointgrt: $(document.getElementById(':H:SN:B:qckgotointgrt')),
			    queue: $(document.getElementById(':H:SN:B:queue')),
			    log: $(document.getElementById(':H:SN:B:log'))
			},

		    // Drop down buttons
		    drop:
			{
			    int_psa: {
			        'id': $(document.getElementById(':H:SN:B:intgrt:psa')),
			        'parentID': $(document.getElementById(':H:SN:B:intgrt')),
			        'parentName': 'integration'
			    },
			    int_email: {
			        'id': $(document.getElementById(':H:SN:B:intgrt:email')),
			        'parentID': $(document.getElementById(':H:SN:B:intgrt')),
			        'parentName': 'integration'
			    },
			    int_extension: {
			        'id': $(document.getElementById(':H:SN:B:intgrt:extension')),
			        'parentID': $(document.getElementById(':H:SN:B:intgrt')),
			        'parentName': 'integration'
			    },
			    int_api: {
			        'id': $(document.getElementById(':H:SN:B:intgrt:api')),
			        'parentID': $(document.getElementById(':H:SN:B:intgrt')),
			        'parentName': 'integration'
			    },
			    int_portal: {
			        'id': $(document.getElementById(':H:SN:B:intgrt:portal')),
			        'parentID': $(document.getElementById(':H:SN:B:intgrt')),
			        'parentName': 'integration'
			    }
			}

		};// End topNav variable definition.

    // Remove href attribute from the overlay.  We also close the lytebox if it is clicked.
    lytebox_olay.removeAttr('href');

    // Let's build the UI system for the JC Administration section.
    $.each
	(
		topNav,								// For each topNav element,
		function (key, val) {
		    //alert( key + ": " + val );		// Key will be li, a, div, sub or drop.  Val will be of object type.
		    switch (key) {
		        case 'li':
		            {
		                // Create the functions for all of the tabs.
		                $.each
                        (
                            val,
                            function (k, v) {
                                // Remove HREF attributes.
                                v.removeAttr('href');

                                // Declare and define the 'on' 'click' event handler.
                                v.on
                                (
                                    'click',
                                    this,
                                    function (e) {
                                        // Add condition for the form builder. Need to inform user that unsaved progress will be lost if they leave it
                                        if (($('.dfbolay').length) && ($(e.target).closest('.dfbolay').length == 0)) {
                                            var msg = "Leaving the form builder will cause you to lose any unsaved progress! Continue?";
                                            $('<div></div>').appendTo('body').html('<div>' + msg + '</div>').dialog
                                            (
                                                {
                                                    modal: true,
                                                    title: 'Warning',
                                                    zIndex: 10000,
                                                    autoOpen: true,
                                                    width: 'auto',
                                                    resizable: false,
                                                    dialogClass: 'ddialog',
                                                    buttons: [
                                                    {
                                                        text: 'Yes',
                                                        //class: 'dcfb-dialog',
                                                        click: function () {
                                                            $(this).dialog('close');

                                                            clearTimeout(window.timer);
                                                            /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

                                                            // Remove the 'active' class from all of the li elements.
                                                            $.each
                                                            (
                                                                topNav['li'],
                                                                function (x, y) {
                                                                    y.removeClass('active');
                                                                }
                                                            );

                                                            // Add the 'active' class to the clicked li element.
                                                            // All li elements follow the format:  [identifier]:H:MN:C:[element_id]
                                                            v.addClass('active');

                                                            // Remove the 'active' class from all of the a elements
                                                            $.each
                                                            (
                                                                topNav['btn'],
                                                                function (x, y) {
                                                                    y.removeClass('active');
                                                                }
                                                            );

                                                            // Add the 'active' class to the respective element.
                                                            // All btn elements follow the format:  [identifier]:H:MN:B:[element_id]
                                                            $(document.getElementById(':H:MN:B:' + translateNav({ type: "flag", flag: k }))).addClass('active');

                                                            // Hide all of the div elements (except for the submenu containing div)
                                                            $.each
                                                            (
                                                                topNav['div'],
                                                                function (x, y) {
                                                                    if (x !== "container") {
                                                                        y.hide();
                                                                    }
                                                                }
                                                            );

                                                            // Show the div element.
                                                            // All div elements follow the format:  [identifier]jcd_sub_[element_id]
                                                            if (k == "controlpnl") {
                                                                // If the home tab is clicked, we will actually hide the container div
                                                                topNav['div']['container'].hide();

                                                                // Don't forget to set the place holder
                                                                var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + $('#__jcd_tn_icon_controlpnl').text() + "</div>";

                                                                // Let's clear the classes from the placeholder
                                                                $(document.getElementById(':H:N:Ph')).removeClass();
                                                                $(document.getElementById(':H:N:Ph')).addClass('dtnhb');
                                                                $(document.getElementById(':H:N:Ph')).html(innerText);

                                                                // And send the user to a new page
                                                                $.daxle.display({ disp: 'controlpnl', type: 'admin' });
                                                            } else {
                                                                // Otherwise, we will show the container div and respective sub menu div element.
                                                                topNav['div']['container'].show();
                                                                /*
                                                                if( k == "configuration" )
                                                                {
                                                                    $( document.getElementById( ':H:SN:C:cfg' ) ).show();
                                                                }else
                                                                {*/
                                                                topNav['div'][k].show();
                                                                //}

                                                                // Remove the active class from all submenu items
                                                                $.each
                                                                (
                                                                    topNav['sub'],
                                                                    function (x, y) {
                                                                        y.removeClass('active');
                                                                    }
                                                                );
                                                                //alert("294");
                                                                // Add the active class to the respective submenu item
                                                                topNav['sub'][k].addClass('active');

                                                                // Don't forget to set the place holder by first building the proper html
                                                                var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + $('#__jcd_tn_icon_' + translateNav({ type: "text", flag: k })).text() + "</div>";

                                                                // Clearing the classes from the placeholder
                                                                $(document.getElementById(':H:N:Ph')).removeClass();

                                                                // Resetting the placeholder class attribute
                                                                $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

                                                                // Adding the current active class to load the proper icon
                                                                $(document.getElementById(':H:N:Ph')).addClass('dmnc-' + translateNav({ type: "flag", flag: k }));

                                                                // And finally setting the placeholder text
                                                                $(document.getElementById(':H:N:Ph')).html(innerText);
                                                                // Also, redirect the user as they've requested
                                                                $.daxle.display({ disp: k, type: 'admin' });
                                                            }
                                                        }
                                                    },
                                                    {
                                                        text: 'No',
                                                        //class: 'dcfb-dialog',
                                                        click: function () {
                                                            $(this).dialog('close');
                                                            return false;
                                                        }
                                                    }],
                                                    close: function (event, ui) {
                                                        $(this).remove();
                                                    }
                                                }
                                            );
                                            // Else user not in form builder...load view like normal
                                        } else {
                                            clearTimeout(window.timer);
                                            /////window.timer = setTimeout( "location.href = '/';", window.lifetime );
                                            // Remove the 'active' class from all of the li elements.
                                            $.each
                                            (
                                                topNav['li'],
                                                function (x, y) {
                                                    y.removeClass('active');
                                                }
                                            );

                                            // Add the 'active' class to the clicked li element.
                                            // All li elements follow the format:  [identifier]:H:MN:C:[element_id]
                                            v.addClass('active');

                                            // Remove the 'active' class from all of the a elements
                                            $.each
                                            (
                                                topNav['btn'],
                                                function (x, y) {
                                                    y.removeClass('active');
                                                }
                                            );

                                            // Add the 'active' class to the respective element.
                                            // All btn elements follow the format:  [identifier]:H:MN:B:[element_id]
                                            $(document.getElementById(':H:MN:B:' + translateNav({ type: "flag", flag: k }))).addClass('active');

                                            // Hide all of the div elements (except for the submenu containing div)
                                            $.each
                                            (
                                                topNav['div'],
                                                function (x, y) {
                                                    if (x !== "container") {
                                                        y.hide();
                                                    }
                                                }
                                            );

                                            // Show the div element.
                                            // All div elements follow the format:  [identifier]jcd_sub_[element_id]
                                            if (k == "controlpnl") {
                                                // If the home tab is clicked, we will actually hide the container div
                                                topNav['div']['container'].hide();

                                                // Don't forget to set the place holder
                                                var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + $('#__jcd_tn_icon_controlpnl').text() + "</div>";

                                                // Let's clear the classes from the placeholder
                                                $(document.getElementById(':H:N:Ph')).removeClass();
                                                $(document.getElementById(':H:N:Ph')).addClass('dtnhb');
                                                $(document.getElementById(':H:N:Ph')).html(innerText);

                                                // And send the user to a new page
                                                $.daxle.display({ disp: 'controlpnl', type: 'admin' });
                                            } else {
                                                // Otherwise, we will show the container div and respective sub menu div element.
                                                topNav['div']['container'].show();
                                                /*
                                                if( k == "configuration" )
                                                {
                                                    $( document.getElementById( ':H:SN:C:cfg' ) ).show();
                                                }else
                                                {*/
                                                topNav['div'][k].show();
                                                //}

                                                // Remove the active class from all submenu items
                                                $.each
                                                (
                                                    topNav['sub'],
                                                    function (x, y) {
                                                        y.removeClass('active');
                                                    }
                                                );

                                                // Add the active class to the respective submenu item
                                                topNav['sub'][k].addClass('active');

                                                // Don't forget to set the place holder by first building the proper html
                                                var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + $('#__jcd_tn_icon_' + translateNav({ type: "text", flag: k })).text() + "</div>";

                                                // Clearing the classes from the placeholder
                                                $(document.getElementById(':H:N:Ph')).removeClass();

                                                // Resetting the placeholder class attribute
                                                $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

                                                // Adding the current active class to load the proper icon
                                                $(document.getElementById(':H:N:Ph')).addClass('dmnc-' + translateNav({ type: "flag", flag: k }));

                                                // And finally setting the placeholder text
                                                $(document.getElementById(':H:N:Ph')).html(innerText);
                                                // Also, redirect the user as they've requested
                                                $.daxle.display({ disp: k, type: 'admin' });
                                            }
                                        }
                                    }
                                );
                            }
                        );

		            } break;

		        case 'mdiv':
		            {
		                // Create the functions for all of the submenu containers
		                $.each
                        (
                            val,
                            function (k, v) {
                                // Declare and define the 'on' 'click' event handler.
                                v.on
                                (
                                    'click',
                                    this,
                                    function (e) {
                                        // Add condition for the form builder. Need to inform user that unsaved progress will be lost if they leave it
                                        if (($('.dfbolay').length) && ($(e.target).closest('.dfbolay').length == 0)) {
                                            //do nothing
                                        } else {
                                            var idArr = $(this).attr('id').split(':');
                                            var id = idArr[4];

                                            // Remove the 'active' class from all of the sub elements.
                                            $.each
                                            (
                                                topNav['div'],
                                                function (x, y) {
                                                    y.hide();
                                                }
                                            );

                                            topNav['div'][k].show();

                                            // Remove all classes currently on the element
                                            $(document.getElementById(':H:N:Ph')).removeClass();

                                            // Reset the placeholder class attribute
                                            $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

                                            // Add the current active class to load the proper icon
                                            var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + $('#__jcd_tn_icon_' + id).text() + "</div>";
                                            $(document.getElementById(':H:N:Ph')).addClass('dmnc-' + id);
                                            $(document.getElementById(':H:N:Ph')).html(innerText);
                                        }
                                    }
                                );
                            }
                        );

		            } break;

		        case 'sub':
		        case 'msub':
		            {
		                // Create the functions for all of the submenu buttons
		                $.each
                        (
                            val,
                            function (k, v) {
                                // Remove HREF attributes.
                                v.removeAttr('href');

                                // Declare and define the 'on' 'click' event handler.
                                v.on
                                (
                                    'click',
                                    this,
                                    function (e) {
                                        var idArr = $(this).parents("div").attr('id').split(':');
                                        var id = idArr[4];
                                        console.log(id);
                                        // Add condition for the form builder. Need to inform user that unsaved progress will be lost if they leave it
                                        if (($('.dfbolay').length) && ($(e.target).closest('.dfbolay').length == 0)) {
                                            var msg = "Leaving the form builder will cause you to lose any unsaved progress! Continue?";
                                            $('<div></div>').appendTo('body').html('<div>' + msg + '</div>').dialog
                                            (
                                                {
                                                    modal: true,
                                                    title: 'Warning',
                                                    zIndex: 10000,
                                                    autoOpen: true,
                                                    width: 'auto',
                                                    resizable: false,
                                                    dialogClass: 'ddialog',
                                                    buttons: [
                                                    {
                                                        text: 'Yes',
                                                        //class: 'dcfb-dialog',
                                                        click: function () {
                                                            $(this).dialog('close');

                                                            clearTimeout(window.timer);
                                                            /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

                                                            // Remove the 'active' class from all of the sub element's.
                                                            $.each
                                                            (
                                                                topNav['sub'],
                                                                function (x, y) {
                                                                    y.removeClass('active');
                                                                }
                                                            );

                                                            // Add the 'active' class to the clicked sub element.
                                                            // All sub elements follow the format:  [identifier]__jcd_sub_[element_id]
                                                            topNav['sub'][k].addClass('active');

                                                            $.each
                                                            (
                                                                topNav['div'],
                                                                function (x, y) {
                                                                    y.hide();
                                                                }
                                                            );

                                                            $("#\\:H\\:SN\\:C\\:" + id).show();

                                                            // Remove all classes currently on the element
                                                            $(document.getElementById(':H:N:Ph')).removeClass();

                                                            // Reset the placeholder class attribute
                                                            $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

                                                            // Add the current active class to load the proper icon
                                                            var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + $('#__jcd_tn_icon_' + id).text() + "</div>";
                                                            $(document.getElementById(':H:N:Ph')).addClass('dmnc-' + id);
                                                            $(document.getElementById(':H:N:Ph')).html(innerText);
                                                            // Make a jQuery.daxle plugin call
                                                            $.daxle.display
                                                            (
                                                                {
                                                                    disp: k,
                                                                    type: 'admin'
                                                                }
                                                            );
                                                        }
                                                    },
                                                    {
                                                        text: 'No',
                                                        //class: 'dcfb-dialog',
                                                        click: function () {
                                                            $(this).dialog('close');
                                                            return false;
                                                        }
                                                    }],
                                                    close: function (event, ui) {
                                                        $(this).remove();
                                                    }
                                                }
                                            );
                                            // Else user not in form builder...load view like normal
                                        } else {
                                            clearTimeout(window.timer);
                                            /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

                                            // Remove the 'active' class from all of the sub elements.
                                            $.each
                                            (
                                                topNav['sub'],
                                                function (x, y) {
                                                    y.removeClass('active');
                                                }
                                            );

                                            // Add the 'active' class to the clicked sub element.
                                            // All sub elements follow the format:  [identifier]__jcd_sub_[element_id]
                                            topNav['sub'][k].addClass('active');
                                            // Make a jQuery.daxle plugin call
                                            $.daxle.display
                                            (
                                                {
                                                    disp: k,
                                                    type: 'admin'
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        );
		            } break;
		        case 'msubsub':
		            {
		                // Create the functions for all of the submenu buttons
		                $.each
                        (
                            val,
                            function (k, v) {
                                // Remove HREF attributes.
                                v.removeAttr('href');
                                // Declare and define the 'on' 'click' event handler.
                                v.on
                                (
                                    'click',
                                    this,
                                    function (e) {
                                        var idArr = $(this).parents("div").attr('id').split(':');
                                        var id = idArr[4];
                                        console.log(id);
                                        // Add condition for the form builder. Need to inform user that unsaved progress will be lost if they leave it
                                        if (($('.dfbolay').length) && ($(e.target).closest('.dfbolay').length == 0)) {
                                            var msg = "Leaving the form builder will cause you to lose any unsaved progress! Continue?";
                                            $('<div></div>').appendTo('body').html('<div>' + msg + '</div>').dialog
                                            (
                                                {
                                                    modal: true,
                                                    title: 'Warning',
                                                    zIndex: 10000,
                                                    autoOpen: true,
                                                    width: 'auto',
                                                    resizable: false,
                                                    dialogClass: 'ddialog',
                                                    buttons: [
                                                    {
                                                        text: 'Yes',
                                                        //class: 'dcfb-dialog',
                                                        click: function () {
                                                            $(this).dialog('close');

                                                            clearTimeout(window.timer);
                                                            /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

                                                            // Remove the 'active' class from all of the sub element's.
                                                            $.each
                                                            (
                                                                topNav['sub'],
                                                                function (x, y) {
                                                                    y.removeClass('active');
                                                                }
                                                            );

                                                            // Add the 'active' class to the clicked sub element.
                                                            // All sub elements follow the format:  [identifier]__jcd_sub_[element_id]
                                                            topNav['sub'][k].addClass('active');

                                                            $.each
                                                            (
                                                                topNav['div'],
                                                                function (x, y) {
                                                                    y.hide();
                                                                }
                                                            );

                                                            $("#\\:H\\:SN\\:C\\:" + id).show();

                                                            // Remove all classes currently on the element
                                                            $(document.getElementById(':H:N:Ph')).removeClass();

                                                            // Reset the placeholder class attribute
                                                            $(document.getElementById(':H:N:Ph')).addClass('dtnhb');

                                                            // Add the current active class to load the proper icon
                                                            var innerText = "<div class='dpnmi' ></div><div class='dbt'>" + $('#__jcd_tn_icon_' + id).text() + "</div>";
                                                            $(document.getElementById(':H:N:Ph')).addClass('dmnc-' + id);
                                                            $(document.getElementById(':H:N:Ph')).html(innerText);
                                                            // Make a jQuery.daxle plugin call
                                                            $.daxle.display
                                                            (
                                                                {
                                                                    disp: k,
                                                                    type: 'admin'
                                                                }
                                                            );
                                                        }
                                                    },
                                                    {
                                                        text: 'No',
                                                        //class: 'dcfb-dialog',
                                                        click: function () {
                                                            $(this).dialog('close');
                                                            return false;
                                                        }
                                                    }],
                                                    close: function (event, ui) {
                                                        $(this).remove();
                                                    }
                                                }
                                            );
                                            // Else user not in form builder...load view like normal
                                        } else {
                                            clearTimeout(window.timer);
                                            /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

                                            // Remove the 'active' class from all of the sub elements.
                                            $.each
                                            (
                                                topNav['sub'],
                                                function (x, y) {
                                                    y.removeClass('active');
                                                }
                                            );

                                            // Add the 'active' class to the clicked sub element.
                                            // All sub elements follow the format:  [identifier]__jcd_sub_[element_id]
                                            topNav['sub'][k].addClass('active');
                                            // Make a jQuery.daxle plugin call
                                            $.daxle.display
                                            (
                                                {
                                                    disp: k,
                                                    type: 'admin'
                                                }
                                            );
                                        }
                                        $(".dtnb").each
                                        (
                                            function () {
                                                $(this).hide();
                                            }
                                        );
                                        jQuery.daxle.updateSub(id, k);
                                    }
                                );
                            }
                        );
		            } break;

		        case 'drop':
		            {
		                // Create the functions for all of the dropdown menu buttons
		                $.each
                        (
                            val,
                            function (k, v) {
                                // Remove HREF attributes.
                                v['id'].removeAttr('href');

                                // Declare and define the 'on' 'click' event handler.
                                v['id'].on
                                (
                                    'click',
                                    this,
                                    function () {
                                        clearTimeout(window.timer);
                                        /////window.timer = setTimeout( "location.href = '/';", window.lifetime );

                                        if (!v['parentID'].hasClass('active')) {
                                            $.each
                                            (
                                                topNav['sub'],
                                                function (x, y) {
                                                    y.removeClass('active');
                                                }
                                            );

                                            v['parentID'].addClass('active');
                                            $.daxle.display
                                            (
                                                {
                                                    disp: v['parentName'],
                                                    type: 'admin',
                                                    anchor: '#' + k
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        );
		            } break;
		    }
		}
	);



    var fBlue = jQuery(document.getElementById(':F:b:f'));
    var aRed = jQuery(document.getElementById(':F:b:a'));
    var sGrey = jQuery(document.getElementById(':F:b:st'));
    var cBox = jQuery(document.getElementById(':px:gs'));

    var top1 = jQuery(document.getElementById('header-box'));
    var top2 = jQuery(document.getElementById(':H:F'));
    var top3 = jQuery(document.getElementById(':H:N'));
    var logo = jQuery(document.getElementById(':H:N:Lc'));
    var pBtn = jQuery(document.getElementById(':H:N:Ph'));
    var pop = jQuery(document.getElementById(':H:N:p'));

    var mainSub = jQuery(document.getElementById(':H:N:S'));
    var level2Sub = jQuery(document.getElementById(':H:N:SM'));
    var intgrtLink = jQuery(document.getElementById(':H:SN:B:intgrt'));
    var intgrtSub = jQuery(document.getElementById(':H:SN:B:intgrt:sub'));

    fBlue.on("mouseover", function (event) {
        jQuery(document.getElementById(':F:b:f:tt')).show();
    }
		);

    fBlue.on("mouseout", function (event) {
        jQuery(document.getElementById(':F:b:f:tt')).hide();
    }
		);

    aRed.on("mouseover", function (event) {
        jQuery(document.getElementById(':F:b:a:tt')).show();
    }
		);

    aRed.on("mouseout", function (event) {
        jQuery(document.getElementById(':F:b:a:tt')).hide();
    }
		);

    sGrey.on("mouseover", function (event) {
        jQuery(document.getElementById(':F:b:st:tt')).show();
    }
		);

    sGrey.on("mouseout", function (event) {
        jQuery(document.getElementById(':F:b:st:tt')).hide();
    }
		);

    cBox.on("click", function (event) {
        jQuery(document.getElementById(':px:gs:m')).toggle
        (
            function () {
                jQuery(document.getElementById(':px:gs:m')).animate({ height: jQuery(':px:gs:m:l').height() }, 200);
            },
            function () {
                jQuery(document.getElementById(':px:gs:m')).animate({ height: "auto" }, 200);
            }
        );
    }
		);

    cBox.on("mouseover", function (event) {
        jQuery(document.getElementById(':px:gs:tt')).show();
    }
		);

    cBox.on("mouseout", function (event) {
        jQuery(document.getElementById(':px:gs:tt')).hide();
    }
		);


    // The following function controls the pop out effect of the main nav when the mouse hovers over the placeholder
    pBtn.on("mouseover", function (event) {
        pop.css("margin-left", "0px");
    }
	);


    // The following two functions control the pop out main nav while the mouse hovers over the pop out
    pop.on("mouseover", function (event) {
        pop.css("margin-left", "0px");
    }
	);

    pop.on("mouseout", function (event) {
        pop.css("margin-left", "-250px");
        mainSub.css("margin-left", "-250px");
    }
	);

    pop.on("mouseover", "li", function (e) {
        var target = $(e.currentTarget);
        var idArr = target.attr('id').split(':');
        var id = idArr[4];
        var subMenu = jQuery(document.getElementById(':H:N:S:' + id));
        var topOff = target.offset().top - $(window).scrollTop() - 77;		//distance_from_page_top - vertical_scroll_distance - offset_from_top

        mainSub.find(".dmns").each(
			function () {
			    $(this).hide();
			}
		);

        level2Sub.find(".dmnsm").each(
			function () {
			    $(this).hide();
			}
		);
        mainSub.css("margin-left", "208px");
        mainSub.css("margin-top", topOff + "px");

        subMenu.show();

    });

    mainSub.on("mouseover", function (e) {
        pop.css("margin-left", "0px");
        mainSub.css("margin-left", "208px");
    });

    mainSub.on("mouseout", function (event) {
        pop.css("margin-left", "-250px");
        mainSub.css("margin-left", "-250px");
        level2Sub.css("margin-left", "-250px");
    }
	);

    mainSub.on("mouseover", "li", function (e) {
        var l2target = $(e.currentTarget);
        var l2id = l2target.attr('id');
        if (l2id && l2id != "") {
            l2idArr = l2id.split(':');
            var id = l2idArr[4];
            var l2subMenu = jQuery(document.getElementById(':H:N:SM:' + id));
            var topOff = l2target.offset().top - $(window).scrollTop() - 77;		//distance_from_page_top - vertical_scroll_distance - offset_from_top

            level2Sub.css("margin-left", "415px");
            level2Sub.css("margin-top", topOff + "px");

            l2subMenu.show();
        }
    });

    level2Sub.on("mouseover", function (e) {
        pop.css("margin-left", "0px");
        mainSub.css("margin-left", "208px");
        level2Sub.css("margin-left", "415px");
    });

    level2Sub.on("mouseout", function (event) {
        pop.css("margin-left", "-250px");
        mainSub.css("margin-left", "-250px");
        level2Sub.css("margin-left", "-250px");
    }
	);

    // The following four functions control the dropdown subnav menu under Integration
    intgrtLink.on("mouseover", function (event) {
        intgrtSub.css("margin-left", "49.2%");
    }
	);
    intgrtLink.on("mouseout", function (event) {
        intgrtSub.css("margin-left", "-250px");
    }
	);
    intgrtSub.on("mouseover", function (event) {
        intgrtSub.css("margin-left", "49.2%");
    }
	);
    intgrtSub.on("mouseout", function (event) {
        intgrtSub.css("margin-left", "-250px");
    }
	);

    // Code for confirming navigation away from form builder when something on the top Joomla menu is clicked
    $('#module-menu a').on
	(
		'click',
		function (e) {
		    // Get the URL of the link the user is clicking on
		    var url = $(this).attr('href');

		    // Add condition for the form builder. Need to inform user that unsaved progress will be lost if they leave it
		    if ($('.dfbolay').length) {
		        e.preventDefault();
		        var msg = "Leaving the form builder will cause you to lose any unsaved progress! Continue?";
		        $('<div></div>').appendTo('body').html('<div>' + msg + '</div>').dialog
				(
					{
					    modal: true,
					    title: 'Warning',
					    zIndex: 10000,
					    autoOpen: true,
					    width: 'auto',
					    resizable: false,
					    dialogClass: 'ddialog',
					    buttons: [
						{
						    text: 'Yes',
						    //class: 'dcfb-dialog',
						    click: function () {
						        $(this).dialog('close');
						        // Redirect the user to clicked page
						        window.location.replace("/administrator/" + url);
						    }
						},
						{
						    text: 'No',
						    //class: 'dcfb-dialog',
						    click: function () {
						        $(this).dialog('close');
						        return false;
						    }
						}],
					    close: function (event, ui) {
					        $(this).remove();
					    }
					}
				);
		    }
		}
	);


    // This function is what works the top nav (hiding and showing based on scroll etc)
    /*
	jQuery( document ).bind
	( 
		'mousewheel DOMMouseScroll MozMousePixelScroll',

		function( e )
		{
			if( ( ( e.originalEvent.wheelDelta / 120 > 0 ) || ( e.originalEvent.detail / 3 < 0 ) ) && ( jQuery( "body" ).height() > jQuery( window ).height() ) )
			{
				top1.show();
				top2.show();
				top3.css( "top", "78px" );
				pop.css( "top", "78px" );
				pBtn.css( "margin-left", "20px" );
				logo.hide();

				// Now let's dress up any elements effected by scrolling up
				var fixStart = jQuery( document.getElementById( ':B:JC' ) ).offset().top - parseFloat( jQuery( document.getElementById( ':B:JC' ) ).css( 'marginTop' ).replace( /auto/, 0 ) );
				var y = jQuery( this ).scrollTop();

				if( y >= top )
				{
					jQuery( document.getElementById( ':B:JC' ) ).addClass( 'dfb-l-f' );
				}else
				{
					jQuery( document.getElementById( ':B:JC' ) ).removeClass( 'dfb-l-f' );
				}

				jQuery( 'div.ddb-30' );

				//alert( "It moves up for us!" );
			}else if( ( ( e.originalEvent.wheelDelta / 120 < 0 ) || ( e.originalEvent.detail / 3 > 0 ) ) && ( jQuery( "body" ).height() > jQuery( window ).height() ) )
			{
				top1.hide();
				top2.hide();
				top3.css( "top", "0px" );
				pop.css( "top", "0px" );
				pBtn.css( "margin-left", "36px" );
				logo.show();

				// Now let's dress up any elements effected by scrolling up
				var fixStart = jQuery( document.getElementById( ':B:JC' ) ).offset().top - parseFloat( jQuery( document.getElementById( ':B:JC' ) ).css( 'marginTop' ).replace( /auto/, 0 ) );
				var y = jQuery( this ).scrollTop();

				if( y >= top )
				{
					jQuery( document.getElementById( ':B:JC' ) ).addClass( 'dfb-l-f' );
				}else
				{
					jQuery( document.getElementById( ':B:JC' ) ).removeClass( 'dfb-l-f' );
				}

				//alert( "It moves down for us!" );
			}
		}
	);
	*/

});


// Method to check nav elements, used by the toolbar definition above
function translateNav(args) {
    var options = jQuery.extend
					(
						{
						    // Default values
						    type: "flag",
						    flag: ""
						},
						args
					);

    var eFlag = "";
    var eText = "";

    if (options['type'] === "flag") {
        // switch
        switch (options['flag']) {
            case 'controlpnl':
                {
                    eFlag = 'controlpnl';
                } break;

            case 'configuration':
                {
                    eFlag = 'cfg';
                } break;

            case 'mktgrps':
                {
                    eFlag = 'jcacl';
                } break;

            case 'users':
                {
                    eFlag = 'jcusr';
                } break;

            case 'forms':
                {
                    eFlag = 'forms';
                } break;

            case 'mailchimp':
                {
                    eFlag = 'addons';
                } break;

            case 'log':
                {
                    eFlag = 'logs';
                } break;
        }

        return eFlag;
    }

    if (options['type'] === "text") {
        // switch
        switch (options['flag']) {
            case 'controlpnl':
                {
                    etext = 'controlpnl';

                } break;

            case 'configuration':
                {
                    //eText = 'settings';
                    eText = 'cfg';
                } break;

            case 'mktgrps':
                {
                    eText = 'jcacl';
                } break;

            case 'users':
                {
                    eText = 'jcusr';
                } break;

            case 'forms':
                {
                    eText = 'forms';
                } break;

            case 'mailchimp':
                {
                    eText = 'addons';
                } break;

            case 'log':
                {
                    eText = 'logs';
                } break;
        }

        return eText;
    }
}

// Method to get a cookie value
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    }
    else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

/*!
 * Method to activate admin screen until JoomConnect is open.
 *
 *
 * @return void
 *
 * @since 1.0.0
 */
function checkAdminLogin() {
    var url = 'index.php?option=com_joomconnect&view=configuration&type=chkadminlogin&tmpl=component';			// Determine the path of Ajax file.

    jQuery.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        success: function (msg, textStatus, xhr) {
            //alert( msg );
        }
    });
}