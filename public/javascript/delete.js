async function deleteRequest(event) {
    event.preventDefault();
    
    const id = event.target.value;

    const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
        alert(`Request number ${id} has been deleted.`);
    } else {
        alert(response.statusText);
    }
}

deleteBtns = document.getElementsByClassName("delete-btn");

for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener("click", deleteRequest);
}