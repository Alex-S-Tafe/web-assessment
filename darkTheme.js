let darkTheme = false;

function DarkTheme(){
    document.body.classList.toggle(`dark-theme`);
    darkTheme = !darkTheme;
    darkTheme? localStorage.setItem("theme", "dark") : localStorage.setItem("theme", "light");
}

function LoadTheme(){
    let theme = localStorage.getItem("theme");
    if (theme == "undefined"){
        localStorage.setItem("theme", "light");
    } else {
        if (theme == "dark") {
            darkTheme = false; // set false because DarkTheme() flips it
            DarkTheme();
        }
    }
}
LoadTheme();