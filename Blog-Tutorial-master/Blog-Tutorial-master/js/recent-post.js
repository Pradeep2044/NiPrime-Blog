document.addEventListener("DOMContentLoaded", function () {
    const posts = [
        {
            img: "/images/pages-img/q.jpg",
            category: "LifeStyle",
            title: "Layoff Survival Guide: Making Smart Choices in Tough Times",
            date: "10 Jan 2025",
            description: "Navigating a layoff can be one of the most challenging experiences in a person’s professional life, especially during times of economic uncertainty. The emotional toll of losing a job is compounded by the uncertainty about the future...",
            url: "../html/pages-html/17.page.html",
        },
        {
            img: "../images/pages-img/m.jpg",
            category: "Tech",
            title: "Redefining Open Source To Make AI Fit Sparks Unsettled Debate",
            date: "January 10, 2025",
            description: "The concept of open-source software has long been celebrated for its role in fostering collaboration and innovation. Open-source projects are typically available for anyone to view, modify, and distribute, promoting transparency and collective development...",
            url: "../html/pages-html/13.page.html",
        },
        {
            img: "/images/pages-img/b.png",
            category: "LifeStyle",
            title: "Heart and Sole: The Benefits of Running for Total Wellness",
            date: "January 11, 2025",
            description: "Running is more than just a physical activity; it is a holistic approach to improving both body and mind. One of the most significant benefits of running is its impact on cardiovascular health. Regular running strengthens the heart, improves blood circulation, and lowers the risk of heart disease...",
            url: "../html/pages-html/2.page.html",
        },
        {
            img: "../images/pages-img/s.avif",
            category: "News",
            title: "Bangladesh summons Indian envoy over border tensions",
            date: "January 11, 2025",
            description: "Bangladesh recently summoned the Indian envoy to address rising tensions along their shared border, a matter that has increasingly become a point of concern for both nations. The Ministry of Foreign Affairs in Dhaka expressed its apprehensions over incidents...",
            url: "../html/pages-html/19.page.html",
        },
        {
            img: "../images/pages-img/o.jpg",
            category: "Tech",
            title: "AMD and Copilot+ Set the Stage for Xbox AI",
            date: "January 9, 2025",
            description: "Copilot+ AI, designed to complement Xbox consoles, is focused on enhancing the player's gaming experience through real-time data processing and machine learning. By utilizing AI, the system can offer smarter in-game assistance, such as offering tips,...",
            url: "../html/pages-html/15.page.html",
        },
    ];

    const container = document.querySelector(".recent-posts-container");
    const refreshButton = document.getElementById("refresh-posts");
    const loadMoreButton = document.getElementById("load-more");
    let visiblePosts = 3;

    // Function to shuffle posts
    function shufflePosts(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Function to render posts
    function renderPosts(postList) {
        container.innerHTML = ""; // Clear existing cards
        postList.slice(0, visiblePosts).forEach(post => {
            const card = document.createElement("div");
            card.className = "recent-card";
            card.innerHTML = `
                <div class="recent-card-content">
                    <h3>${post.title}</h3>
                    <span>${post.date}</span>
                    <p>${post.description}</p>
                </div>
            `;
            card.style.cursor = "pointer"; // Make it look clickable
            card.addEventListener("click", function () {
                window.location.href = post.url; // Redirect to the post URL
            });

            const img = document.createElement("img");
            img.src = post.img;
            img.alt = post.category;

            card.prepend(img);
            container.appendChild(card);
        });
    }

    // Initial render
    renderPosts(posts);

    // Load More functionality
    loadMoreButton.addEventListener("click", function () {
        visiblePosts += 3;
        if (visiblePosts >= posts.length) {
            visiblePosts = posts.length;
            loadMoreButton.style.display = "none"; // Hide button if all posts are loaded
        }
        renderPosts(posts);
    });

    // Refresh functionality
    refreshButton.addEventListener("click", function () {
        const shuffledPosts = shufflePosts([...posts]);
        visiblePosts = 3; // Reset visible posts to 3
        loadMoreButton.style.display = "block"; // Show Load More button
        renderPosts(shuffledPosts);
    });
});
