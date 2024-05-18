async function fetchUserDemographics(user_id) {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/user-demo-data/demographics/${user_id}/`);
    console.log('fetchUserDemographics response:', response);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const text = await response.text(); // Get the raw response text
    console.log('fetchUserDemographics raw response text:', text);

    const data = JSON.parse(text); // Parse the raw text into JSON
    console.log('fetchUserDemographics data:', data);

    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null; // Return null in case of an error
  }
}



function showModalIfNeeded(userDemographics) {
  console.log('showModalIfNeeded userDemographics:', userDemographics);
  if (!userDemographics || userDemographics.age === null || userDemographics.gender === null || userDemographics.location === null) {
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



async function updateUserDemographics(user_id, age, gender, location, brands) {
  const userUpdateData = {
    user_id,
    age,
    gender,
    location,
    brands // Include the brands array in the data sent to the backend
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