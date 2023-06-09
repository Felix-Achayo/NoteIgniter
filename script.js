document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('add-note-btn');
    const notesList = document.getElementById('notes-list');
  
    addNoteBtn.addEventListener('click', () => {
      const noteTitleInput = document.getElementById('note-title');
      const noteContentInput = document.getElementById('note-content');
  
      const title = noteTitleInput.value;
      const content = noteContentInput.value;
  
      if (title && content) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'save_note.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
              const note = createNoteElement(response.note.title, response.note.content);
              notesList.appendChild(note);
              noteTitleInput.value = '';
              noteContentInput.value = '';
            } else {
              alert('Failed to save the note.');
            }
          } else {
            alert('An error occurred while saving the note.');
          }
        };
        const data = `title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`;
        xhr.send(data);
      }
    });
  
    function createNoteElement(title, content) {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
  
      const titleHeading = document.createElement('h3');
      titleHeading.textContent = title;
  
      const contentPara = document.createElement('p');
      contentPara.textContent = content;
  
      noteDiv.appendChild(titleHeading);
      noteDiv.appendChild(contentPara);
  
      return noteDiv;
    }
  });
  