export const getStarClass = (rating, starIndex) => {
  if (!rating) return 'far fa-star';
  
  if (rating >= starIndex) {
    return 'fas fa-star';
  } else if (rating >= starIndex - 0.5) {
    return 'fas fa-star-half-alt';
  } else {
    return 'far fa-star';
  }
};