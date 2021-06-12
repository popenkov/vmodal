const cardsContainer = document.querySelector('.row');

function _createCard (options) {
    let {id, title, price, img} = options;

    

    const card = document.createElement('div');
    card.classList.add('card', 'col', `#${id}`);
    card.insertAdjacentHTML('afterBegin', `
    <img class="card-img-top" style="height: 300px" src=${img}>
                    <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <a href="#" class="btn btn-primary">Посмотреть цену</a>
                      <a href="#" class="btn btn-danger">Удалить</a>
                    </div>`
)

return card;

}



