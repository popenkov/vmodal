const fruits = [
    {id: 1, title: "Яблоки", price: 20, img: 'https://lifeglobe.net/x/entry/6259/1a-0.jpg'},
    {id: 2, title: "Апельсины", price: 30, img: 'https://lh3.googleusercontent.com/proxy/1KlJmztMgygXX7uulFWGcH58FcybPdZWVOQbh-BerRLQVnFzUbEbq_f5G2TGahWx3jr6MvHXwUz4dDxYurmwR6MtiIKvysQgPTFY1qhnpeHMeU9joUZz_RQBHuHfsuE'},
    {id: 3, title: "Манго", price: 40, img: 'https://zamorozka54.ru/images/product/38_f18cf7bb1822.jpg'},
]


/* cardsContainer.appendChild(card); */

fruits.forEach(item => {
    
    cardsContainer.appendChild(_createCard(item));
})

/* 
1. динамически на основе массива вывести список карточек
2. при клике на показать цену - показать модалку с ценой и одной кнопкой ок
3. при клике на удалить - показать модалкуЖ удалить апельскины? ок отмена.
----------------
*4. удалить карточку из дом дерева при клике на ок. на основе $.modal сделать другой плагин $.confirm (Promise) 
*/

const myModal = $.modal({title: 'Пост 1', closable: true, content: `<h3>${'Пост номер 1'}</h3><p>${'Я делаю домашнее задание'}</p>`, width: '50%',
footerButtons: [{
    text: 'Ok',
    type: 'primary', 
    handler () {
        console.log('primary btn clicked');
        myModal.close();
    }
},

    {text: 'Cancel',
    type: 'danger', 
    handler () {
        console.log('danger btn clicked');
        myModal.close();
    }
}]
});