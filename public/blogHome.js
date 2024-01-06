document.addEventListener('DOMContentLoaded', function () {
    // Add any client-side logic or interactions here
    const readMoreLinks = document.querySelectorAll('.card-link');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const blogSlug = this.getAttribute('href').split('/')[2];
            // Redirect to the blog page with the selected blog's slug
            window.location.href = `/blogpost/${blogSlug}`;
        });
    });
});
