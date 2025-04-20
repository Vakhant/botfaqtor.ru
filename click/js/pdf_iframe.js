document.addEventListener('DOMContentLoaded', function() {
    const pdfLinks = document.querySelectorAll('.pdf-link');
    const popup = document.querySelector('.pdf-popup');
    const closeBtn = document.querySelector('.close-popup');
    const pdfIframe = document.querySelector('.pdf-iframe');
  
    // Открытие попапа
    pdfLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const pdfUrl = this.getAttribute('data-pdf');
        pdfIframe.src = pdfUrl;
        popup.style.display = 'flex';
      });
    });
  
    // Закрытие попапа
    closeBtn.addEventListener('click', function() {
      popup.style.display = 'none';
      pdfIframe.src = ''; // Очищаем iframe
    });
  
    // Закрытие по клику вне контента
    popup.addEventListener('click', function(e) {
      if (e.target === popup) {
        popup.style.display = 'none';
        pdfIframe.src = '';
      }
    });
  });