(function () {
    const selectorsToRemove = [
        '#left-sidebar',          
        '#sidebar',               
        'header',                 
        '#onetrust-banner-sdk',   
        '.js-dismissable-hero',   
        'footer',                 
        '.site-footer',           
        '#herobox'                
    ];

    selectorsToRemove.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });

    const content = document.querySelector('#content');
    if (content) {
        content.style.width = '100%';
        content.style.border = 'none';
    }
    const mainbar = document.querySelector('#mainbar');
    if (mainbar) {
        mainbar.style.width = '100%';
    }

    //                          галочка
    const acceptedAnswer = document.querySelector('.answer.accepted-answer');

    if (acceptedAnswer) {
        acceptedAnswer.style.border = '4px solid #2e7d32';
        acceptedAnswer.style.backgroundColor = '#e8f5e9';
        acceptedAnswer.style.borderRadius = '8px';
        acceptedAnswer.style.padding = '15px';

        acceptedAnswer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        console.log("Прийнятої відповіді нема");
    }
})();