document.addEventListener("DOMContentLoaded", () => {
    // Header scroll effect
    const header = document.querySelector(".header")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navList = document.querySelector(".nav-list")
  
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", function () {
        this.classList.toggle("active")
        navList.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll(".nav-list a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        navList.classList.remove("active")
      })
    })
  
    // Gallery Modal with animations
    const galleryItems = document.querySelectorAll(".gallery-item")
    const modal = document.querySelector(".gallery-modal")
    const modalImg = document.getElementById("modal-image")
    const modalCaption = document.getElementById("modal-caption")
    const closeModal = document.querySelector(".close-modal")
  
    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        modal.style.display = "block"
  
        // Add active class with a slight delay for animation
        setTimeout(() => {
          modal.classList.add("active")
          modalImg.src = this.querySelector("img").src
  
          const title = this.querySelector("h3").textContent
          const desc = this.querySelector("p").textContent
          modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`
  
          setTimeout(() => {
            modalImg.classList.add("active")
            modalCaption.classList.add("active")
          }, 100)
        }, 10)
      })
    })
  
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modalImg.classList.remove("active")
        modalCaption.classList.remove("active")
  
        setTimeout(() => {
          modal.classList.remove("active")
  
          setTimeout(() => {
            modal.style.display = "none"
          }, 300)
        }, 300)
      })
    }
  
    // Close modal when clicking outside the image
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modalImg.classList.remove("active")
        modalCaption.classList.remove("active")
  
        setTimeout(() => {
          modal.classList.remove("active")
  
          setTimeout(() => {
            modal.style.display = "none"
          }, 300)
        }, 300)
      }
    })
  
    // Add animation to hero rating stars
    const stars = document.querySelectorAll(".hero-rating i")
    stars.forEach((star, index) => {
      star.style.animationDelay = `${index * 0.2}s`
    })
  
    // Contact form submission
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault()
  
        // Simple form validation
        const name = this.querySelector('input[name="name"]').value
        const email = this.querySelector('input[name="email"]').value
        const message = this.querySelector('textarea[name="message"]').value
  
        if (!name || !email || !message) {
          alert("Please fill in all fields")
          return
        }
  
        // Show success message
        const formGroups = this.querySelectorAll(".form-group")
        const submitBtn = this.querySelector('button[type="submit"]')
  
        formGroups.forEach((group) => {
          group.style.opacity = "0"
          group.style.transform = "translateY(-20px)"
          group.style.transition = "all 0.3s ease"
        })
  
        submitBtn.style.opacity = "0"
        submitBtn.style.transform = "translateY(-20px)"
        submitBtn.style.transition = "all 0.3s ease"
  
        setTimeout(() => {
          const successMessage = document.createElement("div")
          successMessage.className = "success-message"
          successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon!</p>
                `
  
          this.innerHTML = ""
          this.appendChild(successMessage)
  
          // Reset form after 5 seconds
          setTimeout(() => {
            window.location.reload()
          }, 5000)
        }, 300)
      })
    }
  
    // Smooth scrolling for anchor links with improved animation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Get header height for offset
          const headerHeight = document.querySelector(".header").offsetHeight
  
          // Calculate position with smooth easing
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
          const startPosition = window.pageYOffset
          const distance = targetPosition - startPosition
          let startTime = null
  
          function animation(currentTime) {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const duration = 1000 // Animation duration in ms
  
            // Easing function (easeOutQuad)
            const run = easeOutQuad(timeElapsed, startPosition, distance, duration)
            window.scrollTo(0, run)
  
            if (timeElapsed < duration) {
              requestAnimationFrame(animation)
            }
          }
  
          // Easing function
          function easeOutQuad(t, b, c, d) {
            t /= d
            return -c * t * (t - 2) + b
          }
  
          requestAnimationFrame(animation)
        }
      })
    })
  
    // Animate elements when they come into view
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".feature-card, .animal-card, .section-header")
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Run on load and scroll
    animateOnScroll()
    window.addEventListener("scroll", animateOnScroll)
  })
  
  