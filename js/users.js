
// Default users data
const defaultUsers = [
    { 
        id: '1', 
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'Admin',
        email_verified_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    { 
        id: '2', 
        name: 'Editor User',
        email: 'editor@example.com',
        role: 'Editor',
        email_verified_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

// Current users in memory
let currentUsers = [...defaultUsers];
let currentUserId = null;

// Load users when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

// Load all users into the table
function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    if (currentUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center">No users found</td></tr>';
        return;
    }


    currentUsers.forEach((user, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="row-checkbox" data-id="${user.id}"></td>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.email_verified_at ? formatDate(user.email_verified_at) : 'Not Verified'}</td>
            <td>${user.role}</td>
            <td>${user.action}</td>
            <td>••••••••</td> <!-- Password placeholder -->
            <td>${formatDate(user.created_at)}</td>
            <td>${formatDate(user.updated_at)}</td>
            <td class="table-action text-center">
                <a href="#" onclick="viewUser('${user.id}'); return false;" title="View">
                    <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-middle">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </a>
                <a href="#" onclick="editUser('${user.id}'); return false;" title="Edit">
                    <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                </a>
                <a href="#" onclick="deleteUser('${user.id}'); return false;" title="Delete">
                    <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle">
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

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Open Add User Modal
function openAddUserModal() {
    document.getElementById('modalTitle').textContent = 'Add New User';
    document.getElementById('userId').value = '';
    document.getElementById('userForm').reset();
    const modal = document.getElementById('userModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Open Edit User Modal
function editUser(id) {
    const user = currentUsers.find(u => u.id === id);
    if (user) {
        currentUserId = id;
        document.getElementById('modalTitle').textContent = 'Edit User';
        document.getElementById('userId').value = user.id;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('role').value = user.role;
        document.getElementById('password').value = '';
        
        const modal = document.getElementById('userModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

// View User Details
function viewUser(id) {
    const user = currentUsers.find(u => u.id === id);
    if (user) {
        document.getElementById('viewName').textContent = user.name;
        document.getElementById('viewUserEmail').textContent = user.email;
        document.getElementById('viewRole').textContent = user.role;
        document.getElementById('viewCreatedAt').textContent = formatDate(user.created_at);
        
        const modal = document.getElementById('viewUserModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

// Delete User
function deleteUser(id) {
    currentUserId = id;
    const modal = document.getElementById('deleteUserModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Confirm Delete User
function confirmUserDelete() {
    currentUsers = currentUsers.filter(u => u.id !== currentUserId);
    closeDeleteUserModal();
    loadUsers();
}

// Save User (Add or Update)
function saveUser(event) {
    event.preventDefault();
    
    const id = document.getElementById('userId').value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;

    // Validation
    if (!name || !email || !role) {
        alert('Please fill in all required fields');
        return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (id) {
        // Update existing user
        const index = currentUsers.findIndex(u => u.id === id);
        if (index !== -1) {
            const updatedUser = {
                ...currentUsers[index],
                name,
                email,
                role,
                updated_at: new Date().toISOString()
            };
            
            // Only update password if provided
            if (password) {
                // In a real app, you would hash the password here
                updatedUser.password = password;
            }
            
            currentUsers[index] = updatedUser;
        }
    } else {
        // Add new user
        if (!password) {
            alert('Please enter a password for the new user');
            return;
        }
        
        currentUsers.push({
            id: Date.now().toString(),
            name,
            email,
            role,
            password, // In a real app, this would be hashed
            email_verified_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
    }

    closeUserModal();
    loadUsers();
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
	