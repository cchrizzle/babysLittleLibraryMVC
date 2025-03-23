// From Class 46/47 Build a Node.js MVC App Complete Easy Walkthrough 4:01:00

const deleteIcon = document.querySelectorAll('.fa-trash');
const bookIcon = document.querySelectorAll('.fa-book-open');
const checkMark = document.querySelectorAll('.fa-check');

Array.from(deleteIcon).forEach(ele => {
    ele.addEventListener('click', deleteBook);
});

Array.from(bookIcon).forEach(ele => {
    ele.addEventListener('click', markToRead);
});

Array.from(checkMark).forEach(ele => {
    ele.addEventListener('click', markFinished);
});

async function deleteBook() {
    const bookId = this.parentNode.dataset.id;
    try {
        // 3/22/25 16:45 Own thoughts: document.delete(bookId)? I would need to load from Mongo though. Or actually does document.delete already go to Mongo? I'm thinking: document.delete(bookId); Would need (res, req) as well? Sending delete req: app.delete('/route', (req, res) => {document.delete(bookId); res.render('index.ejs')})
        const response = await fetch('/books/deleteBook', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                // 'todoIdFromJSFile': todoId
            }),
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.error(`Error deleting book: ${err}`);
    }
}


async function markToRead() {
    const bookId = this.parentNode.dataset.id;
    try {
        const response = await fetch('/books/')
    }
}