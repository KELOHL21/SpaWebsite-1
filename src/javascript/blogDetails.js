// blogDetail.js
document.addEventListener("DOMContentLoaded", function() {
    const blogDetailContainer = document.querySelector('.blogDetailContainer');

    // Function to get query parameter by name
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const blogId = getQueryParameter('id');

    // Fetching Blog Data
    fetch('/src/data/blogInfoData/blogInfo.json')
    .then(response => response.json())
    .then(data => {
        const blog = data.find(blog => blog.id == blogId);
        if (blog) {
            displayFullBlog(blog);
        } else {
            blogDetailContainer.innerHTML = '<p>Blog not found.</p>';
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));

    function displayFullBlog(blog) {
        blogDetailContainer.innerHTML = `
            <div class="fullBlog">
                <h1>${blog.title}</h1>
                <p><em>by ${blog.author} on ${blog.datePublished}</em></p>
                <p>${blog.description}</p>
                <p>${blog.cons[0]}</p>
            </div>
        `;
    }
});
