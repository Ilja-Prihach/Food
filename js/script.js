window.addEventListener('DOMContentLoaded', () => {     //назначаем главный обработчик событий


    //Создаем переменные с которыми будем работать
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    // скрыаем все не нужные нам табы переборм ерез forEach и скрытие через инлайн стили
    function hideTabeContent () {
        tabsContent.forEach(item => {
           // item.style.display = 'none';   через инлайн стили
           //через класс
           item.classList.add('hide');
           item.classList.remove('show', 'fade');
        });
    //когда скрываем табы, убираем у них класс активности
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });    
    }    
    
    //создаем функцию которая наоборот будет показывать нам табы
    //элемент к которому обращаемся передаем как аргумен i
    function showTabContent (i = 0) {
        //tabsContent[i].style.display = 'block';             //делаем таб видимымы
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');    //задаем классс активности
    }

    hideTabeContent();
    showTabContent();

    //делигирование событий, назначаем обработчик события клика
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {   // item перебираемые табы i порядковый номер таба
                if(target == item) { //если элемент на который мы кликнули будет совпадать с item
                    hideTabeContent();  // то выполняются эти две функции
                    showTabContent(i);
                }
            });
        }
    });

});