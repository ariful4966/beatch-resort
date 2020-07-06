import React, { Component } from 'react';
import Client from './Contentful';


const RoomContext = React.createContext();

export default class RoomProvider extends Component {
    state = {
        rooms:[],
        sortedRooms:[],
        featureRooms:[],
        loading: true,
        type:"all",
        capacity:1,
        price:0, 
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false,
        
    }
    // getData
    getData = async ()=>{
        try {
            let response = await Client.getEntries({
                content_type:"beatchResort",
                order: '-fields.price'
            });
            let rooms = this.formateData(response.items);
        let featureRooms = rooms.filter(room =>room.featured === true);
        let maxPrice=Math.max(...rooms.map(item=>item.price));
        let maxSize=Math.max(...rooms.map(item=>item.size));
        this.setState({
            rooms,
            featureRooms,
            sortedRooms:rooms,
            loading:false,
            price:maxPrice, 
            maxPrice,
            maxSize
           
        });
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.getData();
    }
    formateData(items){
        let tempItems = items.map(item=>{
            let id = item.sys.id;
            let image = item.fields.images.map(image=>image.fields.file.url);
            let room = {...item.fields,image, id};
            return room
        });
        return tempItems;
    };
    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room; 
    };
    handleChange = event =>{
        const target = event.target
        const value = target.type === 'checkbox'? target.checked:target.value
        const name = event.target.name
       
        this.setState({
            [name]:value
        }, this.filterRooms);
        
    }
    filterRooms = () =>{
       let {
        rooms,
        type,
        capacity,
        price,
        maxSize,
        minSize,
        breakfast,
        pets
    } = this.state;
    // all the rooms
       let tempRooms = [...rooms];
    // transform the value
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by type
       if(type !== 'all'){
         tempRooms = tempRooms.filter(room => room.type === type)
       }
    //filter by capacity
       if(capacity !== 1){
           tempRooms = tempRooms.filter(room => room.capacity >= capacity)
       }
    //filter by price
    tempRooms = tempRooms.filter(room =>room.price <= price)

    //filter by room size
    tempRooms = tempRooms.filter(room=>room.size >= minSize && room.size <= maxSize)

    //filter by breakfast
    if(breakfast){
        tempRooms = tempRooms.filter(room => room.breakfast === true)
    }
    //filter by pets
    if(pets){
        tempRooms = tempRooms.filter(room => room.pets === true)
    }
    // change the State
       this.setState({
           sortedRooms: tempRooms
       })
    }
    render() {
        
        return (
            <RoomContext.Provider value={{ 
                ...this.state,
             getRoom: this.getRoom,
              handleChange:this.handleChange,
               }}>
                {this.props.children} 
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}
export {RoomProvider, RoomConsumer, RoomContext};