$( document ).ready(function() {
    console.log( "ready!" );


    $('iframe').load( function() {
        $('iframe').contents().find('img[id="policeLogo"]').attr('style', 'height: 70px');
    });
    
    $('iframe').load( function() {
        $('iframe').contents().find('h1[id="headerText"]').attr('style', 'font-size: 1.8em');
    });  
    
        $('iframe').load( function() {
        $('iframe').contents().find('footer').attr('style', 'display: none');
    }); 
    
});