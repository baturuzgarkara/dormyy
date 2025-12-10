document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      nav.classList.remove('active');
    });
  });

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  const subscribeForm = document.getElementById('subscribeForm');
  const subscribeMessage = document.getElementById('subscribeMessage');

  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('subscribeEmail').value;
    const humanCheck = document.getElementById('humanCheck').checked;
    
    if (!humanCheck) {
      showMessage(subscribeMessage, 'Please confirm you are not a robot.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showMessage(subscribeMessage, 'Please enter a valid email address.', 'error');
      return;
    }
    
    console.log('Subscribe email:', email);
    showMessage(subscribeMessage, 'Thank you! You have successfully joined our email list.', 'success');
    subscribeForm.reset();
  });

  const contactForm = document.getElementById('contactForm');
  const contactFormMessage = document.getElementById('contactFormMessage');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!isValidEmail(email)) {
      showMessage(contactFormMessage, 'Please enter a valid email address.', 'error');
      return;
    }
    
    if (message.trim().length < 10) {
      showMessage(contactFormMessage, 'Your message must be at least 10 characters.', 'error');
      return;
    }
    
    const mailtoLink = `mailto:dormy.metu@gmail.com?subject=Dormy Contact Form&body=${encodeURIComponent('From: ' + email + '\n\nMessage:\n' + message)}`;
    window.location.href = mailtoLink;
    
    showMessage(contactFormMessage, 'Your message is ready. Your email app will open.', 'success');
    contactForm.reset();
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showMessage(element, text, type) {
    element.textContent = text;
    element.className = 'form-message ' + type;
    
    setTimeout(function() {
      element.className = 'form-message';
      element.textContent = '';
    }, 5000);
  }

  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
