 // MelloHealth Website JavaScript - Corrected Version
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
            setupEventListeners();
            addAnimations();
        });

        // Initialize the application
        function initializeApp() {
            console.log('MelloHealth App Initialized');
            
            // Remove loading screen
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 1500);
            
            // Add fade-in animation to main container
            const container = document.querySelector('.container');
            if (container) {
                container.classList.add('fade-in');
            }
            
            // Welcome message
            setTimeout(() => {
                showNotification('Welcome to MelloHealth! Your health, our priority. 💙', 'success');
            }, 2000);
        }

        // Setup event listeners
        function setupEventListeners() {
            // Header buttons
            const callBtn = document.querySelector('.call-btn');
            const loginBtn = document.querySelector('.login-btn');
            
            if (callBtn) {
                callBtn.addEventListener('click', handleCallClick);
            }
            
            if (loginBtn) {
                loginBtn.addEventListener('click', handleLoginClick);
            }
            
            // WhatsApp booking section
            const whatsappSection = document.querySelector('.whatsapp-section');
            if (whatsappSection) {
                whatsappSection.addEventListener('click', handleWhatsAppBooking);
            }
            
            // Offer cards
            const offerCards = document.querySelectorAll('.offer-card');
            offerCards.forEach(card => {
                card.addEventListener('click', function() {
                    const offerTitle = this.querySelector('h3').textContent;
                    handleOfferClick(offerTitle);
                });
            });
            
            // Initialize offers slider
            initializeOffersSlider();
        }

        // Add hover animations and interactions
        function addAnimations() {
            // Service items hover effect
            const serviceItems = document.querySelectorAll('.service-item');
            serviceItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px)';
                });
                
                item.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
                
                // Keyboard navigation support
                item.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            });
            
            // Add ripple effect to buttons
            addRippleEffect();
        }

        // Add ripple effect to buttons
        function addRippleEffect() {
            const buttons = document.querySelectorAll('button, .service-item, .offer-card');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                        z-index: 1;
                    `;
                    
                    this.appendChild(ripple);
                    setTimeout(() => {
                        if (ripple.parentNode) {
                            ripple.remove();
                        }
                    }, 600);
                });
            });
        }

        // Handle call button click
        function handleCallClick() {
            showNotification('Connecting you to our support team...', 'success');
            
            setTimeout(() => {
                const phoneNumber = '+911234567890';
                showConfirmDialog(
                    'Call MelloHealth',
                    `Would you like to call us at ${phoneNumber}?`,
                    function() {
                        window.location.href = `tel:${phoneNumber}`;
                    }
                );
            }, 500);
        }

        // Handle login button click
        function handleLoginClick() {
            showNotification('Opening login form...', 'info');
            
            setTimeout(() => {
                showModal('Login', createLoginForm());
            }, 500);
        }

        // Handle WhatsApp booking
        function handleWhatsAppBooking() {
            showNotification('Opening WhatsApp...', 'success');
            
            const message = encodeURIComponent('Hi! I would like to book an appointment through MelloHealth.');
            const whatsappNumber = '919876543210';
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 500);
        }

        // Handle service navigation
        function navigateToService(serviceType) {
            showNotification(`Loading ${serviceType} services...`, 'info');
            
            const serviceMap = {
                'diagnostics': 'Diagnostics & Lab Tests',
                'health-check': 'Home Health Checkups',
                'consultation': 'Doctor Consultations'
            };
            
            setTimeout(() => {
                showModal(serviceMap[serviceType], createServiceDetails(serviceType));
            }, 800);
        }

        // Handle dashboard navigation
        function navigateToDashboard() {
            showNotification('Loading your dashboard...', 'info');
            
            setTimeout(() => {
                showModal('My Dashboard', createDashboardContent());
            }, 800);
        }

        // Handle emergency contact display
        function showEmergencyContact() {
            showNotification('Loading emergency contacts...', 'info');
            
            setTimeout(() => {
                showModal('Emergency Contact', createEmergencyContent());
            }, 500);
        }

        // Handle offer clicks
        function handleOfferClick(offerTitle) {
            showNotification(`Loading ${offerTitle} details...`, 'info');
            
            setTimeout(() => {
                showModal(offerTitle, createOfferDetails(offerTitle));
            }, 600);
        }

        // Emergency contact functions
        function callEmergency() {
            window.location.href = 'tel:108';
            closeCurrentModal();
            showNotification('Calling emergency helpline...', 'success');
        }

        function callAmbulance() {
            window.location.href = 'tel:102';
            closeCurrentModal();
            showNotification('Calling ambulance...', 'success');
        }

        function emergencyWhatsApp() {
            const message = encodeURIComponent('EMERGENCY: Need immediate medical assistance!');
            window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
            closeCurrentModal();
            showNotification('Opening emergency WhatsApp...', 'success');
        }

        // Accordion functionality
        function toggleAccordion(header) {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isActive = header.classList.contains('active');
            
            // Close all other accordions
            const allHeaders = document.querySelectorAll('.accordion-header');
            const allContents = document.querySelectorAll('.accordion-content');
            
            allHeaders.forEach(h => {
                h.classList.remove('active');
                const i = h.querySelector('.accordion-icon');
                if (i) i.classList.replace('fa-minus', 'fa-plus');
            });
            
            allContents.forEach(c => {
                c.classList.remove('active');
                c.style.maxHeight = '0';
            });
            
            // Toggle current accordion
            if (!isActive) {
                header.classList.add('active');
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.classList.replace('fa-plus', 'fa-minus');
                
                // Smooth scroll to accordion
                setTimeout(() => {
                    header.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            
            // Style the notification
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 20px',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '500',
                zIndex: '10000',
                transform: 'translateX(100%)',
                transition: 'transform 0.3s ease',
                maxWidth: '300px',
                wordWrap: 'break-word'
            });
            
            // Set background color based on type
            const colors = {
                success: '#4CAF50',
                error: '#f44336',
                info: '#2196F3',
                warning: '#ff9800'
            };
            notification.style.backgroundColor = colors[type] || colors.info;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }

        // Show modal
        function showModal(title, content) {
            // Remove any existing modal
            const existingModal = document.querySelector('.modal-overlay');
            if (existingModal) {
                document.body.removeChild(existingModal);
            }
            
            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            Object.assign(overlay.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '9999',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            });
            
            // Create modal content
            const modal = document.createElement('div');
            modal.className = 'modal';
            Object.assign(modal.style, {
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '30px',
                maxWidth: '400px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto',
                transform: 'scale(0.8)',
                transition: 'transform 0.3s ease'
            });
            
            modal.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #333; font-size: 20px;">${title}</h2>
                    <button class="close-modal" style="background: none; border: none; font-size: 24px; color: #999; cursor: pointer;">&times;</button>
                </div>
                <div>${content}</div>
            `;
            
            overlay.appendChild(modal);
            document.body.appendChild(overlay);
            
            // Animate in
            setTimeout(() => {
                overlay.style.opacity = '1';
                modal.style.transform = 'scale(1)';
            }, 50);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close-modal');
            const closeModal = () => {
                overlay.style.opacity = '0';
                modal.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                }, 300);
            };
            
            closeBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });
        }

        // Create service details content
        function createServiceDetails(serviceType) {
            const serviceData = {
                'diagnostics': {
                    description: 'Comprehensive diagnostic services including blood tests, scans, and health screenings.',
                    features: ['Home sample collection', 'Digital reports', 'Expert consultation', 'Quick results']
                },
                'health-check': {
                    description: 'Complete health checkup packages designed for early detection and prevention.',
                    features: ['Full body checkup', 'Specialist consultation', 'Personalized reports', 'Follow-up care']
                },
                'consultation': {
                    description: 'Connect with qualified doctors from the comfort of your home.',
                    features: ['Video consultation', '24/7 availability', 'Prescription delivery', 'Medical records']
                }
            };
            
            const service = serviceData[serviceType];
            let featuresHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
            
            return `
                <p style="color: #666; margin-bottom: 20px;">${service.description}</p>
                <h3 style="color: #333; margin-bottom: 10px;">Features:</h3>
                <ul style="color: #666; padding-left: 20px;">
                    ${featuresHTML}
                </ul>
                <button onclick="bookService('${serviceType}')" style="background-color: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; margin-top: 20px; cursor: pointer; width: 100%;">
                    Book Now
                </button>
            `;
        }

        // Create dashboard content
        function createDashboardContent() {
            return `
                <div style="text-align: center;">
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="color: #333; margin-bottom: 10px;">Welcome back!</h3>
                        <p style="color: #666;">Your health dashboard is being prepared.</p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
                        <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px;">
                            <strong style="color: #1976d2;">Reports</strong>
                            <p style="color: #666; font-size: 12px;">View test results</p>
                        </div>
                        <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px;">
                            <strong style="color: #f57c00;">Appointments</strong>
                            <p style="color: #666; font-size: 12px;">Manage bookings</p>
                        </div>
                    </div>
                    <button onclick="accessDashboard()" style="background-color: #2196F3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; width: 100%;">
                        Access Full Dashboard
                    </button>
                </div>
            `;
        }

        // Create emergency contact content
        function createEmergencyContent() {
            return `
                <div style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🚑</div>
                    <h3 style="color: #333; margin-bottom: 15px;">Emergency Contact</h3>
                    <p style="color: #666; margin-bottom: 25px;">24/7 emergency medical support and ambulance services.</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                        <button onclick="callEmergency()" style="background-color: #f44336; color: white; border: none; padding: 15px 25px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 16px; font-weight: 600;">
                            <i class="fas fa-phone"></i>
                            Emergency Helpline
                        </button>
                        
                        <button onclick="callAmbulance()" style="background-color: #ff9800; color: white; border: none; padding: 15px 25px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 16px; font-weight: 600;">
                            <i class="fas fa-ambulance"></i>
                            Call Ambulance
                        </button>
                        
                        <button onclick="emergencyWhatsApp()" style="background-color: #25D366; color: white; border: none; padding: 15px 25px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 16px; font-weight: 600;">
                            <i class="fab fa-whatsapp"></i>
                            Emergency WhatsApp
                        </button>
                    </div>
                    
                    <div style="background-color: #ffebee; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: left; border-left: 4px solid #f44336;">
                        <h4 style="margin-bottom: 10px; color: #f44336;">⚠️ Emergency Numbers:</h4>
                        <ul style="color: #666; padding-left: 20px; margin: 0;">
                            <li>Emergency Helpline: 108</li>
                            <li>Ambulance: 102</li>
                            <li>Police: 100</li>
                            <li>Fire: 101</li>
                        </ul>
                    </div>
                </div>
            `;
        }

        // Create offer details content
        function createOfferDetails(offerTitle) {
            const offerData = {
                'Vitamin Check': {
                    originalPrice: '₹1800',
                    discountedPrice: '₹599',
                    description: 'Complete vitamin assessment including Vitamin D and B12 levels with free home sample collection.',
                    includes: ['Vitamin D Test', 'Vitamin B12 Test', 'Free Home Collection', 'Digital Report', 'Doctor Consultation']
                },
                'Health Check': {
                    originalPrice: '₹1000',
                    discountedPrice: '₹499',
                    description: 'Comprehensive health screening covering 38 essential parameters for overall wellness.',
                    includes: ['Lipid Profile', 'Thyroid Function', 'Kidney Function', 'Liver Function', 'Complete Blood Count']
                },
                'Diabetes Screening': {
                    originalPrice: '₹1200',
                    discountedPrice: '₹399',
                    description: 'Complete diabetes profile with comprehensive screening for early detection and management.',
                    includes: ['HbA1c Test', 'Fasting Glucose', 'Insulin Levels', 'Free Home Collection', 'Digital Report']
                },
                'Cardiac Health': {
                    originalPrice: '₹2500',
                    discountedPrice: '₹899',
                    description: 'Comprehensive cardiac screening including lipid profile and cardiac markers for heart health.',
                    includes: ['Lipid Profile', 'Cardiac Markers', 'ECG Analysis', 'Free Home Collection', 'Cardiologist Consultation']
                }
            };
            
            const offer = offerData[offerTitle];
            if (!offer) {
                return '<p>Offer details not available.</p>';
            }
            
            let includesHTML = offer.includes.map(item => `<li>${item}</li>`).join('');
            
            return `
                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 24px; margin-bottom: 10px;">
                        <span style="text-decoration: line-through; color: #999; font-size: 18px;">${offer.originalPrice}</span>
                        <span style="color: #4CAF50; font-weight: bold; margin-left: 10px;">${offer.discountedPrice}</span>
                    </div>
                    <div style="background-color: #4CAF50; color: white; display: inline-block; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
                        SAVE ${Math.round(((parseInt(offer.originalPrice.slice(1)) - parseInt(offer.discountedPrice.slice(1))) / parseInt(offer.originalPrice.slice(1))) * 100)}%
                    </div>
                </div>
                <p style="color: #666; margin-bottom: 20px; text-align: center;">${offer.description}</p>
                <h3 style="color: #333; margin-bottom: 10px;">Package Includes:</h3>
                <ul style="color: #666; padding-left: 20px; margin-bottom: 25px;">
                    ${includesHTML}
                </ul>
                <button onclick="bookOffer('${offerTitle}')" style="background-color: #4CAF50; color: white; border: none; padding: 15px 30px; border-radius: 8px; cursor: pointer; width: 100%; font-size: 16px; font-weight: bold;">
                    Book This Offer
                </button>
            `;
        }

        // Create login form
        function createLoginForm() {
            return `
                <form onsubmit="handleLogin(event)" style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Phone Number</label>
                        <input type="tel" placeholder="Enter your phone number" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;" required>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Password</label>
                        <input type="password" placeholder="Enter your password" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;" required>
                    </div>
                    <button type="submit" style="background-color: #2196F3; color: white; border: none; padding: 15px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;">
                        Login
                    </button>
                    <div style="text-align: center; margin-top: 10px;">
                        <a href="#" onclick="showForgotPassword()" style="color: #2196F3; text-decoration: none; font-size: 14px;">Forgot Password?</a>
                    </div>
                    <div style="text-align: center; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0;">
                        <p style="color: #666; font-size: 14px;">Don't have an account?</p>
                        <button type="button" onclick="showSignup()" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px;">
                            Sign Up
                        </button>
                    </div>
                </form>
            `;
        }

        // Show confirm dialog
        function showConfirmDialog(title, message, onConfirm) {
            const content = `
                <p style="color: #666; margin-bottom: 25px; text-align: center;">${message}</p>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    <button onclick="closeCurrentModal()" style="background-color: #f5f5f5; color: #333; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Cancel
                    </button>
                    <button onclick="confirmAction()" style="background-color: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                        Confirm
                    </button>
                </div>
            `;
            
            showModal(title, content);
            window.currentConfirmAction = onConfirm;
        }

        // Additional helper functions
        function bookService(serviceType) {
            showNotification(`Booking ${serviceType} service...`, 'info');
            setTimeout(() => {
                closeCurrentModal();
                showNotification('Service booking initiated! We will contact you shortly.', 'success');
            }, 1000);
        }

        function bookOffer(offerTitle) {
            showNotification(`Booking ${offerTitle}...`, 'info');
            
            setTimeout(() => {
                closeCurrentModal();
                showNotification(`${offerTitle} has been added to your cart!`, 'success');
                
                setTimeout(() => {
                    showModal('Booking Confirmation', createBookingConfirmation(offerTitle));
                }, 1000);
            }, 1000);
        }

        function createBookingConfirmation(offerTitle) {
            return `
                <div style="text-align: center;">
                    <div style="font-size: 48px; color: #4CAF50; margin-bottom: 15px;">✅</div>
                    <h3 style="color: #333; margin-bottom: 15px;">Booking Confirmed!</h3>
                    <div style="background-color: #f0f8f0; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p style="color: #333; font-weight: 600;">${offerTitle}</p>
                        <p style="color: #666; font-size: 14px; margin-top: 5px;">Our team will contact you within 2 hours to schedule your appointment.</p>
                    </div>
                    <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="color: #1976d2; font-size: 14px; margin: 0;">
                            📞 For any queries, call us at +91-123-456-7890
                        </p>
                    </div>
                    <button onclick="closeCurrentModal()" style="background-color: #4CAF50; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        Done
                    </button>
                </div>
            `;
        }

        function handleLogin(event) {
            event.preventDefault();
            const phone = event.target.querySelector('input[type="tel"]').value;
            
            showNotification('Logging you in...', 'info');
            
            setTimeout(() => {
                closeCurrentModal();
                showNotification('Login successful! Welcome to MelloHealth.', 'success');
                updateLoginState(phone);
            }, 1500);
        }

        function updateLoginState(phone) {
            const loginBtn = document.querySelector('.login-btn');
            if (loginBtn) {
                loginBtn.textContent = 'Hi, ' + phone.slice(-4);
                loginBtn.style.backgroundColor = '#4CAF50';
                loginBtn.style.borderColor = '#4CAF50';
                loginBtn.style.color = 'white';
            }
        }

        function closeCurrentModal() {
            const overlay = document.querySelector('.modal-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.querySelector('.modal').style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                }, 300);
            }
        }

        function confirmAction() {
            if (window.currentConfirmAction) {
                window.currentConfirmAction();
                window.currentConfirmAction = null;
            }
            closeCurrentModal();
        }

        function showForgotPassword() {
            closeCurrentModal();
            setTimeout(() => {
                showModal('Reset Password', createForgotPasswordForm());
            }, 300);
        }

        function showSignup() {
            closeCurrentModal();
            setTimeout(() => {
                showModal('Create Account', createSignupForm());
            }, 300);
        }

        function createForgotPasswordForm() {
            return `
                <form onsubmit="handleForgotPassword(event)" style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="color: #666; margin-bottom: 15px; text-align: center;">Enter your phone number to receive a password reset link.</p>
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Phone Number</label>
                        <input type="tel" placeholder="Enter your phone number" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;" required>
                    </div>
                    <button type="submit" style="background-color: #2196F3; color: white; border: none; padding: 15px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;">
                        Send Reset Link
                    </button>
                    <button type="button" onclick="showModal('Login', createLoginForm())" style="background-color: transparent; color: #2196F3; border: 2px solid #2196F3; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px;">
                        Back to Login
                    </button>
                </form>
            `;
        }

        function createSignupForm() {
            return `
                <form onsubmit="handleSignup(event)" style="display: flex; flex-direction: column; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Full Name</label>
                        <input type="text" placeholder="Enter your full name" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;" required>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Phone Number</label>
                        <input type="tel" placeholder="Enter your phone number" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;" required>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Email (Optional)</label>
                        <input type="email" placeholder="Enter your email" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px; color: #333; font-weight: 500;">Create Password</label>
                        <input type="password" placeholder="Create a strong password" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px;" required>
                    </div>
                    <button type="submit" style="background-color: #4CAF50; color: white; border: none; padding: 15px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: bold;">
                        Create Account
                    </button>
                    <button type="button" onclick="showModal('Login', createLoginForm())" style="background-color: transparent; color: #2196F3; border: 2px solid #2196F3; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 14px;">
                        Already have an account? Login
                    </button>
                </form>
            `;
        }

        function handleForgotPassword(event) {
            event.preventDefault();
            showNotification('Sending reset link...', 'info');
            
            setTimeout(() => {
                closeCurrentModal();
                showNotification('Password reset link sent to your phone!', 'success');
            }, 1500);
        }

        function handleSignup(event) {
            event.preventDefault();
            const phone = event.target.querySelector('input[type="tel"]').value;
            
            showNotification('Creating your account...', 'info');
            
            setTimeout(() => {
                closeCurrentModal();
                showNotification('Account created successfully! Welcome to MelloHealth.', 'success');
                updateLoginState(phone);
            }, 2000);
        }

        function accessDashboard() {
            showNotification('Loading dashboard...', 'info');
            setTimeout(() => {
                closeCurrentModal();
                showNotification('Dashboard feature coming soon!', 'info');
            }, 1000);
        }

        function downloadiOS() {
            showNotification('Redirecting to App Store...', 'info');
            setTimeout(() => {
                window.open('https://apps.apple.com', '_blank');
            }, 500);
        }

        function downloadAndroid() {
            showNotification('Redirecting to Google Play Store...', 'info');
            setTimeout(() => {
                window.open('https://play.google.com/store', '_blank');
            }, 500);
        }

        // Touch gesture support for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', function(event) {
            touchStartY = event.changedTouches[0].screenY;
        });

        document.addEventListener('touchend', function(event) {
            touchEndY = event.changedTouches[0].screenY;
            handleGesture();
        });

        function handleGesture() {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    console.log('Swipe up detected');
                } else {
                    console.log('Swipe down detected');
                }
            }
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const modal = document.querySelector('.modal-overlay');
                if (modal) {
                    closeCurrentModal();
                }
            }
        });

        // Offers Slider Functionality
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 2000; // 2 seconds

        function initializeOffersSlider() {
            const slider = document.querySelector('.offers-slider');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            
            if (!slider) return;
            
            const totalSlides = dots.length;
            
            // Start automatic sliding
            startAutoSlide();
            
            // Navigation button event listeners
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    goToSlide(currentSlide - 1);
                    startAutoSlide();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    goToSlide(currentSlide + 1);
                    startAutoSlide();
                });
            }
            
            // Dot navigation event listeners
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    goToSlide(index);
                    startAutoSlide();
                });
            });
            
            // Touch/swipe support for mobile
            let startX = 0;
            let endX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            slider.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = startX - endX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    clearInterval(slideInterval);
                    if (diff > 0) {
                        // Swipe left - next slide
                        goToSlide(currentSlide + 1);
                    } else {
                        // Swipe right - previous slide
                        goToSlide(currentSlide - 1);
                    }
                    startAutoSlide();
                }
            }
            
            // Pause auto-slide on hover
            const sliderContainer = document.querySelector('.offers-slider-container');
            if (sliderContainer) {
                sliderContainer.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                });
                
                sliderContainer.addEventListener('mouseleave', () => {
                    startAutoSlide();
                });
            }
        }
        
        function goToSlide(slideIndex) {
            const slider = document.querySelector('.offers-slider');
            const dots = document.querySelectorAll('.dot');
            const totalSlides = dots.length;
            
            // Handle circular navigation
            if (slideIndex < 0) {
                slideIndex = totalSlides - 1;
            } else if (slideIndex >= totalSlides) {
                slideIndex = 0;
            }
            
            currentSlide = slideIndex;
            
            // Update slider position
            const translateX = -slideIndex * 100;
            slider.style.transform = `translateX(${translateX}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
            
            // Update navigation buttons
            updateNavigationButtons();
        }
        
        function updateNavigationButtons() {
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const dots = document.querySelectorAll('.dot');
            const totalSlides = dots.length;
            
            if (prevBtn) {
                prevBtn.disabled = false;
            }
            
            if (nextBtn) {
                nextBtn.disabled = false;
            }
        }
        
        function startAutoSlide() {
            clearInterval(slideInterval);
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, slideDuration);
        }