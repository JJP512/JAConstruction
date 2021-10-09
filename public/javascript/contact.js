async function contactRequestHandler(event) {
    event.preventDefault();

    const name = document.querySelector("#name-contact").value.trim();
    const email = document.querySelector("#email-contact").value.trim();
    const phone = document.querySelector("#phone-contact").value.trim();
    const preferred = document.querySelector("input[name='preferred']:checked").value;
    const request_text = document.querySelector("#request-text").value.trim();

    if (name && email && phone && preferred && request_text) {
        const response = await fetch("/api/contact", {
            method: "post",
            body: JSON.stringify({
                name,
                email,
                phone,
                preferred,
                request_text
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            document.location.replace("/");
            alert("Contact request successful. We will reach out to you by your preferred method of contact within 24 hours.")
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector(".contact-form").addEventListener("submit", contactRequestHandler);