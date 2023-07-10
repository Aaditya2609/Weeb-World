export function sortPosts(array, value) {
    if (value === 'trending') {
      return array.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
    } else if (value === 'latest') {
      return array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
    } else {
      return array; 
    }
  }
  