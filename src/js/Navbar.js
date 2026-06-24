// ============= NAVIGATION BUTTON ===============
const navButton = document.querySelector(".nav-btn");
const navList = document.querySelector(".nav-list");
const navOverlay = document.querySelector(".nav-overlay");
const navItem = document.querySelectorAll(".nav-item");


let showMenu = false;
if (navButton) {
    navButton.addEventListener("click", openMenu);
}
// navList.addEventListener("click", openMenu);

function click() {
    alert("you clicked");
}


function openMenu () {
    if(!showMenu) {
        if (navButton) navButton.classList.add("close");
        if (navList) navList.classList.add("show");
        if (navOverlay) navOverlay.classList.add("show");
        if (navItem) {
            navItem.forEach(item => {
                item.classList.add("show");
            });
        }
        document.body.classList.add("remove-scrolling"); 
        // document.body.classList.add("no-scroll");
        showMenu = true;
    }else {
        if (navButton) {
            navButton.classList.remove("close");
            navButton.classList.remove("show");
        }
        if (navList) navList.classList.remove("show");
        if (navOverlay) navOverlay.classList.remove("show");
        if (navItem) {
            navItem.forEach(item => {
                item.classList.remove("show");
            });
        }
        document.body.classList.remove("remove-scrolling"); 
        // document.body.classList.remove("no-scroll");
        showMenu = false;
    }
}






// ============== DropDown functionality =============
document.addEventListener("click", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if(!isDropdownButton && e.target.closest("[data-dropdown]") != null)
    return

    let currentDropdown
    if(isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove("active")
    })
})
