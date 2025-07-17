document.addEventListener('DOMContentLoaded', function() {
    const addVehicleForm = document.getElementById('addVehicleForm');
    const searchInput = document.getElementById('searchInput');
    const vehicleTableBody = document.getElementById('vehicleTableBody');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');

    // Store vehicles in memory (in a real app, this would be in a database)
    let vehicles = [
        {
            id: 1,
            vehicleModel: 'Royal Enfield Hunter 350',
            serialNumber: 'REH350001',
            color: 'Black',
            recoveryDate: '2024-03-20',
            recoveryLocation: 'Downtown Area',
            condition: 'Excellent',
            status: 'In Storage',
            imageUrl: 'https://imgd.aeplcdn.com/640X480/n/bw/used/s553491/553491_1742626440420.jpeg?q=80'
        },
        {
            id: 2,
            vehicleModel: 'Royal Enfield Classic 350',
            serialNumber: 'REC350001',
            color: 'Gunmetal Grey',
            recoveryDate: '2024-03-19',
            recoveryLocation: 'City Center',
            condition: 'Good',
            status: 'In Storage',
            imageUrl: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=500'
        },
        {
            id: 3,
            vehicleModel: 'Yamaha MT 15 V2',
            serialNumber: 'YMT15001',
            color: 'Blue',
            recoveryDate: '2024-03-18',
            recoveryLocation: 'West Side',
            condition: 'Excellent',
            status: 'Under Investigation',
            imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500'
        },
        {
            id: 4,
            vehicleModel: 'Honda SP 125',
            serialNumber: 'HSP12501',
            color: 'Red',
            recoveryDate: '2024-03-17',
            recoveryLocation: 'East Side',
            condition: 'Good',
            status: 'In Storage',
            imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500'
        },
        {
            id: 5,
            vehicleModel: 'Bajaj Pulsar 150',
            serialNumber: 'BP15001',
            color: 'Black',
            recoveryDate: '2024-03-16',
            recoveryLocation: 'North Area',
            condition: 'Fair',
            status: 'In Storage',
            imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500'
        }
    ];

    // Load vehicles when page loads
    loadVehicles();

    // Add vehicle form submission
    addVehicleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            id: vehicles.length + 1, // Generate new ID
            vehicleModel: document.getElementById('vehicleModel').value,
            serialNumber: document.getElementById('serialNumber').value,
            color: document.getElementById('color').value,
            recoveryDate: document.getElementById('recoveryDate').value,
            recoveryLocation: document.getElementById('recoveryLocation').value,
            condition: document.getElementById('condition').value,
            status: document.getElementById('status').value,
            imageUrl: document.getElementById('imageUrl').value || 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500' // Default image if none provided
        };

        // Add the new vehicle to the array
        vehicles.push(formData);
        
        // Save vehicle and reload the table
        saveVehicle(formData);
        addVehicleForm.reset();
        loadVehicles();
    });

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const rows = vehicleTableBody.getElementsByTagName('tr');

        Array.from(rows).forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Modal close button click
    closeModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Function to load vehicles
    function loadVehicles() {
        displayVehicles(vehicles);
    }

    // Function to display vehicles in the table
    function displayVehicles(vehicles) {
        vehicleTableBody.innerHTML = '';
        
        vehicles.forEach(vehicle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.id}</td>
                <td>${vehicle.vehicleModel}</td>
                <td>${vehicle.serialNumber}</td>
                <td>${vehicle.color}</td>
                <td>${vehicle.recoveryDate}</td>
                <td>${vehicle.recoveryLocation}</td>
                <td>${vehicle.condition}</td>
                <td>${vehicle.status}</td>
                <td class="action-buttons">
                    ${vehicle.imageUrl ? 
                        `<button class="view-image-btn" onclick="viewImage('${vehicle.imageUrl}', '${vehicle.vehicleModel}')">
                            <i class="fas fa-image"></i> View Image
                        </button>` : 
                        ''}
                    <button class="edit-btn" onclick="editVehicle(${vehicle.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteVehicle(${vehicle.id})">Delete</button>
                    ${vehicle.status === 'In Storage' ? 
                        `<button class="claimed-btn" onclick="markAsClaimed(${vehicle.id})">Mark Claimed</button>` : 
                        ''}
                </td>
            `;
            vehicleTableBody.appendChild(row);
        });
    }

    // Function to save vehicle
    function saveVehicle(vehicleData) {
        // In a real application, this would be an API call to save to database
        console.log('Saving vehicle:', vehicleData);
        // Show success message
        alert('Vehicle added successfully!');
    }
});

// Edit vehicle function
function editVehicle(id) {
    // In a real application, this would open a modal or form to edit the vehicle
    console.log('Editing vehicle with ID:', id);
}

// Delete vehicle function
function deleteVehicle(id) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        // In a real application, this would be an API call to delete from database
        console.log('Deleting vehicle with ID:', id);
        // Reload vehicles after deletion
        loadVehicles();
    }
}

// Mark vehicle as claimed
function markAsClaimed(id) {
    if (confirm('Are you sure you want to mark this vehicle as claimed?')) {
        // In a real application, this would open a form to collect claimer information
        console.log('Marking vehicle as claimed:', id);
        // Update status and reload
        loadVehicles();
    }
}

// View image function
function viewImage(imageUrl, vehicleModel) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    
    modal.style.display = 'block';
    modalImg.src = imageUrl;
    captionText.innerHTML = vehicleModel;
} 