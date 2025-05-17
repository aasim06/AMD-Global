
		// Default newsletters data
		const defaultNewsletters = [
			{ id: '1', email: 'asim@gmail.com', createdAt: new Date().toISOString() },
			{ id: '2', email: 'younas@gmail.com', createdAt: new Date().toISOString() }
		];

		// Load default newsletters
		function loadNewsletters() {
			populateTable(defaultNewsletters);
		}

		// Load default newsletters when page loads
		document.addEventListener('DOMContentLoaded', () => {
			// Reset to default on each load
			currentNewsletters = [...defaultNewsletters];
			loadNewsletters();
		});

		// Load all newsletters into the table
		function populateTable(newsletters) {
			const tbody = document.getElementById('newslettersTableBody');
			tbody.innerHTML = '';

			if (currentNewsletters.length === 0) {
				tbody.innerHTML = '<tr><td colspan="5" class="text-center">No newsletters found</td></tr>';
				return;
			}

			currentNewsletters.forEach((newsletter, index) => {
				const tr = document.createElement('tr');
				tr.innerHTML = `
					<td><input type="checkbox" class="row-checkbox" data-id="${newsletter.id}"></td>
					<td>${index + 1}</td>
					<td>${newsletter.email}</td>
					<td>${formatDate(newsletter.createdAt)}</td>
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
			document.getElementById('selectAll').addEventListener('change', function() {
				const checkboxes = document.querySelectorAll('.row-checkbox');
				checkboxes.forEach(checkbox => {
					checkbox.checked = this.checked;
				});
			});
		}

		// Format date for display
		function formatDate(dateString) {
			const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		}

		// Open Add Newsletter Modal
		function openAddModal() {
			document.getElementById('modalTitle').textContent = 'Add Newsletter';
			document.getElementById('newsletterId').value = '';
			document.getElementById('email').value = '';
			const modal = document.getElementById('newsletterModal');
			modal.style.display = 'flex';
			setTimeout(() => modal.classList.add('show'), 10);
		}

		// Open Edit Newsletter Modal
		function editNewsletter(id) {
			const newsletter = currentNewsletters.find(n => n.id === id);
			if (newsletter) {
				document.getElementById('modalTitle').textContent = 'Edit Newsletter';
				document.getElementById('newsletterId').value = newsletter.id;
				document.getElementById('email').value = newsletter.email;
				const modal = document.getElementById('newsletterModal');
				modal.style.display = 'flex';
				setTimeout(() => modal.classList.add('show'), 10);
			}
		}

		// View Newsletter Details
		function viewNewsletter(id) {
			const newsletter = currentNewsletters.find(n => n.id === id);
			if (newsletter) {
				document.getElementById('viewEmail').textContent = newsletter.email;
				document.getElementById('viewCreatedAt').textContent = formatDate(newsletter.createdAt);
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

		// Confirm Delete
		function confirmDelete() {
			currentNewsletters = currentNewsletters.filter(n => n.id !== currentNewsletterId);
			closeDeleteModal();
			loadNewsletters();
		}

		// Current newsletters in memory
		let currentNewsletters = [...defaultNewsletters];

		// Add or Update Newsletter
		function saveNewsletter(event) {
			event.preventDefault();
			const email = document.getElementById('email').value.trim();
			const id = document.getElementById('newsletterId').value;

			if (!email) {
				alert('Please enter an email address');
				return;
			}

			// Basic email validation
			if (!/\S+@\S+\.\S+/.test(email)) {
				alert('Please enter a valid email address');
				return;
			}

			if (id) {
				// Update existing
				const index = currentNewsletters.findIndex(n => n.id === id);
				if (index !== -1) {
					currentNewsletters[index] = { ...currentNewsletters[index], email };
				}
			} else {
				// Add new (only in memory)
				currentNewsletters.push({
					id: Date.now().toString(),
					email,
					createdAt: new Date().toISOString()
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
	