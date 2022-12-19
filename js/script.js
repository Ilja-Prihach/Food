window.addEventListener('DOMContentLoaded', () => {     //назначаем главный обработчик событий


    //Создаем переменные с которыми будем работать
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');



    //ТАбы      
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

    //Делаем таймер
    // Алгоритм:
    // Функция которая будет устанавливать таймер
    // Функция определяющая разницу между временем
    // Функция которая будет обнавлять таймер
    const deadline = '2023-01-21'; // конечная дата таймера

    function getTimeRemaining(endtime) { // функ опред разницу между дедлайном и текущ времени
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // получим кол-во миллесек до которого нам нужно считать

        if (t <=0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 *24)),      // кол-во дней до дедлайна
            hours = Math.floor((t /( 1000* 60 * 60)) % 24),  // кол-во часов
            minutes = Math.floor((t / 1000 / 60) % 60),  
            seconds = Math.floor((t / 1000) % 60);
        }

        return {  //переенные только внутри функции, возвращаем их наружу с помощью ретерн
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };   
    }

    //функция которая будет в таймер подставлять ноль, если цифра <10
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //Пишем функцию которая будет устанавливать таймер на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();  // убираем баг мигания таймера      

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }     
    }
    setClock('.timer', deadline );


    //Модальное окно
    //Создаю переменные
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
    
    //Алгаритм работы скрипта:
    //Создаю две функции на открытие и закрытие модального окна  
    //на неcколько триггеров подвязать обработчики событий 

    //перебираем наши кнопки, чтобы навесить на них обработчик событий
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            // modal.classList.toggle('show');
            document.body.style.overflow = 'hidden'; //чтобы страница не скролилась когда модал открыто
        });
    });

    //создаю функию closeModal, чтобы небыло повторения кода
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow = '';
    }
    

    modalCloseBtn.addEventListener('click', closeModal);

    // функционал, чтобы скипнуть модал если мимо него 
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    //функционал, чтобы скипать модальное окно при нажати на esc
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

});