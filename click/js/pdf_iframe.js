$(function(){
    $('.pdf-link').click(function(e){
        e.preventDefault();
        var pdfUrl = $(this).data('pdf');
        var imageUrl = $(this).data('image');
        
        if(window.innerWidth <= 991) {
            // Для мобильных - показываем изображение
            $('.pdf-iframe').hide();
            $('#mobileImageWrap').show();
            $('#mobileImage').attr('src', imageUrl);
            $('.pdf-popup').show();
        } else {
            // Для десктопов - показываем PDF
            $('#mobileImageWrap').hide();
            $('.pdf-iframe').attr('src', pdfUrl).show();
            $('.pdf-popup').show();
        }
    });
    
    $('.close-popup, .pdf-popup').click(function(e){
        if(e.target === this || $(e.target).hasClass('close-popup')) {
            $('.pdf-popup').hide();
            $('.pdf-iframe').attr('src', '');
            $('#mobilemage').attr('src', '');
        }
    });
});