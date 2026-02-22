// Load Navbar and Footer Components
document.addEventListener('DOMContentLoaded', function() {
    // Load Navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            setActiveNavLink();
            initMobileMenu();
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Load Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            initFormHandlers();
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageName = currentPage.replace('.html', '') || 'index';
    
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

// Initialize Mobile Menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
}

// Initialize form handlers after footer loads
function initFormHandlers() {
    // Newsletter Form
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                alert('Thank you for subscribing!');
                this.querySelector('.newsletter-input').value = '';
            }
        });
    });

    initContactForm();
}

// Handle contact form with AJAX to avoid redirects
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn?.textContent || 'Send Message';
    const statusBox = document.getElementById('contactStatus');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!submitBtn) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        if (statusBox) {
            statusBox.textContent = '';
            statusBox.className = 'form-status';
        }

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitBtn.textContent = 'Submitted';
                form.reset();
                if (statusBox) {
                    statusBox.textContent = 'Thank you, your response has been submitted.';
                    statusBox.className = 'form-status form-status-success';
                }
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    if (statusBox) {
                        statusBox.textContent = '';
                        statusBox.className = 'form-status';
                    }
                }, 2000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            if (statusBox) {
                statusBox.textContent = 'Something went wrong. Please try again.';
                statusBox.className = 'form-status form-status-error';
            } else {
                alert('Something went wrong. Please try again.');
            }
        }
    });
}

