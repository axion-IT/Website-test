/* VerSprite Website - Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const body = document.body;
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      // Toggle menu open/close
      const isOpen = menu.classList.contains('menu--open');
      
      if (isOpen) {
        menu.classList.remove('menu--open');
        this.classList.remove('menu-toggle--open');
        body.classList.remove('menu-open');
      } else {
        menu.classList.add('menu--open');
        this.classList.add('menu-toggle--open');
        body.classList.add('menu-open');
      }
    });
  }
  
  // Mobile submenu toggle
  const menuSubs = document.querySelectorAll('.menu-sub');
  menuSubs.forEach(function(sub) {
    sub.addEventListener('click', function(e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other open submenus
        menuSubs.forEach(function(otherSub) {
          if (otherSub !== sub) {
            otherSub.classList.remove('menu-sub--open');
          }
        });
        
        // Toggle this submenu
        this.classList.toggle('menu-sub--open');
      }
    });
  });
  
  // Newsletter Form Validation
  const newsletterForm = document.querySelector('.l-newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('newsletter_userEmail');
      const checkbox = document.getElementById('newsletter_acceptance');
      const invalidInfo = document.querySelector('.l-newsletter__invalid-info');
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(emailInput.value)) {
        invalidInfo.style.display = 'block';
        emailInput.style.borderColor = '#E83917';
        return;
      }
      
      if (!checkbox.checked) {
        alert('Please accept the terms to subscribe');
        return;
      }
      
      // Success
      invalidInfo.style.display = 'none';
      emailInput.style.borderColor = '#54C5ED';
      
      // Update form state
      const newsletter = document.querySelector('.l-newsletter');
      newsletter.setAttribute('data-state', 'success');
      
      alert('Thank you for subscribing to VerSprite Security Insights!');
      newsletterForm.reset();
    });
    
    // Hide error message on input
    const emailInput = document.getElementById('newsletter_userEmail');
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        const invalidInfo = document.querySelector('.l-newsletter__invalid-info');
        invalidInfo.style.display = 'none';
        this.style.borderColor = '#54C5ED';
      });
    }
  }
  
  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#contact') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe news tiles and products
  document.querySelectorAll('.news__tile, .product').forEach(el => {
    observer.observe(el);
  });
  
  // Parallax effect for header background
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const headerBg = document.querySelector('.header__bg img');
    if (headerBg) {
      headerBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
  
  // Hero Video Loop Control (play full once, then loop 3-7 seconds)
  const heroVideo = document.querySelector('.header__bg video');
  if (heroVideo) {
    let hasPlayedOnce = false;
    const loopStart = 4; // seconds
    const loopEnd = 7;   // seconds
    
    // When video ends for the first time, start looping the segment
    heroVideo.addEventListener('ended', function() {
      if (!hasPlayedOnce) {
        hasPlayedOnce = true;
        this.currentTime = loopStart;
        this.play();
      }
    });
    
    // During playback, check if we need to loop back
    heroVideo.addEventListener('timeupdate', function() {
      if (hasPlayedOnce && this.currentTime >= loopEnd) {
        this.currentTime = loopStart;
      }
    });
  }
  
});








