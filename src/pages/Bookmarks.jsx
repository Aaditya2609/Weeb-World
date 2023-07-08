import React from 'react'
import Nav from '../components/Nav';
import SuggestedUsers from '../components/SuggestedUsers';
import homebackground from "../assets/homebackground.jpg"
import BookmarkFeed from '../components/BookmarkFeed';

function Bookmarks() {
    const divStyle = {
        backgroundImage: `url(${homebackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment:"fixed",
        backgroundPosition: 'center',
        height:"100%",
        margin:"0"
    
      };
      return (
        <div className='flex flex-col-reverse md:flex-row' style={divStyle}>
          
            <Nav/> 
            <BookmarkFeed/>
            <SuggestedUsers/>
        </div>
      )
    
}

export default Bookmarks