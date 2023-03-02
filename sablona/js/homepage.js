const posBanners = () => {
    const nextToCarouselBanners = document.querySelector('.banners-top-block .next-to-carousel-banners')
    const topBanners = document.querySelector('.banners-top-block')
    const mobile = document.querySelector('.mobile')
    const usp = document.querySelector('.benefitBanner.position--benefitHomepage')

    if (!mobile && topBanners) {
        nextToCarouselBanners.insertAdjacentElement('beforebegin', usp)
    }

    if (mobile && topBanners) {
        topBanners.insertAdjacentElement('beforebegin', usp)
    }
}

const blog = () => {
    const intervalId = setInterval(isBlog, 100)

    function isBlog() {
        const blog = document.querySelector('.blog-hp')

        if (blog) {
            clearInterval(intervalId)

            setTimeout(() => {
                const readMoreBtn = `
              <div class = "text-center">
                <a href='/blog' class='btn'>Další články</a>
               </div>
             `

                blog.insertAdjacentHTML('beforeend', readMoreBtn)
            }, 500)
        }
    }
}

$(document).ready(function () {
    const hp = document.querySelector('.type-index')

    if (hp) {
        posBanners()
        blog()
    }
})
