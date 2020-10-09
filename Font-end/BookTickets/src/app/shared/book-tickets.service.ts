import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookTicketsService {

  constructor() { }

  select_route = {
    departure: "",
    destination: "",
    daygo:"",
    returnday:"",
    isOneWay:true,
  }

  select_seat = {
    time: "",
    boarding_point: "",
    seats:[],
    number:0,
    total_money:0,
  }

  fill_infor = {
    name:'',
    phone:'',
    email:'',
    city:'',
    district:'',
    isPolicy:''
  }

  list_departure = ['Đà Nẵng', 'TP Hồ Chí Minh', 'Bình Thuận', 'Ninh Hòa']
  list_times = {
    sang:{
      0:'08:00',
      1:'10:00'
    },
    chieu:{
      0:'16:00',
      1:'17:00'
    },
    toi:{
      0:'19:00',
      1:'20:00'
    }
  }

  list_boarding_point = ['Khu vực A', 'Khu vực B', 'Khu vực C']

  schedule = [
    {time:'0:00',city:'Vĩnh Long',address:'Trạm 1 Trạm 1 Trạm 1 Trạm 1 Trạm 1 Trạm 1 Trạm 1'},
    {time:'0:10',city:'Bình Minh',address:'Trạm 2 Trạm 2 Trạm 2 Trạm 2 Trạm 2 Trạm 2 Trạm 2'},
    {time:'2:30',city:'Song Phú',address:'Trạm 3 Trạm 3 Trạm 3 Trạm 3 Trạm 3 Trạm 3 Trạm 3'},
    {time:'0:45',city:'Bến Xe Miền Tây',address:'Trạm 4 Trạm 4 Trạm 4 Trạm 4 Trạm 4 Trạm 4 Trạm 4'},
  ]



  city_go = ['Hà Nội', 'Đà Nẵng', 'Phú Yên', 'TP Hồ Chí Minh']

  city_arrived = [
    {city:'Hà Nội',
      TP:[{name:'Đà Nẵng',range:'200KM', time:'3h'}, {name:'Phú Yên',range:'500KM', time:'5h'}, {name:'TP Hồ Chí Minh',range:'1000KM', time:'12h'}]
    },
    {city:'Đà Nẵng',
    TP:[{name:'Hà Nội',range:'200KM', time:'3h'}, {name:'Phú Yên',range:'500KM', time:'5h'}, {name:'TP Hồ Chí Minh',range:'1000KM', time:'12h'}]
    },
    {city:'Phú Yên',
    TP:[{name:'Đà Nẵng',range:'200KM', time:'3h'}, {name:'Hà Nội',range:'500KM', time:'5h'}, {name:'TP Hồ Chí Minh',range:'1000KM', time:'12h'}]
  },
    {city:'TP Hồ Chí Minh',
    TP:[{name:'Đà Nẵng',range:'200KM', time:'3h'}, {name:'Phú Yên',range:'500KM', time:'5h'}, {name:'Hà Nội',range:'1000KM', time:'12h'}]
  },
  ]

  list_vehical = [
    {id:'XS1',time:'8:00'},
    {id:'XS2',time:'17:00'}
  ]

  //ghế
  seat = [
    {"name":"A01", "status":1},
    {"name":"A02", "status":1},
    {"name":"A03", "status":1},
    {"name":"A04", "status":1},
    {"name":"A05", "status":0},
    {"name":"A06", "status":0},
    {"name":"A07", "status":1},
    {"name":"A08", "status":1},
    {"name":"A09", "status":0},
    {"name":"A10", "status":1},
    {"name":"A11", "status":0},
    {"name":"A12", "status":1},
    {"name":"A13", "status":0},
    {"name":"A14", "status":1},
    {"name":"A15", "status":1},
    {"name":"A16", "status":0},
    {"name":"A17", "status":1},
    {"name":"A18", "status":1},
    {"name":"A19", "status":0},
    {"name":"A20", "status":1},
    {"name":"A21", "status":1},
    {"name":"A22", "status":0},
    {"name":"B01", "status":1},
    {"name":"B02", "status":1},
    {"name":"B03", "status":1},
    {"name":"B04", "status":1},
    {"name":"B05", "status":0},
    {"name":"B06", "status":0},
    {"name":"B07", "status":1},
    {"name":"B08", "status":1},
    {"name":"B09", "status":0},
    {"name":"B10", "status":1},
    {"name":"B11", "status":0},
    {"name":"B12", "status":1},
    {"name":"B13", "status":0},
    {"name":"B14", "status":1},
    {"name":"B15", "status":1},
    {"name":"B16", "status":0},
    {"name":"B17", "status":1},
    {"name":"B18", "status":1},
    {"name":"B19", "status":0},
    {"name":"B20", "status":0},
    {"name":"B21", "status":0},
    {"name":"B22", "status":0},
  ]


  getListAdd(){
    this.select_route.departure = this.city_go[0]
    var today = new Date();
    this.select_route.daygo = today.getFullYear()+ '-' + ('0' + (today.getMonth() + 1)).slice(-2)  + '-' + ('0' + today.getDate()).slice(-2);
    return this.city_go
  }

  getListAdd_A(item:any){
    for(let i of this.city_arrived){
      if(i.city == item){
        this.select_route.destination = i.TP[0].name
        return i.TP
      }
    }

  }


  getListTimes(item:any){
    this.select_seat.time = this.list_times['sang'][0]
    return this.list_times
  }

  getListPoints(item:any){
    this.select_seat.boarding_point = this.list_boarding_point[0]
    return this.list_boarding_point
  }

  getSchedule(item:any){
    return this.schedule
  }
  
}
