async function fetchUserDemographics(user_id) {
  try {
    const response = await fetch(`http://localhost:8000/demographics/${user_id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null; // Return null in case of an error
  }
}

function showModalIfNeeded(userDemographics) {
  console.log(userDemographics);
  // Check if any of the required userDemographics fields are null
  if (userDemographics.age === null || userDemographics.gender === null || userDemographics.location === null) {
    // If any of the demographic data is null, show the modal
    modal.style.display = "block";
  }
}

window.onload = async function() {
  // Retrieve the user_id from session storage
  const user_id = sessionStorage.getItem('user_id');
  // const user_id = 11;

  if (user_id) {
    const userDemographics = await fetchUserDemographics(user_id);
    showModalIfNeeded(userDemographics);
  } else {
    console.error('No user_id found in session storage. User might not be logged in.');
    // Handle case where user is not logged in or user_id is not stored in session storage
  }
};

// Add event listener for the 'openModalButton'
document.getElementById("openModalButton").onclick = function() {
  modal.style.display = "block";
};

// Get the brand elements and attach click event listeners
document.querySelectorAll('.brand').forEach(function(brand) {
  brand.addEventListener('click', function() {
    modal.style.display = "none";
    console.log("Brand selected: " + this.alt);
  });
}
);

document.getElementById('submit').addEventListener('click', async function() {
  const birthDate = new Date(document.getElementById('age').value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const gender = document.getElementById('gender').value;
  const location = document.getElementById('location').value;

  // Retrieve the user_id from session storage
  const user_id = sessionStorage.getItem('user_id');
  // const user_id = 11;

  // Collect selected brands
  const brands = [];
  document.querySelectorAll('input[name="brands"]:checked').forEach((checkbox) => {
      brands.push(checkbox.value);
  });

  if (user_id) {
      // Assuming you have a separate endpoint or logic to handle brands
      await updateUserDemographics(user_id, age, gender, location, brands);
  } else {
      console.error('No user_id found in session storage. Cannot update user demographics.');
  }
});

async function updateUserDemographics(user_id, age, gender, location, brands) {
  const userUpdateData = {
      user_id,
      age,
      gender,
      location,
      brands  // Include the brands array in the data sent to the backend
  };

  try {
      const response = await fetch(`http://localhost:8000/demographics/update/${user_id}/`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userUpdateData)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Update successful:', data);
  } catch (error) {
      console.error('There has been a problem with your update operation:', error);
  }
}
