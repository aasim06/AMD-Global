// Default newsletters data
const defaultNewsletters = [
    { 
        id: '1', 
        status: 'Active',
        is_default: true,
        country: 'United States',
        name: 'Eur',
        rate: '5%',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    },
    { 
        id: '2', 
        status: 'Inactive',
        is_default: false,
        country: 'United Kingdom',
        name: 'USD',
        rate: '3%',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

// Current newsletters in memory
let currentNewsletters = [...defaultNewsletters];
let currentNewsletterId = null;

// Load newsletters when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadNewsletters();
});

// Load all newsletters into the table
function loadNewsletters() {
    const tbody = document.getElementById('newslettersTableBody');
    tbody.innerHTML = '';

    if (currentNewsletters.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">No currencies found</td></tr>';
        return;
    }

    currentNewsletters.forEach((newsletter, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label=""><input type="checkbox" class="row-checkbox" data-id="${newsletter.id}"></td>
            <td data-label="#">${index + 1}</td>
            <td data-label="STATUS">
                <span class="badge ${newsletter.status === 'Active' ? 'bg-success' : 'bg-secondary'}">
                    ${newsletter.status}
                </span>
            </td>
            <td data-label="DEFAULT">
                ${newsletter.is_default ? 
                    '<span class="badge bg-primary">Yes</span>' : 
                    '<span class="badge bg-light text-dark">No</span>'}
            </td>
            <td data-label="COUNTRY">${newsletter.country}</td>
            <td data-label="NAME">${newsletter.name}</td>
            <td data-label="RATE">${newsletter.rate}</td>
            <td class="table-action text-center">
                <a href="#" onclick="viewNewsletter('${newsletter.id}'); return false;" title="View">
                    <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye align-middle">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </a>
                <a href="#" onclick="editNewsletter('${newsletter.id}'); return false;" title="Edit">
                   <svg class="icon-button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                </a>
                <a href="#" onclick="deleteNewsletter('${newsletter.id}'); return false;" title="Delete">
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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Open Add Newsletter Modal
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Add Newsletter';
    document.getElementById('newsletterId').value = '';
    document.getElementById('newsletterForm').reset();
    const modal = document.getElementById('newsletterModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Open Edit Newsletter Modal
function editNewsletter(id) {
    const newsletter = currentNewsletters.find(n => n.id === id);
    if (newsletter) {
        currentNewsletterId = id;
        document.getElementById('modalTitle').textContent = 'Edit Newsletter';
        document.getElementById('newsletterId').value = newsletter.id;
        document.getElementById('status').value = newsletter.status;
        document.getElementById('is_default').checked = newsletter.is_default;
        document.getElementById('country').value = newsletter.country;
        document.getElementById('name').value = newsletter.name;
        document.getElementById('rate').value = newsletter.rate;
        
        const modal = document.getElementById('newsletterModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

// View Newsletter Details
function viewNewsletter(id) {
    const newsletter = currentNewsletters.find(n => n.id === id);
    if (newsletter) {
        document.getElementById('viewStatus').textContent = newsletter.status;
        document.getElementById('viewDefault').textContent = newsletter.is_default ? 'Yes' : 'No';
        document.getElementById('viewCountry').textContent = newsletter.country;
        document.getElementById('viewName').textContent = newsletter.name;
        document.getElementById('viewRate').textContent = newsletter.rate;
        document.getElementById('viewCreatedAt').textContent = formatDate(newsletter.created_at);
        document.getElementById('viewUpdatedAt').textContent = formatDate(newsletter.updated_at);
        
        const modal = document.getElementById('viewModal');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
}

// Delete Newsletter
function deleteNewsletter(id) {
    currentNewsletterId = id;
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

// Confirm Delete Newsletter
function confirmDelete() {
    currentNewsletters = currentNewsletters.filter(n => n.id !== currentNewsletterId);
    closeDeleteModal();
    loadNewsletters();
}

// Save Newsletter (Add or Update)
function saveNewsletter(event) {
    event.preventDefault();
    
    const id = document.getElementById('newsletterId').value;
    const status = document.getElementById('status').value;
    const is_default = document.getElementById('is_default').checked;
    const country = document.getElementById('country').value.trim();
    const name = document.getElementById('name').value.trim();
    const rate = document.getElementById('rate').value.trim();

    // Validation
    if (!status || !country || !name || !rate) {
        alert('Please fill in all required fields');
        return;
    }

    if (id) {
        // Update existing newsletter
        const index = currentNewsletters.findIndex(n => n.id === id);
        if (index !== -1) {
            currentNewsletters[index] = {
                ...currentNewsletters[index],
                status,
                is_default,
                country,
                name,
                rate,
                updated_at: new Date().toISOString()
            };
        }
    } else {
        // Add new newsletter
        currentNewsletters.push({
            id: Date.now().toString(),
            status,
            is_default,
            country,
            name,
            rate,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
    }

    closeModal();
    loadNewsletters();
}

// Close modals
function closeModal() {
    const modal = document.getElementById('newsletterModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function closeViewModal() {
    const modal = document.getElementById('viewModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = ['newsletterModal', 'viewModal', 'deleteModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}