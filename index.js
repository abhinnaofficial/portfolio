// LENIS ANIMATION
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// CURSOR ANIMATION
var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

// Set initial values of mouseX and mouseY to current mouse position
window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function initCursorAnimation() {
    gsap.to({}, 0.016, {
        repeat: -1,
        onRepeat: function () {
            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            })
        }
    });

    window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    })

    cursorScale.forEach(link => {
        link.addEventListener('mouseleave', () => {
            console.log('Mouse leave event');
            cursor.classList.remove('grow');
            cursor.classList.remove('grow-small');
            cursor.classList.remove('grow-smaller');
            console.log('Event fired');
        });
        link.addEventListener('mousemove', () => {
            console.log('Mouse move event');
            cursor.classList.add('grow');
            if (link.classList.contains('small')) {
                cursor.classList.remove('grow');
                cursor.classList.add('grow-small');
                console.log('Event fired');
            } else if (link.classList.contains('smaller')) {
                cursor.classList.remove('grow');
                cursor.classList.remove('grow-small');
                cursor.classList.add('grow-smaller');
                console.log('Event fired for smaller cursor');
            }
        });
    });
}

// PRELOADER
function startloader() {
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;

    function updateCounter() {
        if (currentValue === 100) {
            return;
        }

        currentValue += Math.floor(Math.random() * 10) + 1;

        if (currentValue > 100) {
            currentValue = 100;
        }

        counterElement.textContent = currentValue;

        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
    }

    updateCounter();
}

startloader();

gsap.to(".counter", 0.25, {
    delay: 3.5,
    opacity: 0,
    onComplete: function () {
        // Start the cursor animation after counter animation is done
        initCursorAnimation();
    },
});

gsap.to(".bar", 2.5, {
    delay: 3.5,
    height: 0,
    stagger: {
        amount: 0.5,
    },
    ease: "power4.inOut",
    onComplete: function () {
        // Remove the styles from the preloader overlay and counter
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".bar").style.display = "none";
        document.querySelector(".counter").style.display = "none";
    },
});

gsap.to(".second-bar", 2.5, {
    delay: 3.3,
    height: 0,
    stagger: {
        amount: 0.5,
    },
    ease: "power4.inOut",
    onComplete: function () {
        // Remove the styles from the preloader overlay and counter
        document.querySelector(".overlay").style.display = "none";
        document.querySelector(".bar").style.display = "none";
        document.querySelector(".counter").style.display = "none";
    },
});

// TEXT ELEMENT FADE-IN ANIMATION
const textElements = document.querySelectorAll(".fade-text");

textElements.forEach((textElement) => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: textElement,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
        },
    });

    tl.fromTo(
        textElement,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
    );
});

// HOVER EFFECT FOR NAVIGATION LINKS
(function () {
    const link = document.querySelectorAll('nav > .hover-this');

    const animateit = function (e) {
        const span = this.querySelector('.span1');
        const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = this,

            move = 2,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;

        span.style.transform = `translate(${xMove}px, ${yMove}px)`;

        if (e.type === 'mouseleave') span.style.transform = '';
    };

    if (window.innerWidth > 480) {
        link.forEach(b => b.addEventListener('mousemove', animateit));
        link.forEach(b => b.addEventListener('mouseleave', animateit));
    }
})();

// WIGGLE EFFECT
(function () {
    const elementsToWiggle = document.querySelectorAll('.wiggle-animation');

    const animateWiggle = function (e) {
        const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = this,

            move = 2,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;

        this.style.transform = `translate(${xMove}px, ${yMove}px)`;

        if (e.type === 'mouseleave') this.style.transform = '';
    };

    elementsToWiggle.forEach(element => {
        element.addEventListener('mousemove', animateWiggle);
        element.addEventListener('mouseleave', animateWiggle);
    });
})();

// PROJECT BOXES ANIMATION
const projectBoxes = document.querySelectorAll('.project');

projectBoxes.forEach((box) => {
    const descriptionContainer = box.querySelector('.description-container');
    const tl = gsap.timeline({ paused: true });

    tl.to(descriptionContainer, { height: 'auto', opacity: 1, duration: 0.3 });

    box.addEventListener('mouseenter', () => {
        tl.play();
    });

    box.addEventListener('mouseleave', () => {
        tl.reverse();
    });
});

// CONTAINER ANIMATION
const containers = document.querySelectorAll(".container");

containers.forEach((container) => {
    const box = container.querySelector(".box");
    const text = container.querySelector(".text");
    const hiddenText = container.querySelector(".hidden-text");

    container.addEventListener("mouseenter", () => {
        gsap.fromTo(
            box,
            { height: "0", top: "50%" },
            { height: "100%", top: "0%", duration: 0.4 }
        );
    });

    container.addEventListener("mouseleave", () => {
        gsap.fromTo(
            box,
            { height: "100%", top: "0%" },
            { height: "0", top: "50%", duration: 0.4 }
        );
    });
});

// CONTACT CONTAINER ANIMATION
const containers2 = document.querySelectorAll(".container-contact");

containers2.forEach((container) => {
    const box2 = container.querySelector(".box-contact");
    const text2 = container.querySelector(".text-contact");
    const hiddenText2 = container.querySelector(".hidden-text-contact");

    container.addEventListener("mouseenter", () => {
        gsap.fromTo(
            box2,
            { height: "0", top: "50%" },
            { height: "100%", top: "0%", duration: 0.4 }
        );
    });

    container.addEventListener("mouseleave", () => {
        gsap.fromTo(
            box2,
            { height: "100%", top: "0%" },
            { height: "0", top: "50%", duration: 0.4 }
        );
    });
});

$(document).ready(function () {
    // Smooth scroll for anchor links
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
});
