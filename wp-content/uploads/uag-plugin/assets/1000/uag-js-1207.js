document.addEventListener("DOMContentLoaded", function(){ window.addEventListener("DOMContentLoaded", function(){
	UAGBForms.init( {"block_id":"4d5b562c","reCaptchaEnable":false,"reCaptchaType":"v2","reCaptchaSiteKeyV2":"","reCaptchaSecretKeyV2":"","reCaptchaSiteKeyV3":"","reCaptchaSecretKeyV3":"","afterSubmitToEmail":false,"afterSubmitCcEmail":"","afterSubmitBccEmail":"","afterSubmitEmailSubject":"Form Submission","sendAfterSubmitEmail":true,"confirmationType":"message","hidereCaptchaBatch":false,"captchaMessage":"Please fill up the above captcha.","confirmationUrl":""}, '.uagb-block-4d5b562c', 1207 );
});
var ssLinksParent = document.querySelector( '.uagb-block-c281e367' );
ssLinksParent?.addEventListener( 'keyup', function ( e ) {
var link = e.target.closest( '.uagb-ss__link' );
if ( link && e.keyCode === 13 ) {
	handleSocialLinkClick( link );
}
});

ssLinksParent?.addEventListener( 'click', function ( e ) {
var link = e.target.closest( '.uagb-ss__link' );
if ( link ) {
	handleSocialLinkClick( link );
}
});

function handleSocialLinkClick( link ) {
var social_url = link.dataset.href;
var target = "";
if ( social_url == "mailto:?body=" ) {
	target = "_self";
}
var request_url = "";
if ( social_url.indexOf("/pin/create/link/?url=") !== -1 ) {
	request_url = social_url + encodeURIComponent( window.location.href ) + "&media=" + '';
} else {
	request_url = social_url + encodeURIComponent( window.location.href );
}
window.open( request_url, target );
}
 });