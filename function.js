function sendEmail() 
{
    const templateParms = 
    {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value,
    }

    emailjs.send("service_gwxq2pr", "template_4li020m", templateParms,).then(
        () => alert("Email Sent").catch(() => alert("Email not sent"))
    );
};
