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

        const safeHideMenu = () => {
            if (navbarCollapse.classList.contains("show")) {
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse) || 
                                             new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    collapseInstance.hide();
                } else {
                    navbarToggler.click(); 
                }
            }
        };

        navLinks.forEach(link => {
            ["click", "touchstart"].forEach(eventType => {
                link.addEventListener(eventType, function (e) {
                    
                    const targetId = this.getAttribute("href");

                    if (targetId && targetId.startsWith("#") && targetId.length > 1) {
                        
                        e.preventDefault(); 
                        
                        const targetSection = document.querySelector(targetId);
                        
                        if (targetSection) {
                            safeHideMenu();

                            setTimeout(() => {
                                targetSection.scrollIntoView({
                                    behavior: "smooth", 
                                    block: "start"      
                                });
                            }, 180);
                        }
                    } else if (targetId === "#") {
                        e.preventDefault();
                        safeHideMenu();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                });
            });
        });

        ["click", "touchstart"].forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                const target = event.target;

                if (target instanceof Node) {
                    const isClickInsideMenu = navbarCollapse.contains(target);
                    const isClickToggler = navbarToggler.contains(target);

                    if (!isClickInsideMenu && !isClickToggler) {
                        safeHideMenu();
                    }
                }
            });
        });
    }
});