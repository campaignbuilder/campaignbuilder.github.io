/**
 * @version   $Id$
 * @author    Directive http://www.directive.com
 * @copyright Copyright (C) 2008 - 2013 Directive Technology Inc
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */


/*!	
* For Automaiton Form data to handle.
* 
* @version   $Id$
* @author    Directive http://www.directive.com
* @copyright Copyright (C) 2008 - 2013 Directive Technology Inc
* @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
*/

var showselstate = 0;
var formProcessing = new Array();
formProcessing[0] = "saveInQueue";				// Determine save data in Queue table first before start processing on all.
formProcessing[1] = "saveContact";				// Determine company and contact flag.
formProcessing[2] = "opportunityCreate";		// Determine opportunity flag, also attached product.
formProcessing[3] = "ticketCreate"				// Determine ticket flag, also attached product.
formProcessing[4] = "activityCreate";			// Determine activity flag.
formProcessing[5] = "assignMarketingGroup";		// Determine assign marketing group.
formProcessing[6] = "assignTracks";				// Determine assign tracks.
formProcessing[7] = "removeFromQueue";			// Determine in case all processing done successfully will remove that record from Queue.

var flag = new Array();
flag['saveInQueue'] = 0;
flag['saveContact'] = 0;
flag['opportunityCreate'] = 0;
flag['ticketCreate'] = 0;
flag['activityCreate'] = 0;
flag['assignMarketingGroup'] = 0;
flag['assignTracks'] = 0;
flag['removeFromQueue'] = 0;

var qrystring = "";							// Determine query string which will post by Jquery.
/*
var flagSaveInQueue			=	0;							// Determine flag of action taken.
var flagSaveContact			= 0;							// Determine flag of action taken.
var flagOpportunityCreate = 0;							// Determine flag of action taken.
var flagTicketCreate		= 0;							// Determine flag of action taken.
var flagActivityCreate		= 0;							// Determine flag of action taken.
var flagAssignMarketingGroup = 0;							// Determine flag of action taken.
var flagAssignTracks		= 0;							// Determine flag of action taken.
var flagRemoveFromQueue		= 0;							// Determine flag of action taken.
*/
var queueCounter = 0;							// Determine counter of total action taken successfully.
var queueItems = 0;							// Determine total number of queue item.
var processingCounter = 0;							// Determine counter of each action.
var redirect = "no";							// By default it will set as no, but when it set as yes will strop JavaScript processing and redirect User on thank you page.
var redirectPath = "";							// If not empty, User will redirect on given path when processing completed.

/*!
 * Method to take action on user as per after form submit.
 *
 * @param str	  formName			Determines form name.
 * @param array formData		Determines array that contain form data after submit.
 * @param array skipAction	Determines array that contain to skip any action from above defined actions.
 * @param array skipMsg		Determines array that contain to skip message for any of above defined actions.
 * @param str	  reset			Determines that function call first time by file or by internal code.
 *
 * @return void
 *
 * @since 1.0.0
 */
function form_submit(formName)	//usrObj, formData, skipAction, skipMsg, reset
{
    /*$( "body" ).prepend( "<div class='disable'></div>" );
 	$( "#element" ).introLoader();
 	$( '.disable' ).show();*/
    var formid = jQuery("#" + formName + " #formId").val();
    var formlabel = jQuery("#" + formName + " #mod_id_" + formid).val();
    //console.log(formid);
    //console.log(formlabel);
    if (jQuery('#' + formName + ' #recap_' + formlabel).length > 0) {
        var widget = jQuery('#' + formName + ' #recap_' + formlabel).attr('wid');
        var response = grecaptcha.getResponse(widget);
        //recaptcha failed validation
        if (response.length == 0) {
            //console.log(response.length);
            alert("Please Validate Recaptcha");
            return false;
        }
    }
    if (eval("document." + formName + ".email_" + formName) && eval("document." + formName + ".email_" + formName + ".value") != "") {
        // Security for bots when this field we got fillup will not allow to submit the form.
        return false;
    }
    if (eval("document." + formName + ".hidrand_" + formName) && eval("document." + formName + ".hidrand_" + formName + ".value") != "") {
        // Random field Security for bots when this field we got fillup will not allow to submit the form.
        textFldtoChk = eval("document." + formName + ".hidrand_" + formName + ".value");
        if (eval("document." + formName + "." + textFldtoChk) && eval("document." + formName + "." + textFldtoChk + ".value") != "") {
            return false;
        }
    }
    if (!validateForm(formName)) {
        jQuery( '#element,.disable' ).hide();
        return false;
    } else {
        //jQuery( '.overlay-loader' ).show();
        jQuery('input[type=button]').each(function () {
            jQuery(this).attr('disabled', 'disabled')
        });
    }
    /*if(jQuery('.paypal_button').length)
    {
        var amt = 0;
        var total_amt = 0;
        var amount_field_name = jQuery('.amount_fields').val();
        var amount_field_vals = jQuery('.amount_field_vals').val();
        var vals_array = amount_field_vals.split(',');
       jQuery("input:checkbox[name='"+amount_field_name+"[]']:checked").each(function()
       {
           key_arr = jQuery(this).attr("id").split('_');
           k = key_arr[1] - 1;
           amt = vals_array[k];
           if(total_amt == 0)
           {
               total_amt = parseFloat(amt, 10);
           }else
           {
               total_amt = parseFloat(total_amt, 10) + parseFloat(amt, 10);
           }
       });
       //alert(total_amt);
       //return false;
        jQuery(".total_amount").val(total_amt);
    }*/
    if (typeof eval("document." + formName + ".showXls") === 'undefined') {

    } else {
        if (eval("document." + formName + ".showXls") && eval("document." + formName + ".showXls").checked == true) {
            eval("document." + formName + ".action=''");
        }
    }
    // return false;
    // Will handle form validation here first.
    eval("document." + formName + ".submit()");			// We can submit form from here.
    return;


    if (reset == 'yes') {
        qrystring = "";						// Reset here.
        flag['saveInQueue'] = 0;
        flag['saveContact'] = 0;
        flag['opportunityCreate'] = 0;
        flag['ticketCreate'] = 0;
        flag['activityCreate'] = 0;
        flag['assignMarketingGroup'] = 0;
        flag['assignTracks'] = 0;
        flag['removeFromQueue'] = 0;
        /*
 		flagSaveInQueue			=	0;						// Reset here.
 		flagSaveContact			=	0;						// Reset here.
 		flagOpportunityCreate	= 0;						// Reset here.
		flagTicketCreate		=	0;						// Reset here.
 		flagActivityCreate		=	0;						// Reset here.
 		flagAssignMarketingGroup =	0;						// Reset here.
 		flagAssignTracks		=	0;						// Reset here.
 		flagRemoveFromQueue		=	0;						// Reset here.
		*/
        queueCounter = 0;						// Reset here.
        queueItems = 0;						// Reset here.
        processingCounter = 0;						// Reset here.
        redirect = "no";					// Reset here.
        redirectPath = "";						// Reset here.
    }
    formData = jQuery('form#jcfc_Registration').serialize();
    //formData					=	jQuery(submitForm).serialize(); //$( 'jcfc_Registration' ).serialize();
    if (formData.length > 0) {
        if (formProcessing[processingCounter] == "saveInQueue" && skipAction.indexOf("saveInQueue") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=saveInQueue';
        } else if (formProcessing[processingCounter] == "saveContact" && skipAction.indexOf("saveContact") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=saveData';
        } else if (formProcessing[processingCounter] == "opportunityCreate" && skipAction.indexOf("opportunityCreate") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=createConnectwiseOpportunity';
        } else if (formProcessing[processingCounter] == "ticketCreate" && skipAction.indexOf("ticketCreate") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=createConnectwiseTicket';
        } else if (formProcessing[processingCounter] == "activityCreate" && skipAction.indexOf("activityCreate") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=createConnectwiseActivity';
        } else if (formProcessing[processingCounter] == "assignMarketingGroup" && skipAction.indexOf("assignMarketingGroup") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=assignConnectwiseMarketingGrps';
        } else if (formProcessing[processingCounter] == "assignTracks" && skipAction.indexOf("assignTracks") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=assignConnectwiseTracks';
        } else if (formProcessing[processingCounter] == "removeFromQueue" && skipAction.indexOf("removeFromQueue") < 0 && flag[formProcessing[processingCounter]] == 0 && redirect == "no") {
            qrystring += '&callBack=removeFromQueue';
        } else {
            if (skipAction.indexOf(formProcessing[processingCounter]) > 0)	// Check here in case of action was skip to take action.
            {
                flag[formProcessing[processingCounter]]++;
                processingCounter++;		// Increase process counter so that next action can be done.
                formSubmit(formName, usrObj, formData, skipAction, skipMsg, 'no');			// Call function again to get and set data until all processing not finished.
                return false;
            } else {
                // All processing seem to be completed here, we can take appropriate action according to situation.
                alert("processing completed here, we can write redirecting code.");
                return false;
            }
        }
        if (qrystring != '') {
            showMsg = '';		// Determine empty variable here.
            document.getElementById('spinnerimg').src = "../media/com_joomconnect/images/16x16/spinner.gif";		// Show spinner here.
            // We can use Ajax using Jquery here.
            jQuery.ajax({
                url: 'index.php?option=com_joomconnect&view=ajaxfiles&type=jcForms&tmpl=component',
                type: 'POST',
                data: qrystring + '&formData=' + encodeURIComponent(formData) + '&usrObj=' + JSON.stringify(usrObj) + '&queueCounter=' + queueCounter + '&queueItems=' + queueItems + '&case=' + formProcessing[processingCounter],
                dataType: 'html',
                success: function (msg, textStatus, xhr) {
                    //alert( msg );return;
                    try {
                        chkJson = JSON.parse(msg);
                    } catch (exception) {
                        chkJson = null;
                    }
                    if (chkJson) {
                        // Response received in JSON, that mean its containing set of array.
                        // Check section and count below and decide the section to allot value so that we can move on next step.
                        if (chkJson['queueItems'] && chkJson['queueItems'] > 0) {
                            queueItems = chkJson['queueItems'];
                        }
                        if (chkJson['usrObj']) {
                            usrObj = chkJson['usrObj'];
                        }
                        if (chkJson['redirect'] && chkJson['redirect'] == 'yes') {
                            redirect = "yes";
                            redirectPath = chkJson['redirectPath'];
                            // We will not take any further action and will redirect user.
                        } else if (chkJson['case'] && chkJson['case'] == 'saveInQueue') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("saveInQueue") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        } else if (chkJson['case'] && chkJson['case'] == 'saveContact') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("saveContact") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        } else if (chkJson['case'] && chkJson['case'] == 'opportunityCreate') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("opportunityCreate") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        } else if (chkJson['case'] && chkJson['case'] == 'ticketCreate') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("ticketCreate") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        } else if (chkJson['case'] && chkJson['case'] == 'activityCreate') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("activityCreate") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        } else if (chkJson['case'] && chkJson['case'] == 'assignMarketingGroup') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("assignConnectwiseMarketingGrps") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        } else if (chkJson['case'] && chkJson['case'] == 'assignTracks') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("assignTracks") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        } else if (chkJson['case'] && chkJson['case'] == 'removeFromQueue') {
                            flag[formProcessing[processingCounter]]++;
                            if (skipMsg.indexOf("removeFromQueue") < 0) {
                                showMsg = chkJson['displayMsg'];
                            }
                        }
                        if (showMsg != "") {
                            document.getElementById('spinnerimg').title = showMsg;	// Set title of spinner image so that user can get current status.
                            document.getElementById('info_box_bottom').innerHTML = showMsg;	// Show message on info box for failure and success.
                        }
                        processingCounter++;
                        formSubmit(formName, usrObj, formData, skipAction, skipMsg, 'no');			// Call function again to get and set data until all processing not finished.
                    }
                }
            });
        }
    }
}

/*!
* Method to take action on user as per after form submit.
*
* @param str	  countryId			Determines country Id will get state list based on it.
* @param str	  fieldName			Determines field name which will use as select box field name.
* @param str	  defaultFieldTitle	Determines default field option.
* @param str	  cssClass			Determines CSS class for select box field.
* @param str	  divId				Determines div Id to replace AJAX result.
*
* @return void
*
* @since 1.0.0
*/
function getStateList(countryId, fieldName, defaultFieldTitle, cssClass, divId) {

    if ((countryId == '') || (countryId == null) || (countryId == '0') || (countryId == 0)) {
        countryId = jQuery(document).find('.dfcw_country').val();
    }

    jQuery.ajax({
        url: 'index.php?option=com_joomconnect&view=ajaxfiles&type=stateList&tmpl=component',
        type: 'POST',
        data: qrystring + '&countryId=' + countryId + '&fieldName=' + fieldName + '&defaultFieldTitle=' + defaultFieldTitle + '&cssClass=' + cssClass,
        dataType: 'html',
        success: function (msg, textStatus, xhr) {
            // alert( msg );//return;
            if ((divId == '') || (divId == null) || (divId == '0') || (divId == 0)) {
                jQuery(document).find('.' + cssClass).html(msg);
            } else {
                document.getElementById(divId).innerHTML = msg;
            }
            if (showselstate > 0) {
                jQuery("select[name='state']").val(showselstate);
            }
        }
    });
}

/*!
* Method to submit form
*
* @param str	  formName			Determines form name.
* @param str	  callBack			Determines to call another function before form submit.
*
* @return void
*
* @since 1.0.0
*/
function submitJcForm(formName, callBack) {
    if (callBack != "") {
        if (eval(callBack)(formName)) {
            eval("document." + formName + ".submit()");			// We can submit form from here.
        } else {
            return false;	// Something is wrong will not submit the form.
        }
    } else {
        eval("document." + formName + ".submit()");			// We can submit form from here.
    }
}

/*!
* Method to validate capture form XLS and CSV file upload setting.
*
* @param str	  formName			Determines form name.
*
* @return void
*
* @since 1.0.0
*/
function validateXlsCsv(formName) {
    eval("document." + formName + ".action = ''");
    eval("document." + formName + ".task.value = ''");
    eval("document." + formName + ".controller.value = ''");
    xlsFormat = eval("document." + formName + ".xlsFormat.value");			// Check file format.
    if (xlsFormat == "") {
        alert("Please Choose File Format.");
        return false;
    }
    xlsFile = eval("document." + formName + ".xlsFile.value");																// Check file extension.
    if (xlsFile == "") {
        alert("Please upload .csv format file to continue.");
        return false;
    }
    fileExt = xlsFile.substring(xlsFile.lastIndexOf('.') + 1);
    if (xlsFormat == "visistat" && (fileExt != "xls" && fileExt != "XLS")) {
        alert("Please upload .xls format file to continue.");
        return false;
    } else if (xlsFormat == "custom_csv" && (fileExt != "csv" && fileExt != "CSV" && fileExt != "xls" && fileExt != "XLS" && fileExt != "xlsx" && fileExt != "XLSX")) {
        alert("Please upload .csv/.xls format file to continue.");
        return false;
    }
    else {
        return true;
    }
}

/*!
* Method to validate form
* [NOTE] We needed a hidden field in form name "reqFld" it should be array type which will encode with JSON.
* Example of array in PHP hidden field $reqFld[0]['type'],reqFld[0]['title'],reqFld[0]['name'].... so on.
*
* @param str	  formName			Determines form name.
*
* @return void
*
* @since 1.0.0
*/
function validateForm(formName) {
    if (eval("document." + formName + ".showXls"))	// Validate XLS file upload on capture module.
    {
        if (eval("document." + formName + ".showXls").checked) {
            return validateXlsCsv(formName);
        }
    }
    if (eval("document." + formName + ".reqFld") && eval("document." + formName + ".reqFld.value") != "") {
        fldData = eval("(" + eval("document." + formName + ".reqFld.value") + ")");
        for (i = 0; i < fldData.length; i++) {
			fldData[i]['title'] = fldData[i]['title'].replace(/\%/g,'');	// percentag (%) is an escape character, so it will error when passed to decodeURIComponent
            fldData[i]['title'] = decodeURIComponent(fldData[i]['title'].replace(/[%]/g, ' ')).replace(/\+/g, ' ');
            if (fldData[i]['name']) {
                if (fldData[i]['type'] == 'checkbox' || fldData[i]['type'] == 'marketing' || fldData[i]['type'] == 'tracks_fld') {
                    fld = fldData[i]['name'];
                } else {
                    fld = eval("document." + formName + "." + fldData[i]['name']);
                }

                switch (fldData[i]['type']) {
                    case 'EmailAddress':
                    case 'Email':
                    case 'email':
                    case 'emailaddress':
                        {
                           /* if (fld.value == "")	// Should not be empty here.
                            {
                                fld.focus();
                                alert("Please enter your " + fldData[i]['title']);
                                return false;
                            } else*/                  // Check email address is valid or not.
                            if (fld.value != ""){
                                //alert( fld.value );
                                emailInvalid = validateEmail(fld.value);
                                if (emailInvalid != "") {
                                    fld.focus();
                                    alert(emailInvalid);
                                    return (false);
                                }
								// Check email restriction
								var email_restrict =  eval("document." + formName + ".restrict_emails.value");
								//alert(email_restrict);
								if( email_restrict != '' )
								{
									if( !check_email_restriction( email_restrict, fld.value ) )
									{
										alert('This email address is not allowed.');
										return false;
									}
								}
								
                            }
                        } break;
                    case 'Text':
                    case 'text':
                    case 'textarea':
                    case 'Textarea':
                    case 'FaxNumber':
                    case 'Fax':
                    case 'fax':
                    case 'date':
                    case 'Date':
                        {
                            if (fld.value == "")	// Should not be empty here.
                            {
                                fld.focus();
                                alert("Please enter your " + fldData[i]['title']);
                                return false;
                            } else if ((fld.name == "phone_1" || fld.name == "phone_ext") && validateAlphabetic(fld.value) >= 0) {
                                fld.focus();
                                alert("Please enter valid " + fldData[i]['title']);
                                return false;
                            } else if (fld.name == "confirm_password" && fld.value != eval("document." + formName + ".cw_password_value.value")) {
                                fld.focus();
                                alert("Passwords do not match. ");
                                return false;
                            } else if (eval("document." + formName + ".cw_password_value") && eval("document." + formName + ".cw_password_value.value") != "") {
                                pwdFld = eval("document." + formName + ".cw_password_value");							
                                if( pwdFld.value.length < 8 || pwdFld.value.length > 15 )
                                {
                                    pwdFld.focus();
                                    alert( "Password length must be between 8 and 15 character" );
                                    return false;
                                }
                                if( pwdFld.value.indexOf( ";" ) >= 0 )
                                {
                                    pwdFld.focus();
                                    alert( "Password cannot contain semicolon(;)" );
                                    return false;
                                }
								
									Error = 0;
									Error_msg = '';
									var fulfilled_requirements = 0;
									
									containsUpper = /[A-Z]/.test( pwdFld.value );
									if( !containsUpper )
									{
										pwdFld.focus();
										Error = 1;
										Error_msg = Error_msg + '\nA capital letter.';
									}else
									{
										fulfilled_requirements++;
									}
									
									containsLower = /[a-z]/.test( pwdFld.value );
									if( !containsLower )
									{
										pwdFld.focus();
										Error = 1;
										Error_msg = Error_msg + '\nA lower-case letter.';
									}else
									{
										fulfilled_requirements++;
									}
																		
									containsNumber = /[0-9]/.test( pwdFld.value );
									if( !containsNumber )
									{
										pwdFld.focus();
										Error = 1;
										Error_msg = Error_msg + '\nA number.';
										
									}else
									{
										fulfilled_requirements++;
									}
									
									var containsSpecial = /[\'^£$!%&*()}{@#~?><>,|=_+¬-]/.test(pwdFld.value);
									if (!containsSpecial)
									{
										pwdFld.focus();	
										Error = 1;
										Error_msg = Error_msg + ' \nA special character.';
									}else
									{
										fulfilled_requirements++;
									}
									
									
									 var needed = 3 - fulfilled_requirements;
								
                                	 var remaining = 4 - fulfilled_requirements;
									
									if(Error == 1 && needed > 0)
									{
										alert('You need to add ' + needed + ' of the following ' + remaining + ' requirements to your password'+Error_msg)
										return false;
									} 
                            }
                        } break;
                   case 'select':
                        {
                            if (fld.value == "NoVal" || fld.value == "")	// Should not be empty here.
                            {
                                fld.focus();
                                alert("Please select your " + fldData[i]['title']);
                                return false;
                            }
                        } break;
                    case 'radio':
                        {
                            var radioChoice = false;
                            for (counter = 0; counter < fld.length; counter++) {
                                if (fld[counter].checked)
                                    radioChoice = true;
                            }
                            if (!radioChoice) {
                                alert("Please choose " + fldData[i]['title']);
                                return false;
                            }
                        } break;
                    case 'checkbox':
                    case 'marketing':
                    case 'tracks_fld':
                        {
                            var checkboxChoice = false;
                            if (checkCheckBoxGroup(fld) > 0) {
                                checkboxChoice = true;
                            }
                            /*if ( fld.length > 0 )
                            {
                                for( counter = 0; counter < fld.length; counter++ )
                                {
                                    if( fld[counter].checked )
                                        checkboxChoice = true;
                                }
                            }else
                            {
                                if( fld.checked )
                                    checkboxChoice = true;
                            }*/
                            if (!checkboxChoice) {
                                alert("Please choose at least one option for: " + fldData[i]['title']);
                                return false;
                            }
                        } break;
                    case 'url':
                        {
                            if (fld.value == "")	// can be empty here.
                            {

                            } else if (!validateUrl(fld.value)) {
                                alert("Please enter a correct url value for: " + fldData[i]['title']);
                                return false;
                            }

                        } break;
					case 'dob':
                        {
                            if (fld.value == "")	// can be empty here.
                            {

                            } else if (!validateDob(fld.value)) {
                                alert("Please enter a correct date value as MM/DD/YYYY for: " + fldData[i]['title']);
                                return false;
                            }

                        } break;	
					case 'phone':
                        {
                            if (fld.value == "")	// can be empty here.
                            {
								fld.focus();
                                alert("Please enter your " + fldData[i]['title']);
                                return false;

                            } else {
								var phone = fld.value;
								var phoneNum = phone.replace(/[^\d]/g, '');
								if(phoneNum.length > 9 && phoneNum.length < 12) {  
									 
								}else 
								{
									fld.focus();
									alert("Please enter a correct phone value for: " + fldData[i]['title']);
                               	    return false;
								}
                            }

                        } break;	
                    case 'req_url':
                        {
                            if (fld.value == "")	// Should not be empty here.
                            {
                                fld.focus();
                                alert("Please enter your " + fldData[i]['title']);
                                return false;
                            } else if (!validateUrl(fld.value)) {
                                fld.focus();
                                alert("Please enter valid " + fldData[i]['title']);
                                return false;
                            }

                        } break;
                    case 'numeric':
                        {
                            if (fld.value == "")	// Should not be empty here.
                            {
                                fld.focus();
                                alert("Please enter your " + fldData[i]['title']);
                                return false;
                            }
                             else if (!validateNumeric(fld.value)) {
                                 alert("Please enter a correct numeric value for: " + fldData[i]['title']);
                                return false;
                            }

                        } break;
                    case 'alpha':
                        {
                            if (fld.value == "")	// Should not be empty here.
                            {
                                fld.focus();
                                alert("Please enter your " + fldData[i]['title']);
                                return false;
                            } else if (!strValidate(fld.value)) {
                                fld.focus();
                                alert(fldData[i]['title'] + " should only contain letters.");
                                return false;
                            }

                        } break;
                	case 'file':
					{
						if (fld.value == "")	// Should not be empty here.
						{
							fld.focus();
							alert("Please enter your " + fldData[i]['title']);
							return false;
						} else {
							var max_upload_size = eval("document." + formName + "."+fld.name+"_max_file_upload_size").value;
							var js_upload_size = parseInt(1048576*max_upload_size);
							
							var file_ext = eval("document." + formName + "."+fld.name+"_file_upload_ext").value;
							js_file_ext = new Array();
							var fl_ex = file_ext.split(',');
						
							for( fj=0;fj<fl_ex.length;fj++)
							{
								vb = fl_ex[fj];
								var each_fl_ex = vb.split(".");
								js_file_ext.push(each_fl_ex[1]);
							}
							//console.log(js_file_ext);
							if( file_ext == '' || file_ext == null)
							{
								alert("No file extension selected in form field settings !!");
								return false;
							}
							if( fileExtValidation(fld, "Only "+file_ext+" are allowed!", js_file_ext ) == false )
							{
							   return false;
							}
							if(fileSizeValidation(fld,js_upload_size, "Document size should be less than "+max_upload_size+"MB !")==false)
						    {
							 return false;
						    }
													
						}
					} break;
                    case 'card':
                        {
                            /*$('.card_number').validateCreditCard(function (result) {
                                console.log(result);
                            });*/
                        }
                } //End of switch
            } //End of if
        }
		// Check for modify activity
		if( eval("document." + formName + ".modifyActivity") && eval("document." + formName + ".modifyActivity.value") > 0 )
		{
			if( eval("document." + formName + ".activityReminderMinutes.value") > 0 )
			{
				if( eval("document." + formName + ".activityStartTime.value") == "" || eval("document." + formName + ".activityStartTime.value") == "00:00:00" )
				{
					alert( "By choosing Reminder Minutes, Start time field can not be empty." );
					document.getElementById( 'activityStartTime' ).focus();
					return false;
				}
				if( eval("document." + formName + ".activityEndTime.value") == "" || eval("document." + formName + ".activityEndTime.value") == "00:00:00" )
				{
					alert( "By choosing Reminder Minutes, End time field can not be empty." );
					document.getElementById( 'activityEndTime' ).focus();
					return false;
				}
			}
		}
    }
    return true;
}

function check_email_restriction( email_restrict, user_email )
{
	var emails = email_restrict.split(',');
	uemail = user_email.split('@');
	for(var i=0;i<emails.length;i++)
	{
		if( emails[i].indexOf('%@') > -1 ) // Block whole domain email id's
		{
			res_emails = emails[i].split('%@');
			if(uemail[1] == res_emails[1])
			{
				return false;
			}
		}else if( emails[i].indexOf('@%') > -1 ) // Block any domain which is started from this match eg: info@ ETC
		{
			res_emails = emails[i].split('@%');
			if(uemail[0] == res_emails[0])
			{
				return false;
			}
		}else if( emails[i].indexOf('domain.com') > -1 )
		{
			res_emails = emails[i].split('@');
			if(uemail[0] == res_emails[0])
			{
				return false;
			}
		}else if( emails[i] == user_email )
		{
			return false;
		}
		
	}
	return true;
}


/*!
* Method to validate checkboxes, marketing grps, tracks
*
* @param str	  groupName			field name.
*
* @return void
*
* @since 1.0.0
*/

function checkCheckBoxGroup(groupName) {
    /*
  var g = document.getElementsByName(groupName);
  for(var i = 0;i<g.length;i++) 
  {
    if (g[i].checked) {
      return true;
    }else 
	{
      ret = false;
    }
  }
  return ret;
  */
    rows = document.getElementsByName(groupName + '[]');
    var selectedRows = [];
    for (var i = 0, l = rows.length; i < l; i++) {
        if (rows[i].checked) {
            selectedRows.push(rows[i]);
        }
    }
    totalSelected = selectedRows.length;
    return totalSelected;
}

/*!
* Method to validate email address
*
* @param str	  email			Determines email address.
*
* @return void
*
* @since 1.0.0
*/
function validateEmail(email) {
    invalid = "";
    if (!email) {
        invalid = "No email address found!  Try reloading the page then use the 'email a script' feature again.";
    } else {
        if ((email.indexOf("@") == -1) || (email.indexOf(".") == -1))
            invalid += "\n\nInvalid email address.  Your email address is missing an '@' sign and a '.' in the domain name (like '.com').  Please check your address then submit again.";

        /*if (email.indexOf("email") > -1)
            invalid += "\n\nInvalid email address.  Make sure your email address included your username, the '@' sign, and the domain name (like '.com').";*/

        if (email.indexOf("\\") > -1)
            invalid += "\n\nemail address contains an invalid back-slash (\\) character.  Remove the character and submit again.";

        if (email.indexOf("/") > -1)
            invalid += "\n\nemail address contains an invalid forward-slash (/) character.  Remove the character and submit again.";

        if (email.indexOf("'") > -1)
            invalid += "\n\nemail address contains an invalid apostrophe (') character.  Remove the character and submit again.";

        if (email.indexOf("zaz.com.br") > -1)
            invalid += "\n\nPlease do not use an email address that has an autoresponder set up for it.  Thanks.";

        if (email.indexOf("!") > -1)
            invalid += "\n\nemail address contains an invalid exclamation point (!) character.  Remove the character or correct the email address then submit again.";

        if ((email.indexOf(",") > -1) || (email.indexOf(";") > -1))
            invalid += "\n\nPlease only enter one email address in the box at a time.  Remove the extra addresses and submit again.";

        if (email.indexOf("?subject") > -1)
            invalid += "\n\nPlease do not add '?subject=...' to your email address.  Scriptbot will send you the script with a pre-defined subject already.  Please remove the '?subject=...' from your email address and submit again.";
        return (invalid);
    }
}

/*!
* Method to validate Alphabetic string.
*
* @param str	  str			Determines string to validate.
*
* @return bool
*
* @since 1.0.0
*/
function validateAlphabetic(str) {
    var alpha = /[a-zA-Z]+/g;
    return str.search(alpha);
}


/*!
* Method to validate url string.
*
* @param str	  str			Determines string to validate.
*
* @return bool
*
* @since 1.0.0
*/
function validateUrl(str) {
    //var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    var regexp = /^http:\/\/|(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!regexp.test(str)) {
        return false;
    }
    else {
        return true;
    }
}


function validateDob(str) {
    var regexp = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (!regexp.test(str)) {
        return false;
    }
    else {
        return true;
    }
}


/*!
* Method to validate numberic string.
*
* @param str	  str			Determines string to validate.
*
* @return bool
*
* @since 1.0.0
*/
function validateNumeric(str) {
    var numericExpression = /^[0-9]+$/;
    if (str.match(numericExpression)) {
        return true;
    } else {
        return false;
    }
}

function strValidate(str) {
    var testName = /^([a-z]|[A-Z]| )*$/;
    if (!testName.test(str)) {
        return false;
    }
    else {
        return true;
    }
}//end of function

/*function calculate_total_amount22(fld_name, fldtype, multi) {

    var amt_val = jQuery('input[name="total_amount"]').val();
    var prod_ids;
    var prod_amts = '';
    this.total_amt = 0;
    var pay_prod_array = jQuery('input[name="pay_prod_arr"]').val();

    var that = this;
    jQuery.each(JSON.parse(pay_prod_array), function (key, v) {

        fld_name = key + '[]';

        if (undefined == amt_val || amt_val == '') {
            amt_val = 0;
        }
        //alert(prod_array);
        data = jQuery.parseJSON(pay_prod_array);

        jQuery.each(data, function (i, v) {
            fd = fld_name.split('[]'); //need to remove array part from field name
            fld_nm = fd[0];
	        if (i == fld_nm) {
                pids_array = new Array();
                vals_array = new Array();
                jQuery.each(v, function (key, va) {
                    //console.log(JSON.stringify(va));
                    pids_array.push(va.id);
                    vals_array.push(va.amount);
                    console.log(JSON.stringify(vals_array));

                });

            }
        });

        console.log('total_amt_definition = ' + that.total_amt);
        console.log('fld_name = ' + fld_name);

        var amt = 0;
		
        if (jQuery('input[name=\'' + fld_name + '\']').is(':input') ) {
            //console.log(that.total_amt);
            jQuery('input[name=\'' + fld_name + '\']:checked').each(function () {
                key_arr = jQuery(this).attr("id").split('__');
                //console.log(JSON.stringify(key_arr) + 'has been selected.');
                k = key_arr[1] - 1;
                amt = vals_array[k];
                if (that.total_amt == 0) {
                    that.total_amt = parseFloat(amt, 10);
                    prod_ids = pids_array[k];
                    prod_amts = amt;
                    //console.log('if amount is zero');
                    //console.log('pids_array = ' + JSON.stringify(pids_array));
                    //console.log('vals_array = ' + vals_array[0]);
                    //console.log('k = ' + k);
                } else {
                    that.total_amt = parseFloat(that.total_amt, 10) + parseFloat(amt, 10);
                    prod_ids = prod_ids + "," + pids_array[k];
                    prod_amts = prod_amts + "," + amt;
                    //console.log('pids_array = ' + JSON.stringify(pids_array));
                    //console.log('vals_array = ' + vals_array[k]);
                    //console.log('k = ' + k);
                    //console.log('that.total_amt = ' + that.total_amt);
                }

                jQuery('input[name="total_amount"]').val(that.total_amt);
                jQuery('input[name="product_ids"]').val(prod_ids);
                jQuery('.prod_amt').val(prod_amts);

            });
            //console.log(jQuery('select[name=\'' + fld_name + '\'] option:selected'));
		} else {
            if (jQuery('select[name=\'' + fld_name + '\']').attr("multiple")) {
                console.log('that.total_amt_top_loop = ' + that.total_amt);
                //console.log(jQuery('select[name=\'' + fld_name + '\'] option:selected'));
                jQuery('select[name=\'' + fld_name + '\'] option:selected').each(function () {
                    console.log('that.total_amt_in_top_loop = ' + that.total_amt);
                    key_arr = jQuery(this).attr("id").split('__');
                    k = key_arr[1];
                    amt = vals_array[k];

                    if (that.total_amt == 0) {

                        that.total_amt = parseFloat(amt, 10);
                        prod_amts = amt;
                        prod_ids = pids_array[k];
                        //console.log('that.total_amt_if_empty = ' + that.total_amt);

                    } else {
                        that.total_amt = parseFloat(that.total_amt, 10) + parseFloat(amt, 10);
                        prod_amts = prod_amts + "," + amt;
                        prod_ids = prod_ids + "," + pids_array[k]

                        //console.log('that.total_amt_if_not_empty = ' + that.total_amt);
                    }

                });
                jQuery('.prod_amt').val(prod_amts);
                jQuery('input[name="total_amount"]').val(that.total_amt);
                jQuery('input[name="product_ids"]').val(prod_ids);

            } else {
                //console.log(jQuery('select[name=\'' + fld_nm + '\'] option:selected'));
                //console.log('that.total_amt_bottom_loop = ' + that.total_amt);

                jQuery('select[name=\'' + fld_nm + '\'] option:selected').each(function () {
                    //console.log('that.total_amt_top_loop = ' + that.total_amt);
                    attr = jQuery(this).attr('id');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        key_arr = jQuery(this).attr("id").split('__');
                        k = key_arr[1];

                        amt = vals_array[k];
                        if (that.total_amt == 0) {
                            that.total_amt = parseFloat(amt, 10);
                            prod_ids = pids_array[k];
                            prod_amts = amt;
                        } else {
                            that.total_amt = parseFloat(that.total_amt, 10) + parseFloat(amt, 10);
                            prod_ids = prod_ids + "," + pids_array[k]
                            prod_amts = prod_amts + "," + amt;
                        }
                    }

                });

                jQuery('.prod_amt').val(prod_amts);						//hidden amount field
                jQuery('input[name="total_amount"]').val(that.total_amt); //total amount field
                jQuery('input[name="product_ids"]').val(prod_ids);		//hidden products ids field

            }
        }
    });
    jQuery('input[name="total_amount"]').val('$' + that.total_amt);
}*/

function calculate_total_amount(fld_name, fldtype, multi) {

    var amt_val = jQuery('input[name="total_amount"]').val();
    var prod_ids;
    var prod_amts = '';
    this.total_amt = 0;
    var pay_prod_array = jQuery('input[name="pay_prod_arr"]').val();

    var that = this;
	prods  = JSON.parse(pay_prod_array);
	cont = Object.keys(prods).length;

    jQuery.each(JSON.parse(pay_prod_array), function (key, v) {
		fld_nm = key;
		key = key + '[]';
        
        if (undefined == amt_val || amt_val == '' ) 
		{
            amt_val = 0;
        }

        data = jQuery.parseJSON(pay_prod_array);

        jQuery.each(data, function ( i, v ) 
		{
	        if ( i == fld_nm ) 
			{
                pids_array = new Array();
                vals_array = new Array();
                jQuery.each(v, function (k, va) 
				{
                    pids_array.push(va.id);
                    vals_array.push(va.amount);
                    console.log(JSON.stringify(vals_array));

                });

            }
        });

       // console.log('total_amt_definition = ' + that.total_amt);
       // console.log('fld_name = ' + fld_name);
        var amt = 0;
		fld_name = key;
		
		if (!jQuery('input[name=\'' + fld_name + '\']').length && !jQuery('select[name=\'' + fld_name + '\']').length)
		{
			fld_name = fld_nm;
		}else
		{
			fld_name = key;
		}
		
		
        if (jQuery('input[name=\'' + fld_name + '\']').is(':input') ) /* checking if field is input or select*/
		{
         	var fld_type = jQuery('input[name=\'' + fld_name + '\']').prop('type'); /*finding the type of input field*/
			if(fld_type == 'checkbox')// if checkbox
			{
            	jQuery('input[name=\'' + fld_name + '\']:checked').each(function () {
                key_arr = jQuery(this).attr("id").split('__');
                //console.log(JSON.stringify(key_arr) + 'has been selected.');
                k = key_arr[1] - 1;
                amt = vals_array[k];
                if (that.total_amt == 0) {
                    that.total_amt = parseFloat(amt, 10);
                    prod_ids = pids_array[k];
                    prod_amts = amt;

                } else {
                    that.total_amt = parseFloat(that.total_amt, 10) + parseFloat(amt, 10);
                    prod_ids = prod_ids + "," + pids_array[k];
                    prod_amts = prod_amts + "," + amt;
                }

                jQuery('input[name="total_amount"]').val(that.total_amt);
                jQuery('input[name="product_ids"]').val(prod_ids);
                jQuery('.prod_amt').val(prod_amts);

            });
			}else // radio
			{
				jQuery('input[name=\'' + fld_nm + '\']:checked').each(function () {
                    console.log('that.total_amt_top_loop = ' + that.total_amt);
                    attr = jQuery(this).attr('id');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        key_arr = jQuery(this).attr("id").split('__');
                        k = key_arr[1] - 1;
                        amt = vals_array[k];
                        if (that.total_amt == 0) {
                            that.total_amt = parseFloat(amt, 10);
                            prod_ids = pids_array[k];
                            prod_amts = amt;
                        } else {
                            that.total_amt = parseFloat(that.total_amt, 10) + parseFloat(amt, 10);
                            prod_ids = prod_ids + "," + pids_array[k]
                            prod_amts = prod_amts + "," + amt;
                        }
                    }

                });

                jQuery('.prod_amt').val(prod_amts);						//hidden amount field
                jQuery('input[name="total_amount"]').val(that.total_amt); //total amount field
                jQuery('input[name="product_ids"]').val(prod_ids);
			}
            //console.log(jQuery('select[name=\'' + fld_name + '\'] option:selected'));
		} else { 
            if (jQuery('select[name=\'' + fld_name + '\']').attr("multiple")) {
                //console.log('that.total_amt_top_loop = ' + that.total_amt);
                //console.log(jQuery('select[name=\'' + fld_name + '\'] option:selected'));
                jQuery('select[name=\'' + fld_name + '\'] option:selected').each(function () {
                    console.log('that.total_amt_in_top_loop = ' + that.total_amt);
                    key_arr = jQuery(this).attr("id").split('__');
                    k = key_arr[1];
                    amt = vals_array[k];

                    if (that.total_amt == 0) {

                        that.total_amt = parseFloat(amt, 10);
                        prod_amts = amt;
                        prod_ids = pids_array[k];
                        //console.log('that.total_amt_if_empty = ' + that.total_amt);

                    } else {
                        that.total_amt = parseFloat(that.total_amt, 10) + parseFloat(amt, 10);
                        prod_amts = prod_amts + "," + amt;
                        prod_ids = prod_ids + "," + pids_array[k]

                        //console.log('that.total_amt_if_not_empty = ' + that.total_amt);
                    }

                });
                jQuery('.prod_amt').val(prod_amts);
                jQuery('input[name="total_amount"]').val(that.total_amt);
                jQuery('input[name="product_ids"]').val(prod_ids);

            } else {
                jQuery('select[name=\'' + fld_nm + '\'] option:selected').each(function () {
                    //console.log('that.total_amt_top_loop = ' + that.total_amt);
                    attr = jQuery(this).attr('id');
                    if (typeof attr !== typeof undefined && attr !== false) {
                        key_arr = jQuery(this).attr("id").split('__');
                        k = key_arr[1];

                        amt = vals_array[k];
                        if (that.total_amt == 0) {
                            that.total_amt = parseFloat(amt, 10);
                            prod_ids = pids_array[k];
                            prod_amts = amt;
                        } else {
                            that.total_amt = parseFloat(that.total_amt, 10) + parseFloat(amt, 10);
                            prod_ids = prod_ids + "," + pids_array[k]
                            prod_amts = prod_amts + "," + amt;
                        }
                    }

                });

                jQuery('.prod_amt').val(prod_amts);						//hidden amount field
                jQuery('input[name="total_amount"]').val(that.total_amt); //total amount field
                jQuery('input[name="product_ids"]').val(prod_ids);		//hidden products ids field

            }
        }
    });
	that.total_amt = that.total_amt.toFixed(2);
    jQuery('input[name="total_amount"]').val('$' + (that.total_amt));
}

jQuery(document).ready(function () {

    // call the below function to add the totals to each field
   // calculate_total_amount(this.name, 'select', 0);
   //applyTotals();
   
    /* This code is for Email validation if user pass wrong email then this will showing error and disable submit or button. */
    jQuery(document).on('change', '.emailValidation', function() {
            var formId = $(this).closest('form').attr('id');
            var makeBtnId = formId.split('_').slice(1).join('_');
            var finalBtnName = 'jcfc_btn_'+makeBtnId;
        
            jQuery('body #'+formId+' .emailError').remove();
            var emailVal = this.value;
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(filter.test(emailVal) === false)
            {
                jQuery( this ).after( "<div class='emailError' style='color: red;'>You have entered wrong email address.</div>" );
                jQuery("#"+finalBtnName).attr("disabled",true);
            }
            else 
            {
                jQuery(this).parent().find('.emailError').remove();
                jQuery("#"+finalBtnName).attr("disabled",false);
            }
        });
   
   
});




// this function iterates through all PayPal fields to append the totals to each option
function applyTotals() {
    // we iterate through all selectboxes
    jQuery.each(jQuery('select'), function (k, v) {
        // set the variable self, so we can use the properties of the current selectbox in the option loop below
        var self = this;

        // keep count of how many options were empty, so we can map the prices to the correct options
        var innerCounter = 0;

        // iterate through all options in the current selectbox
        jQuery.each(jQuery('option', this), function (kk, vv) {
            // if the option has a blank default value, don't assign a price to that option
            if (this.value == "NoVal") {
                // instead, we increment the innerCounter variable, so we can subtract it from the loop index during the other iterations
                innerCounter++;
            }
            else {
                // pull the prices from the hidden field and parse into a useable array
                var prices = jQuery('.pay_prod_arr').val();
                prices = JSON.parse(prices);

                // get the name from the current selectbox, and remove the brackets
                var name = self.name.split('[]');
                name = name[0];

                // subtracting innerCounter ensures we don't skip a price when we skip an empty option
                var option_price = prices[name][kk - innerCounter]['amount'];

                // append the price to the option
                this.innerHTML += ' ($' + parseFloat(option_price).toFixed(2) + ')';
            }

        });
    }); // end .each loop

    // we iterate through all other PayPal inputs (radiobox and checkbox)
    jQuery.each(jQuery('input.jc_paypal'), function (k, v) {
        // pull the prices from the hidden field and parse into a useable array
        var prices = jQuery('.pay_prod_arr').val();
        prices = JSON.parse(prices);

        // get the name from the current selectbox, and remove the brackets
        var inputid = this.id.split('__');

        // subtracting one because the ids start at 1 instead of 0
        var option_price = prices[inputid[0]][inputid[1] - 1]['amount'];

        // Append price to label
        var current_text = jQuery('#' + this.id).next().text();
        jQuery('#' + this.id).next().text(current_text + ' ($' + parseFloat(option_price).toFixed(2) + ')');

    }); // end .each loop

}
function fileExtValidation(component,msg,extns)
{
   var flag=0;
   with(component)
   {
      var ext=value.substring(value.lastIndexOf('.')+1);
	 for(j=0;j<extns.length;j++)
      {
         if(ext==extns[j])
         {
            flag=0;
            break;
         }
         else
         {
            flag=1;
         }
      }
      if(flag!=0)
      {
 		 alert(msg);
         component.focus();
         return false;
      }
      else
      {
         return true;
      }
   }
}

function fileSizeValidation(component,maxSize,msg)
{
   if(navigator.appName=="Microsoft Internet Explorer")
   {
      if(component.value)
      {
         var oas=new ActiveXObject("Scripting.FileSystemObject");
         var e=oas.getFile(component.value);
         var size=e.size;
      }
   }
   else
   {
      if(component.files[0]!=undefined)
      {
         size = component.files[0].size;
      }
   }
   if(size!=undefined && size>maxSize)
   {
	  alert(msg);
      component.focus();
      return false;
   }
   else
   {
      return true;
   }
}
function decodeHtml( html ) 
{
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}