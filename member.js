function skillsMember() {
    var member = document.getElementById("member");
    var skills = document.getElementById("skills");
    var contact = document.getElementById("contact");
    var about = document.getElementById("about");
    var home = document.getElementById("home");
    var memberContent = document.getElementById("memberContent");
    var skillsContent = document.getElementById("skillsContent");
    var contactContent = document.getElementById("contactContent");
    var aboutContent = document.getElementById("aboutContent");
    var homeContent = document.getElementById("homeContent");
    member.style.backgroundColor = "#f1f1f1";
    skills.style.backgroundColor = "#fff";
    contact.style.backgroundColor = "#fff";
    about.style.backgroundColor = "#fff";
    home.style.backgroundColor = "#fff";
    memberContent.style.display = "block";
    skillsContent.style.display = "none";
    contactContent.style.display = "none";
    aboutContent.style.display = "none";
    homeContent.style.display = "none";
}