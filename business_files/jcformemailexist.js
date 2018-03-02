function check_email_exisit( emailvalue, thisform )
{
	var req = getXMLHTTP();
	var formname = thisform.name;
	
	var module_id = eval("document."+formname+".mod_id.value");
	var formsettings = eval("document."+formname+".formsettings.value");
	formsettings = formsettings.replace( "--__--", "'" );
	formsettings_arr = JSON.parse(formsettings);
	var email_exist_forced_login = formsettings_arr.flagForceLogin;
	var emailExistMsg = formsettings_arr.emailExistMsg;
	var message_2_contactus = formsettings_arr.existUserContactLink;
	//alert(formsettings_arr.accessLevMsg);
	//var loginredirect = eval("document."+formname+".loginredirect.value");
	var loginredirect = formsettings_arr.existUserRedirect;
	
	var at_id=eval("document."+formname+".formId.value");
	var hiddenbaseurl=eval("document."+formname+".hiddenbaseurl.value");

	var basepath = hiddenbaseurl;
	document.getElementById("load_img_"+module_id).innerHTML = "<img src=\'"+basepath+"/media/com_joomconnect/images/loaders/ajax-loader.gif\' />";	
	document.getElementById("jcfc_btn_"+module_id).disabled='disabled';			
	var Itemid = eval("document."+formname+".Itemid.value");
	req.onreadystatechange = function() 
	{
		if (req.readyState == 4 ) 
		{
			if(req.status == 200){
				var n = req.responseText.search("first");
				if(email_exist_forced_login && email_exist_forced_login == 1 && n > 0)
				{
					document.getElementById("jcfc_btn_"+module_id).disabled=true;
				}
				else
				{
					document.getElementById("jcfc_btn_"+module_id).disabled=false;
				}
				if(req.responseText == "You Do Not have Standard Account,Please Contact The Administrator")
				{
					if(document.getElementById("check_email_exist_"+module_id))
					{
						document.getElementById("check_email_exist_"+module_id).innerHTML=req.responseText;
						document.getElementById("load_img_"+module_id).innerHTML = "";
					}
				}
				else if(req.responseText == "only on cw")
				{
					document.getElementById("load_img_"+module_id).innerHTML = "";
				}
				else
				{
					if(document.getElementById("check_email_exist_"+module_id))
					{
						document.getElementById("check_email_exist_"+module_id).innerHTML=req.responseText;
						document.getElementById("load_img_"+module_id).innerHTML = "";
						document.getElementById("check_email_exist_"+module_id).style.display = "block";
					}
				}
			}
			else {
			alert("There was a problem while using XMLHTTP:\n" + req.statusText);
			}		
		}								
	}
	var path =basepath+"/index.php?tmpl=component&option=com_joomconnect&view=ajaxfiles&type=checkemailexist&emailvalue="+emailvalue+"&loginredirect="+loginredirect+"&message_2_contactus="+message_2_contactus+"&module_id="+module_id+"&atid="+at_id+"&Itemid="+Itemid+"&email_exist_forced_login="+email_exist_forced_login;
	
	//alert(path);
	req.open("GET", path, true);
	req.send(null);
}

function check_email_exist( emailvalue, thisform )
{
    if (emailvalue == "") {
        return;
    }
	var JCquery = jQuery.noConflict();
	var formname = thisform.name;

	var module_id = eval( "document." + formname + ".mod_id.value" );
	var formsettings = eval( "document." + formname + ".formsettings.value" );
	formsettings = formsettings.replace( "--__--", "'" );
	formsettings_arr = JSON.parse( formsettings );
	var email_exist_forced_login = formsettings_arr.flagForceLogin;
	var emailExistMsg = formsettings_arr.emailExistMsg;
	var message_2_contactus = formsettings_arr.existUserContactLink;
	//alert(formsettings_arr.accessLevMsg);
	//var loginredirect = eval("document."+formname+".loginredirect.value");
	var loginredirect = formsettings_arr.existUserRedirect;

	var at_id = eval( "document." + formname + ".formId.value" );
	var hiddenbaseurl = eval( "document." + formname + ".hiddenbaseurl.value" );

	var basepath = hiddenbaseurl;
	JCquery( "#load_img_" + module_id ).html( "<img src=\'" + basepath + "/media/com_joomconnect/images/loaders/ajax-loader.gif\' />" );
	//document.getElementById( "load_img_" + module_id ).innerHTML = "<img src=\'" + basepath + "/media/com_joomconnect/images/loaders/ajax-loader.gif\' />";
	document.getElementById( "jcfc_btn_" + module_id ).disabled = 'disabled';
	JCquery( "#jcfc_btn_" + module_id ).css( 'opacity', '0.1' );
	var Itemid = eval( "document." + formname + ".Itemid.value" );
	var randomnumber2 = Math.floor( Math.random() * 11 );
	var d = new Date();
	var random3 = d.getTime();
	var isRegform = jQuery("#isRegForm").val();
	
	var path = basepath + "index.php?option=com_joomconnect&view=ajaxfiles&type=checkemailexist&tmpl=component&emailvalue=" + emailvalue + "&loginredirect=" + loginredirect + "&message_2_contactus=" + message_2_contactus + "&module_id=" + module_id + "&atid=" + at_id + "&Itemid=" + Itemid + "&email_exist_forced_login=" + email_exist_forced_login + "&isRegform =" + isRegform + "&randomnumber=" + randomnumber2 + random3;
	
	JCquery.ajax(
	{
		url: path,
		type: 'POST',
		success: function(req)
		{
			var n = req.search( "first" );
			if( email_exist_forced_login && email_exist_forced_login == 1 && n > 0 )
			{
				JCquery( "#jcfc_btn_" + module_id ).attr( 'disabled', 'disabled' );
			}
			else
			{
				JCquery( "#jcfc_btn_" + module_id ).removeAttr( 'disabled' );
				JCquery( "#jcfc_btn_" + module_id ).css( 'opacity', '1' );
			}
			
			if( req.search( "login" ) > 0 && isRegform == 1 )
			{
				JCquery( "#jcfc_btn_" + module_id ).attr( 'disabled', 'disabled' );
				
				req = req + '<br><a href="' + basepath + 'index.php?option=com_users&view=reset" target="_blank">Forgot Password?</a>';
				
				jQuery("form#jcfc_Website_Registration .dfpfa").html("");
			}
			
			if( req == "You Do Not have Standard Account,Please Contact The Administrator" )
			{
				if( JCquery( "#check_email_exist_" + module_id ) )
				{
					JCquery( "#check_email_exist_" + module_id ).html(req);
					JCquery( "#load_img_" + module_id ).html( "" );
				}
			}
			else if( req == "only on cw" )
			{
				JCquery( "#load_img_" + module_id ).html( "" );
			}
			else
			{
				if( JCquery( "#check_email_exist_" + module_id ) )
				{
					JCquery( "#check_email_exist_" + module_id ).html( req );
					JCquery( "#load_img_" + module_id ).html( "" );
					JCquery( "#check_email_exist_" + module_id ).css( 'display','block' );
				}
			}
		}
			
	});
}

function getXMLHTTP() { //fuction to return the xml http object
			var xmlhttp=false;	
			try{
				xmlhttp=new XMLHttpRequest();
			}
			catch(e)	{		
				try{			
					xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e){
					try{
					xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
					}
					catch(e1){
						xmlhttp=false;
					}
				}
			}
				
			return xmlhttp;
		}

function login_box()
{
	var myLink = document.getElementById("myLink");
	myLytebox.start(myLink,false,true);
	return false;
}