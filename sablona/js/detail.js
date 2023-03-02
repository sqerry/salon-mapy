const helpBox = () => {
    const helpbox = document.querySelector('#footer .detail-contact-box')
    const infoWrapper = document.querySelector('.p-info-wrapper')

    if (!helpbox) return

    infoWrapper?.insertAdjacentElement('beforeend', helpbox)
}

$(document).ready(function () {
    const detail = document.querySelector('.type-detail')

    if (detail) {
        helpBox()
    }
})
