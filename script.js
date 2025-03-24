document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const extensionsList = document.getElementById('extensions-list');
            data.forEach(extension => {
                const extensionItem = document.createElement('div');
                extensionItem.classList.add('extension-item');

                const logo = document.createElement('img');
                logo.src = extension.logo;
                logo.alt = `${extension.name} logo`;
                extensionItem.appendChild(logo);

                const name = document.createElement('h2');
                name.textContent = extension.name;
                extensionItem.appendChild(name);

                const description = document.createElement('p');
                description.textContent = extension.description;
                extensionItem.appendChild(description);

                const status = document.createElement('p');
                status.textContent = extension.isActive ? 'Active' : 'Inactive';
                status.classList.add(extension.isActive ? 'active' : 'inactive');
                extensionItem.appendChild(status);

                extensionsList.appendChild(extensionItem);
            });
        })
        .catch(error => console.error('Error loading data:', error));
});