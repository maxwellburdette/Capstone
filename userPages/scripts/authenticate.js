window.onload = function () {

    console.log(localStorage.getItem('userLogin'));
    //If admin goes to index and is still signed in it redirects them to admin page
    if(localStorage.getItem('userLogin') == null)
    {
        window.location.href = "../index.html"; 
    }
    
}