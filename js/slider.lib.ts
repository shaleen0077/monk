interface SlideContent {
    text: string;
    description: string;
    imageClassName: string;
    template: string;
}

class SliderLibrary {
    public logoPosition: "bottom-right" | "bottom-left" | "top-right" | "top-left" = "bottom-left";
    public slideContent: SlideContent[] = [];
    public currentSlideIndex: number = 0;

    /**
     * Initialize the slides
     */
    public init(): void {
        const currentSlide: SlideContent = this.slideContent[this.currentSlideIndex];
        const template = `<div class='arrow-left d-none'><</div>` +
            `<div class='slide-text'>${currentSlide.text}</div>` +
            `<div class='arrow-right'>></div>` +
            `<div class='slider-content-area ${currentSlide.imageClassName}'></div>` +
            `<img class='slider-logo ${this.logoPosition}' src='./images/logo.svg'>` +
            `<div class="slide-template">${currentSlide.template}</div>` +
            this.navTemplate() +
            this.slideDescTemplate();
        document.querySelector('.slider-wrapper').innerHTML = template;
        this.attachEvents();
    }

    /**
     * Attach events to clickable entities
     */
    public attachEvents(): void {
        document.querySelector(".arrow-left").addEventListener("click", () => this.navigateSlides(true));
        document.querySelector(".arrow-right").addEventListener("click", () => this.navigateSlides());
        document.querySelector(".slider-navigation-wrapper").addEventListener("click", (e: any) => {
            this.navigateSlides(false, parseInt(e.target.getAttribute("data-id")));
        });
    }

    public navigateSlides(backward: boolean = false, index: number = -1): void {
        // Remove slide content
        document.querySelector(".slide-template").innerHTML = '';
        document.querySelector(".slide-text").innerHTML = '';
        document.querySelector(".slide-description").innerHTML = '';
        
        const currentClassName = this.slideContent[this.currentSlideIndex].imageClassName;
        // If user has selected any slide from navigation bar
        if (index > -1) {
            this.currentSlideIndex = index;
        } else {
            // If user is using arrow to navigate back and forward
            backward ? this.currentSlideIndex-- : this.currentSlideIndex++;
        }

        if (this.currentSlideIndex > (this.slideContent.length - 1)) {
            this.currentSlideIndex = 0;
        }

        this.handleNavigation();
        const currentElementClassList = document.querySelector(".slider-content-area").classList;
        const nextSlide = this.slideContent[this.currentSlideIndex];
        currentElementClassList.remove(currentClassName);
        currentElementClassList.add(nextSlide.imageClassName);
        setTimeout(() => {
            document.querySelector(".slide-text").innerHTML = nextSlide.text;
            document.querySelector(".slide-template").innerHTML = nextSlide.template;
            document.querySelector(".slide-description").innerHTML = nextSlide.description;
        }, 1000);
    }

    /**
     * Handle the navigation arrows
     * Hide the back arrow when current slide is first
     * Hide the next arrow when current slide is last
     */
    public handleNavigation() {
        const currentActiveNav = document.querySelector(".active-slide-nav");
        if (currentActiveNav) {
            currentActiveNav.classList.remove('active-slide-nav');
        }

        const nextActiveNav = document.querySelector(".slide-navigation > [data-id='" + this.currentSlideIndex + "']");
        nextActiveNav.classList.add('active-slide-nav');

        // Show both the arrows
        document.querySelector(".arrow-left").classList.remove('d-none');
        document.querySelector(".arrow-right").classList.remove('d-none');
    
        if (this.currentSlideIndex === 0) {
            // hide the back arrow
            document.querySelector(".arrow-left").classList.add('d-none');

        } else if (this.currentSlideIndex === (this.slideContent.length - 1)) {
            // hide the next arrow
            document.querySelector(".arrow-right").classList.add('d-none');
        }
    }

    /**
     * Construct and return template for navigation bar
     */
    public navTemplate(): string {
        let template = "<ul class='slider-navigation-wrapper'>";
        this.slideContent.forEach((_, index) => {
            template +=
            `<li class="slide-navigation">` +
                `<span data-id=${index} class="${index === this.currentSlideIndex ? "active-slide-nav" : "" }">${index === 0 || index === (this.slideContent.length - 1) ? "&nbsp;" : index}</span>` +
            `</li>`;
        });
        return template + "</ul>";
    }

    /**
     * Construct and return slide description template
     */
    public slideDescTemplate(): string {
        let template = "<span class='slide-description'>" +
            "<span>" + this.slideContent[this.currentSlideIndex].description + "</span>"
        "</span>";
        return template;
    }
}

const templateFirstSlide = `<div class="first-template-heading">We are breaking<br/>our vow<br/>of silence</div>` +
`<div class="first-template-desc">In January 2011, after a decade of digital, we opened the doors to our temple.<br/>` +
`Follow our noble eightfold path to digital enlightenment here.</div>`;

const templateCareersSlide = `<div class="mm-careers-template"><h1 class="mm-headline">Become a monk</h1>
<div class="mm-description">Interested in joining our monastery?
<div class="mm-content">Check out our current openings on <a href="https://mediamonks.com/careers">mediamonks.com/careers</a>.</p></div>`;

let slider = new SliderLibrary();
slider.logoPosition = "bottom-right";
slider.slideContent = [
    { text: '', imageClassName: 'slider-0-image', description: '', template: templateFirstSlide },
    { text: 'Talent is given<br/>true skill is<br/>earned', imageClassName: 'slider-1-image', description: 'Step 1 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: 'Be flexible to<br/>change and <br/>sturdy in<br/>conviction', imageClassName: 'slider-2-image', description: 'Step 2 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: 'Use many skills<br/>yet work as one', imageClassName: 'slider-3-image', description: 'Step 3 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: 'To master<br/>anything find<br/>interest in<br/>everything', imageClassName: 'slider-4-image', description: 'Step 4 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: 'Individuals<br/>flourish<br/>if culture<br/>and wisdom<br/>are shared', imageClassName: 'slider-5-image', description: 'Step 5 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: 'Train for<br/>perfection but<br/>aim for more', imageClassName: 'slider-6-image', description: 'Step 6 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: 'Take pride in your<br/>work but do not<br/>seek praise', imageClassName: 'slider-7-image', description: 'Step 7 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: 'Temporary<br/>sacrifice brings<br/>lasting results', imageClassName: 'slider-7-image', description: 'Step 8 out of 8 on the path of digitial enlightenment.', template: '' },
    { text: '', imageClassName: 'slider-8-image', description: '', template: templateCareersSlide },
];
slider.init();