let fruits = [
    {id: 1, title: "Яблоки", price: 20, img: 'https://lifeglobe.net/x/entry/6259/1a-0.jpg'},
    {id: 2, title: "Апельсины", price: 30, img: 'https://lh3.googleusercontent.com/proxy/1KlJmztMgygXX7uulFWGcH58FcybPdZWVOQbh-BerRLQVnFzUbEbq_f5G2TGahWx3jr6MvHXwUz4dDxYurmwR6MtiIKvysQgPTFY1qhnpeHMeU9joUZz_RQBHuHfsuE'},
    {id: 3, title: "Манго", price: 40, img: 'https://zamorozka54.ru/images/product/38_f18cf7bb1822.jpg'},
]

const toHTML = fruit => 
    `<div class="card col" data-id=${fruit.id}>
        <img class="card-img-top" style="height: 300px" src="${fruit.img}">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>

            <a href="#" class="btn btn-primary" data-btn="price" data-id=${fruit.id}>Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id=${fruit.id}>Удалить</a>
        </div>
    </div>`



function render () {
    const html = fruits.map(fruit => toHTML(fruit)).join('');
    document.querySelector('#fruits').innerHTML = html;
}


render();

document.addEventListener('click', (evt) => {
    evt.preventDefault();
    const btnType = evt.target.dataset.btn;
    const id = +evt.target.dataset.id;
    const fruit = fruits.find(item => item.id === id);

    if(btnType === 'price') {
        priceModal.setContent(`<p>Стоимость ${fruit.title} <strong>${fruit.price}$</strong></p>`)
        priceModal.open();
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`,
        })
        .then(()=> {
            console.log('delete')
            console.log(document.querySelector('#fruits'))
            fruits = fruits.filter(item => item.id !== id);
            render();
        })
        .catch(()=> {
            console.log('canceled')
        })

    } 
})

const priceModal = $.modal({title: 'Цена на товар', closable: true, 
width: '400px',
footerButtons: [{
    text: 'Закрыть',
    type: 'primary', 
    handler () {
        console.log('primary btn clicked');
        priceModal.close();
    }

}]
});



/* function generateCards (arr) {
arr.forEach(item => {
    let newCard = _createCard(item);
    console.log(newCard);
    newCard.querySelector('.btn-primary').addEventListener('click', (evt) => {
       let fruitId = evt.target.parentNode.parentNode.id - 1;
        console.log(fruits[fruitId].title)
        const fruitModal = $.modal({title: fruits[fruitId].title, closable: true, content: `<p>Стоимость товара ${fruits[fruitId].price} рублей</p>`, width: '300px',});
        fruitModal.open();
      })

    newCard.querySelector('.btn-danger').addEventListener('click', (evt) => {
    
    console.log( evt.target.parentNode.parentNode.id);
    let fruitId = evt.target.parentNode.parentNode.id - 1;
    const fruitModal = $.modal({title: fruits[fruitId].title, closable: true, content: `<p>Удалить ${fruits[fruitId].title} ?</p>`, width: '300px', footerButtons: [{
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
    fruitModal.open();
    })
    cardsContainer.appendChild(newCard);
})



}

generateCards(fruits);
 */
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