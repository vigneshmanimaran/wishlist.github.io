 let contacts = new Map()
 contacts.set('india', '+91888888888')
 contacts.set('usa', '+188888888')
 contacts.set('canada', '+1999999999')
 contacts.set('uae', '+97188888888')

 // contacts.get('india')

 document.getElementById("select1").addEventListener('change', () => {
     let country = document.getElementById('select1').value;
     document.getElementById('contact').innerHTML = contacts.get(country);
     document.getElementById('flag').src = `images/${country}.png`;
 })

 // scroll to top 
 document.getElementById("scrollUp").classList.add("hide");
 function getYPosition(){
    var top  = window.pageYOffset || document.documentElement.scrollTop
    return top;
  }

 document.addEventListener('scroll', () => {
     var scroll = getYPosition();
     var arrow = document.getElementById('scrollUp');
     scrolled = () => {
         window.scroll({
             top: 0,
             left: 0,
             behavior: 'smooth'
         });
     }
     if (scroll > 1200) {
        arrow.classList.remove("hide");
        arrow.classList.add("show");
        arrow.addEventListener('click', scrolled);
    } else {
        document.getElementById('scrollUp').classList.remove("show");
        document.getElementById('scrollUp').classList.add("hide");
        document.getElementById("scrollUp").removeEventListener("click", scrolled);
    }
 })

//  navigation bar sticky
 window.onscroll = function() {myFunction()};

var navbar = document.getElementById("sticky");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}