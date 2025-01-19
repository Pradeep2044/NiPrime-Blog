// Handle search click - Toggle search pop-up
const searchPop = document.querySelector('.clicksearch');
const searchIcon = document.querySelector('.fa-magnifying-glass');

searchIcon.addEventListener('click', function () {
    if (searchPop.style.display === 'none') {
        searchPop.style.display = 'block';
    } else {
        searchPop.style.display = 'none';
    }
});

// >>>>>>>>>>>>>>search engine starts

// Handle search form submit
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.control-form');
const alertMessage = document.getElementById('alert-message');

// Handle Enter key press or search icon click
searchForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const searchTerm = searchInput.value.trim().toLowerCase();
    
    // If search term is empty
    if (searchTerm === '') {
        showAlert('Please type something to search.');
        return;
    }

    const matchedPosts = findPosts(searchTerm); // Find matching posts
    
    if (matchedPosts.length > 0) {
        showAlert('Click on below suggestions available.');
    } else {
        showAlert('Result not found.');
    }
});

// Show alert message
function showAlert(message) {
    alertMessage.textContent = message; // Set the message
    alertMessage.classList.add('show'); // Show the alert

    // Hide alert after 3 seconds
    setTimeout(() => {
        alertMessage.classList.remove('show');
    }, 3000);
}

// Find matching posts based on input
function findPosts(searchTerm) {
    const results = [];
    const posts = { /* Your posts data */ };

    for (const category in posts) {
        if (category.toLowerCase().includes(searchTerm)) {
            results.push(...posts[category]);
        } else {
            posts[category].forEach(post => {
                if (post.title.toLowerCase().includes(searchTerm)) {
                    results.push(post);
                }
            });
        }
    }
    return results;
}

// This will handle the search input field when a category is clicked from the suggestions
document.querySelectorAll('.tags a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const category = this.textContent.replace('#', '').replace(',', '').trim().toLowerCase();
        searchInput.value = category; // Automatically type the category into the search bar
        searchForm.dispatchEvent(new Event('submit')); // Trigger form submission logic
    });
});


// JavaScript for handling category click and suggestions
const posts = {
    travel: [
        { title: "How To See Bangkok In 3 Days", file: "../html/pages-html/7.page.html" },
        { title: "The Most Beautiful River Cities", file: "../html/pages-html/8.page.html" },
        { title: "People, Nature and Everyday Life", file: "../html/pages-html/9.page.html" },
        { title: "How to Get Paid to Travels", file: "../html/pages-html/10.page.html" },
        { title: "Perfect Day Tripsin Europe", file: "../html/pages-html/11.page.html" },
        { title: "How to Enjoy Your Solo Trip", file: "../html/pages-html/12.page.html" }
    ],
    lifestyle: [
        { title: "Breathe & Stretch Yoga for Inner Peace", file: "../html/pages-html/1.page.html" },
        { title: "Heart and Sole: The Benefits of Running for Total Wellness", file: "../html/pages-html/2.page.html" },
        { title: "Drink Deep: How Water Fuels Your Body and Mind", file: "../html/pages-html/3.page.html" },
        { title: "Fitness Unleashed: Transform Your Body and Mind", file: "../html/pages-html/4.page.html" },
        { title: "Cycle Your Way to Fitness: A Path to Physical and Mental Well-Being", file: "../html/pages-html/5.page.html" },
        { title: "Eat Well, Live Well: The Connection Between Food and Lifestyle", file: "../html/pages-html/6.page.html" }
    ],
    news: [
        { title: "Bangladesh summons Indian envoy over border tensions", file: "../html/pages-html/19.page.html" },
        { title: "Jaishankar to represent India at Donald Trump’s swearing-in as US President", file: "../html/pages-html/20.page.html" },
        { title: "Massive fire at Noida chemical factory, no casualties", file: "../html/pages-html/21.page.html" },
        { title: "What would it take for Donald Trump to buy Greenland?", file: "../html/pages-html/22.page.html" },
        { title: "College Student Dies By Suicide in MP's Chhatarpur", file: "../html/pages-html/23.page.html" },
        { title: "Bihar's First Sports University Gets UGC Recognition", file: "../html/pages-html/6.page.html24" }
    ],
    tech: [
        { title: "Redefining Open Source To Make AI Fit Sparks Unsettled Debate", file: "../html/pages-html/13.page.html" },
        { title: "The Robotic Wave at CES", file: "../html/pages-html/14.page.html" },
        { title: "AMD and Copilot+ Set the Stage for Xbox AI", file: "../html/pages-html/15.page.html" },
        { title: "Apple Addresses Apple Intelligence: What Microsoft Missed With Copilot", file: "../html/pages-html/16.page.html" },
        { title: "Layoff Survival Guide: Making Smart Choices in Tough Times", file: "../html/pages-html/17.page.html" },
        { title: "Are Deepfakes Overblown ?", file: "../html/pages-html/18.page.html" }
    ]
};

// Handle category link clicks
document.querySelectorAll('.tags a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        // Extract text, remove # and trim commas or extra spaces
        const category = this.textContent.replace('#', '').replace(',', '').trim().toLowerCase();
        searchInput.value = category; // Automatically type the category into the search bar
        searchInput.dispatchEvent(new Event('input')); // Trigger input event to update suggestions
    });
});

// Handle input search
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase().trim();
    if (searchTerm === '') {
        clearSuggestions();
        return;
    }

    const matchedPosts = findPosts(searchTerm);
    if (matchedPosts.length > 0) {
        showMatchedPosts(matchedPosts);
    } else {
        showError("Result not found");
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', function (e) {
    const searchContainer = document.querySelector('.clicksearch');
    if (!searchContainer.contains(e.target)) {
        clearSuggestions();
    }
});

// Find matching posts based on input
function findPosts(searchTerm) {
    const results = [];
    for (const category in posts) {
        if (category.startsWith(searchTerm)) {
            results.push(...posts[category]); // Add all posts in matching category
        } else {
            // Check individual post titles for a match
            posts[category].forEach(post => {
                if (post.title.toLowerCase().startsWith(searchTerm)) {
                    results.push(post);
                }
            });
        }
    }
    return results;
}

// Show matched posts
function showMatchedPosts(matchedPosts) {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = ''; // Clear previous suggestions

    matchedPosts.forEach(post => {
        const suggestion = document.createElement('div');
        suggestion.className = 'suggestion';
        suggestion.innerHTML = `<a href="${post.file}">${post.title}</a>`;
        suggestionBox.appendChild(suggestion);
    });
    suggestionBox.style.display = 'block';
}

// Display error message
function showError(message) {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = `<div class="error-message">${message}</div>`;
    suggestionBox.style.display = 'block';
}

// Clear suggestions
function clearSuggestions() {
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = '';
    suggestionBox.style.display = 'none';
}

// >>>>>>>>>>>>>>search engine ends

// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})

// side navbar toggeler 
const sideNavbar = document.querySelector('.toggle-btn');
const menuIcon = document.querySelector('.toggle-btn i');
const dropDownMenu = document.querySelector('.dropdown-menu');

sideNavbar.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    menuIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars'
}

//Filter
document.addEventListener("DOMContentLoaded", function () {
    const filterItems = document.querySelectorAll(".filter-item");
    const postBoxes = document.querySelectorAll(".post-box");

    // Function to show only the first 9 cards
    function showFirst9Cards() {
        postBoxes.forEach((box, index) => {
            if (index < 9) {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
        });
    }

    filterItems.forEach(item => {
        item.addEventListener("click", function () {
            const value = this.getAttribute("data-filter");

            // Show or hide post-box elements based on selected filter
            postBoxes.forEach((box, index) => {
                if (value === "all") {
                    showFirst9Cards(); // Only show the first 9 cards when "All" is selected
                } else {
                    if (box.classList.contains(value)) {
                        box.style.display = "block";
                    } else {
                        box.style.display = "none"; 
                    }
                }
            });

            // Update active filter class
            filterItems.forEach(i => i.classList.remove("active-filter"));
            this.classList.add("active-filter");
        });
    });
// It ensuring only 9 card will be visible in "all" section
    const defaultFilter = document.querySelector('[data-filter="all"]');
    if (defaultFilter) {
        defaultFilter.classList.add("active-filter");
        showFirst9Cards(); // Ensure only the first 9 cards are shown on page load
    }
});

// clickable data url
document.querySelectorAll('.post-box').forEach(card => {
    card.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        window.location.href = url;
    });
});
