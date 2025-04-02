// Debugging
console.log('bookTitle: ', document.getElementById('bookTitle'));
console.log('bookSuggestions: ', document.getElementById('bookSuggestions'));
console.log('authorFirstName: ', document.getElementById('authorFirstName'));
console.log('authorLastName: ', document.getElementById('authorLastName'));

// 4/1/25 index.ejs Open Library API
document.getElementById('bookTitle').addEventListener('input', async event => {
    const query = event.target.value.trim();
    if (query.length < 3) return;   // Avoid too many API calls for short input

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();

        const suggestions = data.docs.map(book => ({
            title: book.title,
            author: book.author_name ? book.author_name[0] : "Unknown",
        }));

        const datalist = document.getElementById('bookSuggestions');
        datalist.innerHTML = '' // Clear previous suggestions

        suggestions.forEach(({ title, author}) => {
            const option = document.createElement('option');
            option.value = title;
            option.textContent = `${title} - ${author}`;
            datalist.appendChild(option);
        });
    } catch (err) {
        console.error('Error fetching book suggestions:', err);
    }
});

document.getElementById('bookTitle').addEventListener('change', event => {
    const selectedOption = Array.from(document.getElementById('bookSuggestions').options).find(
        option => option.value === event.target.value
    );

    if (selectedOption) {
        const [title, author] = selectedOption.textContent.split(' - ');
        event.target.value = title;
        document.getElementById('authorFirstName').value = author.split(' ')[0] || '';
        document.getElementById('authorLastName').value = author.split(' ').slice(1).join(' ') || '';
    };
});


// 3/31/25 index.ejs Calendar for date finished
document.addEventListener('DOMContentLoaded', () => {
    const toReadRadio = document.getElementById('toRead');
    const finishedRadio = document.getElementById('finishedBook');
    const dateField = document.getElementById('dateFinishedField');

    // Set initial state
    dateField.style.display = finishedRadio.checked ? 'block' : 'none';

    toReadRadio.addEventListener('change', () => {
        dateField.style.display = 'none';
    });

    finishedRadio.addEventListener('change', () => {
        dateField.style.display = 'block';
    });
});