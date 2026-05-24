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
    const navbarCollapse = document.getElementById("amsNavbar"); // Siniguro nating tugma sa ID ng navbar mo
    const navbarToggler = document.querySelector(".navbar-toggler");

    if (navbarCollapse && navbarToggler) {
        // 1. Kuhanin ang mga link elements sa loob ng menu
        const navLinks = document.querySelectorAll(
            "#amsNavbar .nav-link:not(.dropdown-toggle), #amsNavbar .dropdown-item"
        );

        // 🚀 SAFE MOBILITY INSTANCE CONTEXT: Isang beses lang natin i-initialize ang Bootstrap Controller
        let collapseInstance = null;
        if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            collapseInstance = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        }

        // Helper function para sa ligtas na pagsasara sa laptop man o phone
        const triggerMenuHide = () => {
            if (navbarCollapse.classList.contains("show")) {
                if (collapseInstance) {
                    collapseInstance.hide();
                } else {
                    // Fallback para sa Android WebView kung sakaling mag-load huli ang Bootstrap bundle
                    navbarToggler.click();
                }
            }
        };

        // 📱 Auto-Close kapag pinindot ang mga Links
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                triggerMenuHide();
            });
        });

        // 🔒 Outside Click Dismissal: Magsasara kapag pinindot ang labas ng menu
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
