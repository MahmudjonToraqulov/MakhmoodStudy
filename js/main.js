
// window loader

window.addEventListener("load",()=>{
    /*---------------------
    page loader
    --------------------*/
    document.querySelector(".js-page-loader").classList.add("fade-out")
    setTimeout(()=>{
        document.querySelector(".js-page-loader").style.display = "none"
    },600)
})

// testimonial slider

function testimonialSlider() {
    const carouselOne = document.getElementById('carouselOne');
    if(carouselOne){
            carouselOne.addEventListener('slide.bs.carousel', function () {
            const activeItem = this.querySelector('.active');
            document.querySelector('.js-testimonial-img').src = 
            activeItem.getAttribute('data-js-testimonial-img');
        })
    }

}
testimonialSlider();

/*  --------    course preview video -------*/

function coursePrevVideo() {
    const coursePrevModal = document.querySelector(".js-preview-course-modal")
    if (coursePrevModal) {
        coursePrevModal.addEventListener("shown.bs.modal",function(){
            this.querySelector(".coursePrevModal").play()
            this.querySelector(".coursePrevModal").currentTime = 0
        })

        coursePrevModal.addEventListener("hide.bs.modal",function(){
            this.querySelector(".coursePrevModal").pause()
        })
    }
}
coursePrevVideo()

/* ------------- Header menu ----------- */

function headerMenu() {
    const menu = document.querySelector(".js-header-menu"),
    backdrop = document.querySelector(".js-header-backdrop"),
    menuCollapseBreakpoint = 991
    
    function toggleHeader() {
        menu.classList.toggle("open")
        backdrop.classList.toggle("active")
        document.body.classList.toggle("overflow-hidden")
    }

    document.querySelectorAll(".js-header-menu-toggler").forEach((item) =>{
        item.addEventListener("click",toggleHeader)
    })

    backdrop.addEventListener("click",toggleHeader)


    function collapse() {
        menu.querySelector(".active .js-sub-menu").removeAttribute("style")
        menu.querySelector(".active").classList.remove("active")
    }

    menu.addEventListener("click",function(event){
        const {target} = event


        if (target.classList.contains("js-toggle-sub-menu") && window.innerWidth <= menuCollapseBreakpoint) {
            event.preventDefault()

            if(target.parentElement.classList.contains("active")){
                collapse()
                return
            }

            if(menu.querySelector(".active")){
                collapse()
            }

            target.parentElement.classList.add("active")
            target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px"
        }
    })

    window.addEventListener("resize",function(){
        if(this.innerWidth > menuCollapseBreakpoint && menu.classList.contains("open")){
            toggleHeader()
        }
        if(this.innerWidth > menuCollapseBreakpoint && menu.querySelector(".active")){
            collapse()
        }

    })
}
headerMenu()


/* ------------------ style switcher js -------------- */

// function styleSwitcherToggle() {
//     const styleSwitcher = document.querySelector(".js-style-switcher"),
//     styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler")
    
//     styleSwitcherToggler.addEventListener("click",function(){
//         console.log("hii");
//     })
// }
// styleSwitcherToggle()

function styleSwitcherToggle(){
    const styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler"),
    styleSwitcher = document.querySelector(".js-style-switcher")
    styleSwitcherToggler.addEventListener("click",()=>{
        styleSwitcher.classList.toggle("open")
        styleSwitcher.querySelector("i").classList.toggle("fa-times")
        styleSwitcher.querySelector("i").classList.toggle("fa-cog")
    })
}
styleSwitcherToggle()




/* ----------------------theme colors---------------------- */


function themeColors(){
    const colorStyle = document.querySelector(".js-color-style")
    themeColorsContainer = document.querySelector(".js-theme-colors")

    themeColorsContainer.addEventListener("click",function({target}){
        if( target.classList.contains("data-js-theme-color")){
            localStorage.setItem("color",target.getAttribute("data-js-theme-color"))
            setColor()
        }
    })
    function setColor(){
        let path = colorStyle.getAttribute("href").split("/")
        path = path.slice(0,path.length - 1)
        a = path.join("/") + "/" + localStorage.getItem("color") + ".css" 
        colorStyle.setAttribute("href",a)

        if (document.querySelector(".data-js-theme-color.active")) {
            document.querySelector(".data-js-theme-color.active").classList.remove("active")
        }

        document.querySelector("[data-js-theme-color=" + localStorage.getItem("color") + "]").classList.add("active")
    }
    if (localStorage.getItem("color") !== null) {
        setColor()
    }
    else{
        const defaultColor = colorStyle.getAttribute("href").split("/").pop().split(".").shift()
        document.querySelector("[data-js-theme-color=" + defaultColor + "]").classList.add("active")
    }
}
themeColors()

/* -----------------theme light & dark mode ------------------ */


function themeLightDark() {
    const darkModeCheckbox = document.querySelector(".js-dark-mode")
    
    darkModeCheckbox.addEventListener("click",function(){
        
        if(this.checked){
            localStorage.setItem("theme-dark","true")
        }
        else{
            localStorage.setItem("theme-dark","false")
        }
        themeMode()
    })
    function themeMode() {
        if(localStorage.getItem("theme-dark") === "false"){
            document.body.classList.remove("t-dark")
        }
        else{
            document.body.classList.add("t-dark")
        }
    }

    if (localStorage.getItem("theme-dark") !== null) {
        themeMode()
    }
    if(document.body.classList.contains("t-dark")){
        darkModeCheckbox.checked = true
    }

}
themeLightDark()

// theme glass effect

function themeGlassEffect() {
    const glassEffectCheckbox = document.querySelector(".js-glass-effect"),
    glassStyle = document.querySelector(".js-glass-style")
    glassEffectCheckbox.addEventListener("click",function(){
        if(this.checked){
            localStorage.setItem("glass-effect","true")
        }
        else{
            localStorage.setItem("glass-effect","false")
        }
        glass()
    })
    function glass() {
        if(localStorage.getItem("glass-effect") === "true"){
            glassStyle.removeAttribute("disabled")
        }
        else{
            glassStyle.disabled = true
        }
    }

    if(localStorage.getItem("glass-effect") !== null){
        glass()
    }

    if(!glassStyle.hasAttribute("disabled")){
        glassEffectCheckbox.checked = true
    }

}
themeGlassEffect()
