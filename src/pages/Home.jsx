import React from 'react'
import Nav from '../components/Nav'
import SuggestedUsers from '../components/SuggestedUsers'
import Feed from '../components/Feed'
import homebackground from "../assets/homebackground.jpg"
import HomeFeed from '../components/HomeFeed'

function Home() {
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
      
        <Nav />
        <HomeFeed />
        <SuggestedUsers/>
    </div>
  )
}

export default Home