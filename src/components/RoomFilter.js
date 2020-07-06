import React from 'react';
import {
    useContext
} from 'react';
import {
    RoomContext
} from '../context';
import Title from '../components/Title';
const getUnique = (items, value)=>{
    return [...new Set(items.map(item  => item[value]))]
};
export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext);
    const {
        handleChange,
        type,
        maxPrice,
        minPrice,
        price,
        maxSize,
        minSize,
        breakfast,
        pets,
        capacity
    } = context;
    //getUnique type
    let types = getUnique(rooms, "type");
    // get all 
    types = ["all", ...types];
    // type of jsx
    types = types.map((item, index)=>{
    return(
         <option key={index} value={item}>{item}</option>
         )
    })
    let people = getUnique(rooms, "capacity");
    people = people.map((item, index)=>{
        return (
        <option value={item} key={index}>{item}</option>
        )
    })
    return ( 
        <section className="filter-container">
            <Title title="search rooms"></Title>
            <form action="" className="filter-form">
                {/* Select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select 
                    name="type" 
                    id="type" 
                    value={type} 
                    className="form-control"
                    onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* Select type End */}
                {/* Guests Start */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select 
                    name="capacity" 
                    id="capacity" 
                    value={capacity} 
                    className="form-control"
                    onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* Guests end */}
                {/* Room Price Start */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input type="range"
                    name="price" 
                    min={minPrice}
                    max={maxPrice}
                    id="price" value={price}
                    onChange={handleChange}
                    className="form-control"/>
                </div>
                {/* Room Price end */}
                {/* Room size start */}
                <div className="form-group">
                    <label htmlFor="size">Room Size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size" value={minSize} className="size-input" onChange={handleChange}/>
                        <input type="number" name="maxSize" id="size" value={maxSize} className="size-input" onChange={handleChange}/>
                    </div>
                </div>
                {/* Room size end */}
                {/* Room extras start */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* Room extras end*/}
            </form>
        </section>
    )
}