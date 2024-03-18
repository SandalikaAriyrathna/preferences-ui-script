// Get the modal
var modal = document.getElementById("modal");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Function to show the modal if an hour has passed
function showModalIfNeeded() {
  const lastShown = localStorage.getItem('lastShown');
  const now = new Date().getTime();

  // Show if more than an hour has passed or never shown
  if (!lastShown || now - lastShown > 60000) { // 3600000 ms = 1 hour
    modal.style.display = "block";
    localStorage.setItem('lastShown', now.toString());
  }
}

// Call showModalIfNeeded on page load
window.onload = showModalIfNeeded;

// Add event listener for the 'openModalButton'
document.getElementById("openModalButton").onclick = function() {
  modal.style.display = "block";
};

// Get the brand elements and attach click event listeners
document.querySelectorAll('.brand').forEach(function(brand) {
  brand.addEventListener('click', function() {
    // Here you can add code to handle the click event
    // For example, saving the user's preference or displaying more information
    modal.style.display = "none";
    console.log("Brand selected: " + this.alt);
    // Implement your logic to display user experience or store preference
  });
});
