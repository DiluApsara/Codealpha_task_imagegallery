document.addEventListener('DOMContentLoaded', function() {
    const addImageBtn = document.getElementById('add-image');
    const deleteImageBtn = document.getElementById('delete-image');
    const categories = document.querySelectorAll('.category');
    let selectedImage = null;

    // Add Image functionality
    addImageBtn.addEventListener('click', function() {
        const category = prompt("Enter category (nature, flowers, animals, sports, fruits):");
        if (category) {
            const imageUrl = prompt("Enter image URL:");
            if (imageUrl) {
                const categoryDiv = document.getElementById(category.toLowerCase());
                if (categoryDiv) {
                    const container = document.createElement('div');
                    container.className = 'image-container';
                    
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = `${category} image`;
                    img.className = 'image';
                    
                    const downloadBtn = document.createElement('button');
                    downloadBtn.textContent = 'Download';
                    downloadBtn.className = 'download-btn';
                    
                    container.appendChild(img);
                    container.appendChild(downloadBtn);
                    categoryDiv.querySelector('.images').appendChild(container);
                    
                    addImageClickListener(img);
                    addDownloadClickListener(downloadBtn);
                } else {
                    alert("Category not found!");
                }
            }
        }
    });

    // Delete Image functionality
    deleteImageBtn.addEventListener('click', function() {
        if (selectedImage) {
            selectedImage.closest('.image-container').remove();
            selectedImage = null;
        } else {
            alert("Please select an image to delete.");
        }
    });

    // See More functionality
    const seeMoreButtons = document.querySelectorAll('.see-more');
    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.parentElement;
            const containers = category.querySelectorAll('.image-container');
            containers.forEach(container => {
                container.style.display = container.style.display === 'none' ? 'block' : 'none';
            });
            this.textContent = this.textContent === 'See more' ? 'See less' : 'See more';
        });
    });

    // Function to add click listener to images for selection
    function addImageClickListener(img) {
        img.addEventListener('click', function() {
            if (selectedImage) {
                selectedImage.style.border = '1px solid #eee';
            }
            this.style.border = '3px solid #007bff';
            selectedImage = this;
        });
    }

    // Function to add click listener to download buttons
    function addDownloadClickListener(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent image selection when clicking download
            const container = this.closest('.image-container');
            const img = container.querySelector('img');
            // Implement download functionality here
        });
    }
    
    // Add click listeners to existing images and download buttons
    document.querySelectorAll('.image').forEach(img => {
        addImageClickListener(img);
    });
    
    document.querySelectorAll('.download-btn').forEach(btn => {
        addDownloadClickListener(btn);
    });
});