async function logout() {
    const response = await fetch("/api/admin/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.replace("/admin/login");
    } else {
        alert(response.statusText);
    }
}

document.querySelector("#logout").addEventListener("click", logout);