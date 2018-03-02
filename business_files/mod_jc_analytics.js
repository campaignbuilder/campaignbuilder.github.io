/**
 * @version   $Id$
 * @author    Directive http://www.directive.com
 * @copyright Copyright (C) 2008 - 2013 Directive Technology Inc
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */


/*!	
 * For check and render activity.
 * 
 * @version   $Id$
 * @author    Directive http://www.directive.com
 * @copyright Copyright (C) 2008 - 2013 Directive Technology Inc
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */

 var seconds			=	0;	// Time in seconds.
 var timerObj;					// Determines timer function result.

 /**
 * Method to take action on module parameters.
 *
 * @var str checkTime			Determines to check and compare delay time or not.
 * @var int delayTime			Determines time delay to take action on parameters.
 * @var array moduleParams		Determines all module parameters.
 * @var int moduleId			Determines current module id.
 * @var array replacingTags		Determines array that content some tags which will replace in activity subject and notes section.
 *
 * @return void
 *
 * @since 1.0.0
 */
 function actionOnParams( checkTime, delayTime, moduleParams, moduleId, replacingTags )
 {
 	if( ( parseInt( seconds ) >= parseInt( delayTime ) ) || checkTime == 'no' )
	{
 		// Will pass here all parameters using AJAX to take action.
 		url			=	'index.php?option=com_joomconnect&view=ajaxfiles&type=mod_analytics&tmpl=component';			// Determine the path of Ajax file.
 		qrystring	=	'takeaction=yes&moduleId=' + moduleId + '&moduleParams=' + moduleParams + '&replacingTags=' + replacingTags;
		jQuery.ajax( {
 			url: url,
 			type: 'POST',
 			data: qrystring += qrystring,
 			dataType: 'html',
 			success: function( msg, textStatus, xhr )
 			{
 				// Parameters render successfully.
 				// alert( msg );
 			}
 		} );
	}else
 	{
 		timerObj = setInterval( function() { checkdelayTime( checkTime, delayTime, moduleParams, moduleId, replacingTags ) }, 1000 );
	}
 }

 /**
 * Method to check delay time parameter value with user stay time on page.
 *
 * @var str checkTime			Determines to check and compare delay time or not.
 * @var int delayTime			Determines time delay to take action on parameters.
 * @var array moduleParams		Determines all module parameters.
 * @var int moduleId			Determines current module id.
 * @var array replacingTags		Determines array that content some tags which will replace in activity subject and notes section.
 *
 * @return boolean
 *
 * @since 1.0.0
 */
 function checkdelayTime( checkTime, delayTime, moduleParams, moduleId, replacingTags )
 {
 	if( parseInt( delayTime ) > 0 )
	{
 		if( seconds >= delayTime )
		{
 			window.clearInterval( timerObj );				// Stop the timer.
 			actionOnParams( checkTime, delayTime, moduleParams, moduleId, replacingTags );
		}else
		{
 			seconds++;
		}
 	}
 }