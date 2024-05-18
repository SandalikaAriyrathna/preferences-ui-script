async function fetchUserDemographics(user_id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/user-demo-data/demographics/${user_id}/`);
    console.log('fetchUserDemographics response:', response);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('fetchUserDemographics data:', data);

    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

function showModalIfNeeded(userDemographics) {
  console.log('showModalIfNeeded userDemographics:', userDemographics);
  // Check if any of the required userDemographics fields are null
  if (!userDemographics || userDemographics.age === null || userDemographics.gender === null || userDemographics.location === null) {
    // If any of the demographic data is null, show the modal
    document.getElementById('modal').style.display = "block";
  }
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Add event listener for the 'openModalButton'
document.getElementById("openModalButton").onclick = function() {
  document.getElementById('modal').style.display = "block";
};

// Get the brand elements and attach click event listeners
document.querySelectorAll('.brand').forEach(function(brand) {
  brand.addEventListener('click', function() {
    document.getElementById('modal').style.display = "none";
    console.log("Brand selected: " + this.alt);
  });
});

document.getElementById('submit').addEventListener('click', async function() {
  const birthDate = new Date(document.getElementById('age').value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const gender = document.getElementById('gender').value;
  const location = document.getElementById('location').value;

  // Retrieve the user_id from the cookie
  const user_id = getCookie('user_id');

  // Collect selected brands
  const brands = [];
  document.querySelectorAll('input[name="brands"]:checked').forEach((checkbox) => {
      brands.push(checkbox.value);
  });

  if (user_id) {
      // Assuming you have a separate endpoint or logic to handle brands
      await updateUserDemographics(user_id, age, gender, location, brands);
  } else {
      console.error('No user_id found in cookies. Cannot update user demographics.');
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
      const response = await fetch(`http://127.0.0.1:8000/api/v1/user-demo-data/demographics/update/${user_id}/`, {
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
