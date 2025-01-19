const notepadIcon = document.querySelector('.notepad-icon');
const notepad = document.getElementById('notepad');
const textarea = document.getElementById('notepadContent');
const saveBtn = document.getElementById('saveBtn');
const editBtn = document.getElementById('editBtn');
const clearBtn = document.getElementById('clearBtn');

let isNotepadOpen = false;

// Toggle notepad visibility
notepadIcon.addEventListener('click', () => {
    isNotepadOpen = !isNotepadOpen;
    notepad.style.display = isNotepadOpen ? 'flex' : 'none';

    if (isNotepadOpen) {
        textarea.value = localStorage.getItem('notepadContent') || '';
        textarea.disabled = false; // Make the textarea editable by default
        editBtn.disabled = true; // Disable the Edit button since it's already editable
    } else {
        editBtn.disabled = false; // Re-enable the Edit button when closing the notepad
    }
});

// Save content to localStorage
saveBtn.addEventListener('click', () => {
    localStorage.setItem('notepadContent', textarea.value);
    textarea.disabled = true;
    alert('Content saved!');
    editBtn.disabled = false; // Re-enable the Edit button after saving
});

// Enable editing
editBtn.addEventListener('click', () => {
    textarea.disabled = false;
    editBtn.disabled = true; // Disable the Edit button while editing
});

// Clear content
clearBtn.addEventListener('click', () => {
    textarea.value = '';
    localStorage.removeItem('notepadContent');
});

// Enable dragging
let isDragging = false;
let offsetX, offsetY;

notepad.addEventListener('mousedown', (e) => {
    if (e.target === notepad) {
        isDragging = true;
        offsetX = e.clientX - notepad.offsetLeft;
        offsetY = e.clientY - notepad.offsetTop;
        notepad.style.cursor = 'grabbing';
    }
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        notepad.style.left = `${e.clientX - offsetX}px`;
        notepad.style.top = `${e.clientY - offsetY}px`;
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    notepad.style.cursor = 'grab';
});
