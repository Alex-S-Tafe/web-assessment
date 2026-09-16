let mailTickets = [];

function mail(name, email, comments){
    this.name = name;
    this.email = email;
    this.comments = comments;
}

function submitMail(){
    let name = document.getElementById("conInName").value.trim();
    let email = document.getElementById("conInEmail").value.trim();
    let comments = document.getElementById("conInComments").value;

    mailTickets[mailTickets.length] = new mail(name, email, comments);

    
    // console.log(mailTickets);

    document.getElementById("contactForm").reset();
    return false;
}