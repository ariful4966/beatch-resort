import React, { Component } from 'react'
import Title from './Title'
import { RoomContext } from '../context';
import Room from './Room';


export default class FeatureRooms extends Component {
    static contextType = RoomContext;
    render() {
     let { loading, featureRooms : rooms} = this.context;
       rooms = rooms.map(room=>{
            return <Room key={room.id} room={room}/>
        })

       
        return (
            <section className="featured-rooms">
               <Title title="feature Room"></Title>
                 <div className="featured-rooms-center">
                     {
                         loading?<loading/>:rooms
                     }
                 </div>
            </section>
        )
    }
}
