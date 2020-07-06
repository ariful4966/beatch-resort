import React, { Fragment } from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Service from '../components/Service';
import FeatureRooms from '../components/FeatureRooms';
export default function Home(props) {
    return (
        <Fragment>
        
           <Hero>
               <Banner title="Luxurious rooms" subtitle="deluxe rooms starting at $299">
                   <Link to="/rooms" className="btn-primary">our rooms</Link>
               </Banner>
           </Hero>
           <Service></Service>
            <FeatureRooms></FeatureRooms>
        </Fragment>
    )
}
Hero.defaultProps={
    hero:"defaultHero"
};