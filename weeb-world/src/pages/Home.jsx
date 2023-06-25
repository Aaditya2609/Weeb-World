import React from 'react'
import Nav from '../components/Nav'
import SuggestedUsers from '../components/SuggestedUsers'
import Feed from '../components/Feed'
import homebackground from "../assets/homebackground.jpg"

function Home() {
  const divStyle = {
    backgroundImage: `url(${homebackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment:"fixed",
    backgroundPosition: 'center',

  };
  return (
    <div className='flex' style={divStyle}>
      
        <Nav />
        <Feed/>
        <SuggestedUsers/>
    </div>
  )
}

export default Home