export const addLocation = (location) => {
  return {
    type: "ADD_LOCATION",
    location
  }
};

export const removeLocation = (id) => {
  return {
    type: "REMOVE_LOCATION",
    id
  }
};

export const updateLocation = (updates) => {
  return {
    type: "UPDATE_LOCATION",
    updates
  }
};

export const setSelectedLocation = (id) => {
  return {
    type: "SET_SELECTED_LOCATION",
    id
  }
};