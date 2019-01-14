export default (locations, id) => { // return selected location from id provided from search list or locations list
  if(!!id){
    return locations.find(location => location.id === id);
  }else {
    return locations[0];
  }
};