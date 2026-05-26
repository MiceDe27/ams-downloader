emailjs.init("zfrkMildAESmbb391");

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    submitBtn.innerText = "Sending Message...";
    submitBtn.disabled = true;

    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_38fwyco", "template_uejiwd9", templateParams)
        .then(function(response) {
            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;
            
            alert("🔒 Message sent successfully! The developer has received your telemetry data.");
            document.getElementById("contactForm").reset();
        }, function(error) {
            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;
            
            alert("❌ Failed to send message. Please check your network connection.");
            console.log("EmailJS Error Log:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const navbarCollapse = document.getElementById("amsNavbar"); 
    const navbarToggler = document.querySelector(".navbar-toggler");

    if (navbarCollapse && navbarToggler) {

        const navLinks = document.querySelectorAll(
            "#amsNavbar .nav-link:not(.dropdown-toggle), #amsNavbar .dropdown-item"
        );

        let collapseInstance = null;
        if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            collapseInstance = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        }

        const triggerMenuHide = () => {
            if (navbarCollapse.classList.contains("show")) {
                if (collapseInstance) {
                    collapseInstance.hide();
                } else {
                    navbarToggler.click();
                }
            }
        };

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                triggerMenuHide();
            });
        });

        document.addEventListener("click", (event) => {
            const target = event.target;

            if (target instanceof Node) {
                const isClickInsideMenu = navbarCollapse.contains(target);
                const isClickToggler = navbarToggler.contains(target);

                if (!isClickInsideMenu && !isClickToggler) {
                    triggerMenuHide();
                }
            }
        });
    }
});
const backToTopButton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
