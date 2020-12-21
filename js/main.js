function scrollTo(to, duration = 700) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            }
        };
    animateScroll();
}

const burgerFunc = () => {
    const submenu = document.querySelector('.js-submenu');
    if (submenu.style.display === "block") {
        submenu.style.display = "none";
    } else {
        submenu.style.display = "block";
    }
}

const removeActive = () => {
    const activeElement = document.querySelector('.active');
    activeElement.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.querySelector('#toTop');
    const headerInner = document.querySelector('.js-header__inner');
    const burger = document.querySelector('.js-burger');
    const headerItems = document.querySelectorAll('.js-header__item');

    burger.addEventListener('click', () => burgerFunc());
    window.addEventListener('scroll', function () {
        if (pageYOffset > 710 && pageYOffset < 1610) {
            headerItems[0].classList.add('active');
            headerItems[1].classList.remove('active');
            headerItems[2].classList.remove('active');
        } else if (pageYOffset > 1610 && pageYOffset < 2220) {
            headerItems[1].classList.add('active');
            headerItems[0].classList.remove('active');
            headerItems[2].classList.remove('active');
        } else if (pageYOffset > 2220) {
            headerItems[2].classList.add('active');
            headerItems[0].classList.remove('active');
            headerItems[1].classList.remove('active');
        } else {
            try {
                removeActive()
            } catch {
            }
        }

        if (pageYOffset > 100) {
            btn.style.visibility = "visible";
            if (window.innerWidth > 1200) {
                headerInner.style.padding = ".5rem 1.5rem";
            }
        } else {
            btn.style.visibility = "hidden";
            if (window.innerWidth > 1200) {
                headerInner.style.padding = "1.5rem 1.5rem";
            }
        }
    });

    btn.onclick = function (click) {
        click.preventDefault();
        scrollTo(0, 400);
    }
});