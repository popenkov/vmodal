Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop () {

}

function _createModalFooter (buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');

    buttons.forEach(btn => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick= btn.handler || noop;
        wrap.appendChild($btn);
    })
    return wrap;
}

function _createModal(options) {
    let {title, closable, content, width, footerButtons} = options;
    const DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');
    modal.classList.add('vmodal');
    modal.insertAdjacentHTML('afterBegin', `
        <div class="modal-overlay" data-close="true">

            <div class="modal-window" style="width: ${width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${title || "Окно"}</span>                    
                    ${closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${content || ''}
                </div>

            </div>

        </div>`
    )

    const footer = _createModalFooter(footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal);
    return modal;
}



/* 
+++ title: string
+++ closable: boolean -показывать крестик или нет
+++ content: string html
+++ width: string ('400px')
destroy(): void - удалять все слушатели и модальное окно
---------------------------------------------------------
на крестик и на клик вне контента окно должно закрываться

********** публичный метод setContent(html: string): void
lifecycle hookes: onClose(): void
 onOpen(): void
  beforeClose(): boolean
  _____________
  animate css lybrary
*/

$.modal = function (options) {
    const ANIMATION_SPEED = 200;

    const $modal = _createModal(options);

    let closing = false;
    let destroyed = false;

    const modal = {
        open () {
            if (destroyed) {
                console.log('Modal is destroyed')
            }
            
            !closing && $modal.classList.add('open');  
        },
        close () {
            closing=true;
            $modal.classList.remove('open'); 
            $modal.classList.add('hide');
            setTimeout(() => {
                $modal.classList.remove('hide');
                closing = false;
                if (typeof options.onClose === 'function') {
                    options.onClose();
                }
            }, ANIMATION_SPEED)  
        }
    }

    const listener = evt => {
        if (evt.target.dataset.close) {
            modal.close();
        }
    };

    $modal.addEventListener('click', listener);

/*     const closeBtn = $modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', $modal.close()) */

    return Object.assign(modal, {
        destroy () {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed= true;
        },
        setContent (html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        }
    });
}