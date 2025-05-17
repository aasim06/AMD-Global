
// Default blogs data
const defaultBlogs = [
    { 
        id: '1', 
        category_id: '1',
        title: 'Getting Started with JavaScript',
        description: 'A beginner guide to JavaScript programming',
        feature_img: 'js.jpg',
        meta_title: 'JavaScript Tutorial',
        meta_description: 'Learn JavaScript from scratch',
        status: 'Published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    { 
        id: '2', 
        category_id: '2',
        title: 'CSS Best Practices',
        description: 'Modern CSS techniques for better styling',
        feature_img: 'css.jpg',
        meta_title: 'CSS Guide',
        meta_description: 'Improve your CSS skills',
        status: 'Draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

// Current blogs in memory
let currentBlogs = [...defaultBlogs];
let currentBlogId = null;

// Load blogs when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
});

// Load all blogs into the table
function loadBlogs() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    if (currentBlogs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" class="text-center">No blogs found</td></tr>';
        return;
    }

    currentBlogs.forEach((blog, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label=""><input type="checkbox" class="row-checkbox" data-id="${blog.id}"></td>
            <td data-label="#">${index + 1}</td>
            <td data-label="CATEGORY ID">${blog.category_id}</td>
            <td data-label="TITLE">${blog.title}</td>
            <td data-label="DESCRIPTION">${truncateText(blog.description, 30)}</td>
            <td data-label="FEATURE IMG">
                ${blog.feature_img ? `<img src="${blog.feature_img}" alt="Feature" style="width:50px;height:auto;">` : 'No Image'}
            </td>
            <td data-label="META TITLE">${truncateText(blog.meta_title, 20)}</td>
            <td data-label="META DESCRIPTION">${truncateText(blog.meta_description, 20)}</td>
            <td data-label="STATUS">
                <span class="badge ${blog.status === 'Published' ? 'bg-success' : 'bg-warning'}">
                    ${blog.status}
                </span>
            </td>
            <td data-label="CREATED AT">${formatDate(blog.created_at)}</td>
            <td data-label="UPDATED AT">${formatDate(blog.updated_at)}</td>
            <td class="table-action text-center">
                <a href="#" onclick="viewBlog('${blog.id}'); return false;" title="View">
                    <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </a>
                <a href="#" onclick="editBlog('${blog.id}'); return false;" title="Edit">
                    <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                </a>
                <a href="#" onclick="deleteBlog('${blog.id}'); return false;" title="Delete">
                    <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </a>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Add event listener for select all checkbox
    document.getElementById('selectAll')?.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

// Helper function to truncate long text
function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Open Add Blog Modal
function openAddUserModal() {
    document.getElementById('modalTitle').textContent = 'Add New Blog';
    document.getElementById('blogId').value = '';
    document.getElementById('blogForm').reset();
    const modal = document.getElementById('userModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Open Edit Blog Modal
function editBlog(id) {
    const blog = currentBlogs.find(b => b.id === id);
    if (blog) {
        currentBlogId = id;
        document.getElementById('modalTitle').textContent = 'Edit Blog';
        document.getElementById('blogId').value = blog.id;
        document.getElementById('category_id').value = blog.category_id;
        document.getElementById('title').value = blog.title;
        document.getElementById('description').value = blog.description;
        document.getElementById('feature_img').value = blog.feature_img;
        document.getElementById('meta_title').value = blog.meta_title;
        document.getElementById('meta_description').value = blog.meta_description;
        document.getElementById('status').value = blog.status;
        
        const modal = document.getElementById('userModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

// View Blog Details
function viewBlog(id) {
    const blog = currentBlogs.find(b => b.id === id);
    if (blog) {
        document.getElementById('viewCategoryId').textContent = blog.category_id;
        document.getElementById('viewTitle').textContent = blog.title;
        document.getElementById('viewDescription').textContent = blog.description;
        document.getElementById('viewFeatureImg').innerHTML = 
            blog.feature_img ? `<img src="${blog.feature_img}" style="max-width:100%;">` : 'No Image';
        document.getElementById('viewMetaTitle').textContent = blog.meta_title;
        document.getElementById('viewMetaDescription').textContent = blog.meta_description;
        document.getElementById('viewStatus').textContent = blog.status;
        document.getElementById('viewCreatedAt').textContent = formatDate(blog.created_at);
        document.getElementById('viewUpdatedAt').textContent = formatDate(blog.updated_at);
        
        const modal = document.getElementById('viewUserModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

// Delete Blog
function deleteBlog(id) {
    currentBlogId = id;
    const modal = document.getElementById('deleteUserModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Confirm Delete Blog
function confirmUserDelete() {
    currentBlogs = currentBlogs.filter(b => b.id !== currentBlogId);
    closeDeleteUserModal();
    loadBlogs();
}

// Save Blog (Add or Update)
function saveUser(event) {
    event.preventDefault();
    
    const id = document.getElementById('blogId').value;
    const category_id = document.getElementById('category_id').value.trim();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const feature_img = document.getElementById('feature_img').value.trim();
    const meta_title = document.getElementById('meta_title').value.trim();
    const meta_description = document.getElementById('meta_description').value.trim();
    const status = document.getElementById('status').value;

    // Validation
    if (!category_id || !title || !description || !status) {
        alert('Please fill in all required fields');
        return;
    }

    if (id) {
        // Update existing blog
        const index = currentBlogs.findIndex(b => b.id === id);
        if (index !== -1) {
            currentBlogs[index] = {
                ...currentBlogs[index],
                category_id,
                title,
                description,
                feature_img,
                meta_title,
                meta_description,
                status,
                updated_at: new Date().toISOString()
            };
        }
    } else {
        // Add new blog
        currentBlogs.push({
            id: Date.now().toString(),
            category_id,
            title,
            description,
            feature_img,
            meta_title,
            meta_description,
            status,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
    }

    closeUserModal();
    loadBlogs();
}

// Close modals
function closeUserModal() {
    const modal = document.getElementById('userModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function closeViewUserModal() {
    const modal = document.getElementById('viewUserModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function closeDeleteUserModal() {
    const modal = document.getElementById('deleteUserModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = ['userModal', 'viewUserModal', 'deleteUserModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
