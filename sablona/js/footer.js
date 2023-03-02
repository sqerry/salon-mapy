const footerBlog = () => {
    const url = 'https://www.milorybarskepotreby.cz/cache/clankymilo/'

    fetch(url)
        .then((res) => res.text())
        .then((responseText) => {
            const doc = new DOMParser().parseFromString(responseText, 'text/html')

            const firstBlog = doc.querySelector('#newsWrapper .news-item:first-child')
            const secondBlog = doc.querySelector('#newsWrapper .news-item:nth-child(2)')
            const thirdBlog = doc.querySelector('#newsWrapper .news-item:nth-child(3)')

            if (firstBlog && secondBlog && thirdBlog) {
                const blogFooter = document.querySelector('.custom-footer__banner1 .accordion__content')

                blogFooter.append(firstBlog, secondBlog, thirdBlog)
            }
        })
}

function copyright() {
    console.log('rn')
    $('#signature').append(
        '<span style="padding-left: 5px;">| <a href="https://mimedigital.cz/" target="_blank"><span>mime digital</span> <img src= "https://www.sedooz.sk/user/documents/upload/sablona-nemazat/svg/mime-digital_1.svg" class = "mime-signature" alt="mime digital"></a></span>'
    )
}

$(document).ready(function () {
    const isFooter = document.querySelector('#footer')

    if (isFooter) {
        footerBlog()
        copyright()
    }
})
