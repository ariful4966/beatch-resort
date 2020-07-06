import React from 'react';
import defaultImg from '../images/room-1.jpeg'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Room = ({room}) => {
    // console.log(room)
    const {name, slug, image, price} = room;
    return (
        <article className="room">
            <div className="img-container">
                <img src={image[0] || defaultImg} alt="Single Room"/>
                <div className="price-top">
                    <h6>${price}</h6>
                    <p>Per Night</p>
                </div>
                <Link to={`/rooms/${slug}`} className="btn-primary room-link">
                    features
                </Link>
            </div>
             <p className="room-info">{name}</p>
        </article>
    );
};


export default Room;

Room.propTypes = {
    room:PropTypes.shape({
        name:PropTypes.string.isRequired,
        slug:PropTypes.string.isRequired,
        image:PropTypes.arrayOf(PropTypes.string).isRequired,
        price:PropTypes.number.isRequired
    })
};