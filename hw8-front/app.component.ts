import { Component } from '@angular/core';
import {User} from "./user";
import {RequestService} from "./request.service";
import { FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import addMore from "highcharts/highcharts-more";
import { timer } from 'rxjs';
import {
  trigger,
  transition,
  animate,
  style,
  state
} from "@angular/animations";
addMore(Highcharts)
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/boost');
let windBar = require('highcharts/modules/windbarb');
windBar(Highcharts);
noData(Highcharts);
Boost(Highcharts);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("one", [
      // Note the trigger name
      transition(":enter", [
        // :enter is alias to 'void => *'
        style({ transform: 'translateX(-100%)' }),
        animate(300, style({ transform: 'translateX(-50%)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateX(0%)' }),
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger("two", [
      // Note the trigger name
      transition(":enter", [
        // :enter is alias to 'void => *'
        style({ transform: 'translateX(100%)' }),
        animate(300, style({ transform: 'translateX(0%)' }))
      ]),
      transition(":leave", [
        // :leave is alias to '* => void'
        style({ transform: 'translateX(0%)' }),
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class AppComponent {
  show_one = true;
  show_two = false;
  error_block = false;
  sta: any;
  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  twitterHashtags = "CSCI571WeatherSearch";
  tmp_time: any;
  nexttmp: any;
  lat: any;
  lng: any;
  auto_city: any;
  auto_state: any;
  data_chartOne: Array<any> = [];
  temp: Array<any> = [];
  un_line = false;
  count = false;
  ip_two: any;
  fav_detail = false;
  fav_tweet_city: any;
  fav_tweet_state: any;
  title = "hw8";
  num: any;
  fav_city: Array<any> = [];
  fav_state: Array<any> = [];
  hasNoData = true;
  star_fill = false;
  tab_one = true;
  tab_two = false;
  tab_three = false;
  res_fav = true;
  IPData: any;
  bec_dark = false;
  IPData_two: any;
  loc: string = '';
  isdisabled = false;
  dataProcess = false;
  smallTitle = false;
  firstTag = false;
  secondTag = false;
  third_Tag = false;
  detailPane = false;
  chooseDay: any;
  res: any;
  tem_max: any = {};
  tem_min: any = {};
  weather_status: any = {};
  weather_img: any = {};
  current_date: any = {};
  week_day: any = {};
  wind_speed: any = {};
  tem_apparent: any = {};
  sun_rise: any = {};
  sun_set: any = {};
  humidity: any = {};
  hourly_info: any = {};

  humidity_two: Array<any> = [];
  pressure_two: Array<any> = [];
  tem_two: Array<any> = [];
  wind_two: Array<any> = [];
  hourly_data: any = {};
  hourly_container: any;
  options: any;
  options_one: any;

  visibility: any = {};
  cloud_cover: any = {};
  autoData: any;
  dict_weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  dict_month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  dict_status: Record<string, string> = {
    "4201": "Heavy Rain",
    "4001": "Rain",
    "4200": "Light Rain",
    "6201": "Heavy Freezing Rain",
    "6001": "Freezing Rain",
    "6200": "Light Freezing Rain",
    "6000": "Freezing Drizzle",
    "4000": "Drizzle",
    "7101": "Heavy Ice Pellets",
    "7000": "Ice Pellets",
    "7102": "Light Ice Pellets",
    "5101": "Heavy Snow",
    "5000": "Snow",
    "5100": "Light Snow",
    "5001": "Flurries",
    "8000": "Thunderstorm",
    "2100": "Light Fog",
    "2000": "Fog",
    "1001": "Cloudy",
    "1102": "Mostly Cloudy",
    "1101": "Partly Cloudy",
    "1100": "Mostly Clear",
    "1000": "Clear",
    '3000': 'Light Wind',
    "3001": "Wind",
    "3002": "Strong Wind",
    "0": 'Unknown'
  }
  dict_link: Record<string, string> = {
    "0": "",
    "3000": "../assets/image/light_wind.svg",
    "3001": "../assets/image/wind.svg",
    "3002": "../assets/image/strong_wind.svg",
    "4201": "../assets/image/rain_heavy.svg",
    "4001": "../assets/image/rain.svg",
    "4200": "../assets/image/rain_light.svg",
    "6201": "../assets/image/freezing_rain_heavy.svg",
    "6001": "../assets/image/freezing_rain.svg",
    "6200": "../assets/image/freezing_rain_light.svg",
    "6000": "../assets/image/freezing_drizzle.svg",
    "4000": "../assets/image/drizzle.svg",
    "7101": "../assets/image/ice_pellets_heavy.svg",
    "7000": "../assets/image/ice_pellets.svg",
    "7102": "../assets/image/ice_pellets_light.svg",
    "5101": "../assets/image/snow_heavy.svg",
    "5000": "../assets/image/snow.svg",
    "5100": "../assets/image/snow_light.svg",
    "5001": "../assets/image/flurries.svg",
    "8000": "../assets/image/tstorm.svg",
    "2100": "../assets/image/fog_light.svg",
    "2000": "../assets/image/fog.svg",
    "1001": "../assets/image/cloudy.svg",
    "1102": "../assets/image/mostly_cloudy.svg",
    "1101": "../assets/image/partly_cloudy_day.svg",
    "1100": "../assets/image/mostly_clear_day.svg",
    "1000": "../assets/image/clear_day.svg"
  }

  userModel = new User('', '', '');

  constructor(private IPservice: RequestService) {
  }

  onChange(e: any){
    if(e.target.checked){
      this.isdisabled = true;
    }
    else{
      this.isdisabled = false;
    }

  }

  onSubmit(){
    this.tab_one = true;
    this.tab_two = false;
    this.tab_three = false;
    console.log(typeof this.chooseDay)
    const check = document.getElementById("gridCheck") as HTMLInputElement;
    this.res_fav = true;
    // const bar = document.getElementById("progress_bar") as HTMLInputElement;
    if (check.checked) {
      this.IPservice.getIP().subscribe(data => {
        this.IPData = data;
        this.loc = this.IPData.loc;
        this.lat = parseInt(this.loc.split(',')[0]);
        this.lng = parseInt(this.loc.split(',')[1]);
        //console.log(this.IPData);
        this.userModel.city = this.IPData.city;
        this.userModel.state = this.IPData.region;
        this.auto_city = this.IPData.city;
        this.auto_state = this.IPData.region;
        this.dataProcess = true;
        this.handleData(this.loc);
      },
        error => {
        this.error_block = true;
        })
    }
    else{
      this.IPservice.getIPFromAddress(this.userModel).subscribe(results => {
        this.IPData_two = results;
        console.log(this.IPData_two.results[0].geometry.location);
        this.loc = this.IPData_two.results[0].geometry.location.lat + ',' + this.IPData_two.results[0].geometry.location.lng;
        this.lat = this.IPData_two.results[0].geometry.location.lat;
        this.lng = this.IPData_two.results[0].geometry.location.lng;
        //console.log(this.loc_two);
        this.dataProcess = true;
        this.handleData(this.loc)
      },
        error => {
        this.error_block = true;
        })
    }
  }

  handleData(location: string){
    this.IPservice.getDataFromTomorrow(location).subscribe(response => {
      console.log(response);
      this.res = response;
      //console.log(this.res);
      for (let i = 0; i < 15; i++) {
        this.temp = [];
        this.tem_max[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['temperatureMax'];
        this.tem_max[i] = (this.tem_max[i] * 1.8 + 32).toFixed(2);
        this.tem_min[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['temperatureMin'];
        this.tem_min[i] = (this.tem_min[i] * 1.8 + 32).toFixed(2);
        this.current_date[i] = (this.res['data']['timelines'][0]['intervals'][i]['startTime']).substring(0,10);
        let day = new Date(this.current_date[i]);
        let time_stamp = day.getTime();
        this.temp.push(time_stamp);
        this.temp.push(parseInt(this.tem_min[i]));
        this.temp.push(parseInt(this.tem_max[i]));
        this.data_chartOne[i] = this.temp;
        //this.data_chartOne.push(this.temp);
        //console.log(this.data_chartOne)
        this.week_day[i] = this.dict_weekday[(day.getDay() + 1)%7];
        this.current_date[i] = this.week_day[i] + ',' + parseInt(this.current_date[i].substring(8,10)) + ' ' + this.dict_month[parseInt(this.current_date[i].substring(5,7))] + ' ' + parseInt(this.current_date[i].substring(0,4));
        this.wind_speed[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['windSpeed'];
        this.weather_status[i] = this.dict_status[this.res['data']['timelines'][0]['intervals'][i]['values']['weatherCode']];
        this.weather_img[i] = this.dict_link[this.res['data']['timelines'][0]['intervals'][i]['values']['weatherCode']];
        this.tem_apparent[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['temperatureApparent'];
        this.tem_apparent[i] = (this.tem_apparent[i] * 1.8 + 32).toFixed(2);
        this.sun_rise[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['sunriseTime'].substring(11,19);
        this.sun_set[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['sunsetTime'].substring(11,19);
        this.humidity[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['humidity'];
        this.visibility[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['visibility'];
        this.cloud_cover[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['cloudCover'];
      }
      // console.log(this.data_chartOne);
      // console.log(this.useData)
      this.dataProcess = false;
      this.smallTitle = true;
      this.firstTag = true;
    },
      error => {
      this.error_block = true;
      })
  }

  autoComplete(e: any){
    let input = e.target.value;
    //console.log(input.length);
    if(input.length >= 2){
      this.IPservice.getAutoComplete(input).subscribe(response => {
        this.autoData = response;
        console.log(this.autoData)
        this.autoData = [this.autoData.predictions[0].terms[0].value, this.autoData.predictions[1].terms[0].value, this.autoData.predictions[2].terms[0].value, this.autoData.predictions[3].terms[0].value, this.autoData.predictions[4].terms[0].value];
        this.sta = this.autoData.map(function (state: string){
          return {
            value: state,
            display: state
          };
        })
        //console.log(this.sta);
      })
    }
  }

  one(){
    this.tab_one = true;
    this.tab_two = false;
    this.tab_three = false;
    this.firstTag = true;
    this.secondTag = false;
    this.third_Tag = false;
  }
  two(){
    this.secondTag = true;
    this.tab_one = false;
    this.tab_two = true;
    this.tab_three = false;
    this.firstTag = false;
    this.third_Tag = false;
  }
  three(){
    this.tab_one = false;
    this.tab_two = false;
    this.tab_three = true;
    this.firstTag = false;
    this.secondTag = false;
    this.third_Tag = true;
    this.humidity_two = [];
    this.pressure_two = [];
    this.tem_two = [];
    this.wind_two = [];
    this.hourly_data = {};
    //console.log(this.loc);
    this.IPservice.getCurrentInfo(this.loc).subscribe(response => {
      this.hourly_info = response;
      this.hourly_info = this.hourly_info['data']['timelines'][0]['intervals'];
      //console.log(this.hourly_info[0]['startTime']);
      for (let i = 0; i < this.hourly_info.length; i++) {
        if (i == this.hourly_info.length-1) {
          break;
        }

        this.tmp_time = this.hourly_info[i]['startTime'].substring(0,19);
        let d1 = new Date(this.tmp_time);
        this.tmp_time = d1.getTime();

        this.nexttmp = this.hourly_info[i+1]['startTime'].substring(0,19);
        let d2 = new Date(this.nexttmp);
        this.nexttmp = d2.getTime();
        // console.log(this.tmp_time)
        // console.log(this.nexttmp)

        this.humidity_two.push({'x': this.tmp_time, 'y': this.hourly_info[i]['values']['humidity']});
        this.wind_two.push({'x': this.tmp_time, 'value': this.hourly_info[i]['values']['windSpeed'], 'direction': this.hourly_info[i]['values']['windDirection']});
        this.tem_two.push({'x': this.tmp_time, 'y': Math.round(this.hourly_info[i]['values']['temperature']), 'to': this.nexttmp});
        this.pressure_two.push({'x': this.tmp_time, 'y': this.hourly_info[i]['values']['pressureSeaLevel']});
      }

      this.hourly_data['humidity'] = this.humidity_two;
      this.hourly_data['wind'] = this.wind_two;
      this.hourly_data['temperature'] = this.tem_two;
      this.hourly_data['pressure'] = this.pressure_two;
      this.hourly_container = "chart_two";
      //console.log(this.hourly_data)

      let humiditys = this.hourly_data['humidity'];
      let temperatures = this.hourly_data['temperature'];
      let winds = this.hourly_data['wind'];
      let pressures = this.hourly_data['pressure'];
      this.options = {
        chart: {
          renderTo: this.hourly_container,
          marginBottom: 70,
          marginRight: 40,
          marginTop: 50,
          plotBorderWidth: 1,
          height: 500,
          alignTicks: false,
          scrollablePlotArea: {
            minWidth: 720
          }
        },

        title: {
          text: 'Hourly Weather (For Next 5 Days)',
          align: 'center',
          style: {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }
        },

        tooltip: {
          shared: true,
          useHTML: true,
          headerFormat:
            '<small>{point.x:%A, %b %e, %H:%M} - {point.point.to:%H:%M}</small><br>' +
            '<b>{point.point.symbolName}</b><br>'

        },

        xAxis: [{ // Bottom X axis
          type: 'datetime',
          tickInterval: 2 * 36e5, // two hours
          minorTickInterval: 36e5, // one hour
          tickLength: 0,
          gridLineWidth: 1,
          gridLineColor: 'rgba(128, 128, 128, 0.1)',
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          offset: 30,
          showLastLabel: true,
          labels: {
            format: '{value:%H}'
          },
          crosshair: true
        }, { // Top X axis
          linkedTo: 0,
          type: 'datetime',
          tickInterval: 24 * 3600 * 1000,
          labels: {
            format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
            align: 'left',
            x: 3,
            y: -5
          },
          opposite: true,
          tickLength: 20,
          gridLineWidth: 1
        }],

        yAxis: [{ // temperature axis
          title: {
            text: null
          },
          labels: {
            format: '{value}°',
            style: {
              fontSize: '10px'
            },
            x: -3
          },
          plotLines: [{ // zero plane
            value: 0,
            color: '#BBBBBB',
            width: 1,
            zIndex: 2
          }],
          maxPadding: 0.3,
          minRange: 8,
          tickInterval: 1,
          gridLineColor: 'rgba(128, 128, 128, 0.1)'

        }, { // precipitation axis
          title: {
            text: null
          },
          labels: {
            enabled: false
          },
          gridLineWidth: 0,
          tickLength: 0,
          minRange: 10,
          min: 0

        }, { // Air pressure
          allowDecimals: false,
          title: { // Title on top of axis
            text: 'inHg',
            offset: 0,
            align: 'high',
            rotation: 0,
            style: {
              fontSize: '10px',
              color: 'rgb(249,187,74)'//Highcharts.getOptions().colors[3]
            },
            textAlign: 'left',
            x: 3
          },
          labels: {
            style: {
              fontSize: '8px',
              color: 'rgb(249,187,74)'//Highcharts.getOptions().colors[2]
            },
            y: 2,
            x: 3
          },
          gridLineWidth: 0,
          opposite: true,
          showLastLabel: false
        }],

        legend: {
          enabled: false
        },

        plotOptions: {
          series: {
            pointPlacement: 'between'
          }
        },


        series: [{
          name: 'Temperature',
          data: temperatures,
          type: 'spline',
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true
              }
            }
          },
          tooltip: {
            valueSuffix: ' °F'
          },
          // tooltip: {
          //   pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
          //     '{series.name}: <b>{point.value}°F</b><br/>'
          // },
          zIndex: 1,
          color: 'rgb(250,50,50)',
          negativeColor: '#48AFE8'
        },  {
          name: 'Humidity',
          data: humiditys,
          type: 'column',
          color: '#68CFE8',
          yAxis: 1,
          groupPadding: 0,
          pointPadding: 0,
          grouping: false,
          dataLabels: {
            enabled: true,
            filter: {
              operator: '>',
              property: 'y',
              value: 0
            },
            style: {
              fontSize: '8px',
              color: 'gray'
            }
          },
          tooltip: {
            valueSuffix: ' %'
          }
        }, {
          name: 'Air pressure',
          color: 'rgb(250,168,18)',//Highcharts.getOptions().colors[3],
          data: pressures,
          marker: {
            enabled: false
          },
          shadow: false,
          tooltip: {
            valueSuffix: ' inHg'
          },
          dashStyle: 'shortdot',
          yAxis: 2
        }, {
          name: 'Wind',
          type: 'windbarb',
          id: 'windbarbs',
          color: 'rgb(250,50,50)',//Highcharts.getOptions().colors[1],
          lineWidth: 1.5,
          data: winds,
          vectorLength: 18,
          yOffset: -15,
          tooltip: {
            valueSuffix: ' mph'
          }
        }]
      };

      new Highcharts.Chart('chart_two', this.options);
    })
  }

  showDay(num: number){
    this.count = true;
    this.un_line = true;
    this.chooseDay = num;
    this.smallTitle = false;
    this.firstTag = false;
    this.detailPane = true;
    this.show_one = !this.show_one;
    timer(300).subscribe(x => {
      this.show_two = !this.show_two;
    });
  }

  clear(){
    const check = document.getElementById("gridCheck") as HTMLInputElement;
    this.userModel.city = '';
    this.userModel.street = '';
    this.userModel.state = 'California'

    if(check.checked){
      this.isdisabled = false;
      check.checked = false;
    }
    this.error_block = false;
    this.temp = [];
    this.data_chartOne = [];
    this.hourly_data = {};
    this.humidity_two = [];
    this.pressure_two = [];
    this.tem_two = [];
    this.wind_two = [];
    this.show_one = true;
    this.show_two = false;
    this.dataProcess = false;
    this.smallTitle = false;
    this.firstTag = false;
    this.secondTag = false;
    this.third_Tag = false;
    this.detailPane = false;
    this.tab_one = true;
    this.tab_two = false;
    this.tab_three = false;
    this.res_fav = true;
    this.star_fill = false;
    this.fav_detail = false;
    this.count = false;
  }
  addOrMoveFav(){
    console.log(this.star_fill)
    if(this.star_fill){
      this.star_fill = false;
      localStorage.removeItem(this.userModel.city);
      this.fav_city = [];
      this.fav_state = [];
      // this.res_fav = true;
      // this.tab_one = true;
      // this.tab_two = false;
      // this.tab_three = false;
      // this.smallTitle = true;
      // this.firstTag = true;
      this.detailPane = false;
      this.fav_detail = false;
      this.num = localStorage.length;
      console.log(this.num)
      //console.log(this.fav_city)
      //console.log(this.fav_state)
      if (this.num > 0) {
        for (let i = 0; i < this.num; i++) {
          this.fav_city[i] = localStorage.key(i);
          this.fav_state[i] = localStorage.getItem(this.fav_city[i]);
        }
        this.hasNoData = false;
      }
      else{
        this.hasNoData = true;
      }
    }
    else {
      this.star_fill = true;
      //console.log(this.userModel.city)
      //console.log(this.userModel.state)
      localStorage.setItem(this.userModel.city, this.userModel.state);
    }
    console.log(this.star_fill)
  }
  moveFav(index: number){
    this.star_fill = false;
    localStorage.removeItem(this.fav_city[index]);
    this.fav_city = [];
    this.fav_state = [];
    this.changeToFavorite();
  }
  changeToFavorite(){
    this.res_fav = false;
    this.smallTitle = false;
    this.firstTag = false;
    this.secondTag = false;
    this.third_Tag = false;
    this.detailPane = false;
    this.fav_detail = false;
    this.num = localStorage.length;
    //console.log(this.num)
    //console.log(this.fav_city)
    //console.log(this.fav_state)
    if (this.num > 0) {
      for (let i = 0; i < this.num; i++) {
        this.fav_city[i] = localStorage.key(i);
        this.fav_state[i] = localStorage.getItem(this.fav_city[i]);
      }
      this.hasNoData = false;
    }
    else{
      this.hasNoData = true;
    }
    // console.log(this.fav_city)
    // console.log(this.fav_state)
  }
  changeToResult(){
    const submit = document.getElementById("submit") as HTMLInputElement;
    this.res_fav = true;
    this.tab_one = true;
    this.tab_two = false;
    this.tab_three = false;
    if(submit.disabled){
      this.smallTitle = false;
      this.firstTag = false;
      this.detailPane = false;
    }
    else{
      this.smallTitle = true;
      this.firstTag = true;
    }
  }
  toDetail(){
    if (this.count) {
      this.detailPane = true;
      this.firstTag = false;
      this.smallTitle = false;
      this.show_one = !this.show_one;
      timer(300).subscribe(x => {
        this.show_two = !this.show_two;
      });
    }
  }
  toList(){
    this.detailPane = false;
    this.firstTag = true;
    this.smallTitle = true;
    this.bec_dark = false;
    this.show_two = !this.show_two;
    timer(300).subscribe(x => {
      this.show_one = !this.show_one;
    });
  }

  dark(){
    this.bec_dark = true;
  }
  noDark(){
    this.bec_dark = false;
  }

  showDetailPane(city: string, state: string){
    this.fav_tweet_city = city;
    this.fav_tweet_state = state;
    this.IPservice.getFromCityState(city, state).subscribe(result => {
      this.ip_two = result;
      this.loc = this.ip_two.results[0].geometry.location.lat + ',' + this.ip_two.results[0].geometry.location.lng;
      this.lat = this.ip_two.results[0].geometry.location.lat;
      this.lng = this.ip_two.results[0].geometry.location.lng;
      this.IPservice.getDataFromTomorrow(this.loc).subscribe( response => {
        this.res = response;
        this.userModel.city = city;
        this.userModel.state = state;
          //console.log(this.res);
        for (let i = 0; i < 15; i++) {
          this.temp = [];
          this.tem_max[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['temperatureMax'];
          this.tem_max[i] = (this.tem_max[i] * 1.8 + 32).toFixed(2);
          this.tem_min[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['temperatureMin'];
          this.tem_min[i] = (this.tem_min[i] * 1.8 + 32).toFixed(2);
          this.current_date[i] = (this.res['data']['timelines'][0]['intervals'][i]['startTime']).substring(0,10);
          let day = new Date(this.current_date[i]);
          let time_stamp = day.getTime();
          this.temp.push(time_stamp);
          this.temp.push(parseInt(this.tem_min[i]));
          this.temp.push(parseInt(this.tem_max[i]));
          this.data_chartOne[i] = this.temp;
          //this.data_chartOne.push(this.temp);
          this.week_day[i] = this.dict_weekday[(day.getDay() + 1)%7];
          this.current_date[i] = this.week_day[i] + ',' + parseInt(this.current_date[i].substring(8,10)) + ' ' + this.dict_month[parseInt(this.current_date[i].substring(5,7))] + ' ' + parseInt(this.current_date[i].substring(0,4));
          this.wind_speed[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['windSpeed'];
          this.weather_status[i] = this.dict_status[this.res['data']['timelines'][0]['intervals'][i]['values']['weatherCode']];
          this.weather_img[i] = this.dict_link[this.res['data']['timelines'][0]['intervals'][i]['values']['weatherCode']];
          this.tem_apparent[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['temperatureApparent'];
          this.tem_apparent[i] = (this.tem_apparent[i] * 1.8 + 32).toFixed(2);
          this.sun_rise[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['sunriseTime'].substring(11,19);
          this.sun_set[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['sunsetTime'].substring(11,19);
          this.humidity[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['humidity'];
          this.visibility[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['visibility'];
          this.cloud_cover[i] = this.res['data']['timelines'][0]['intervals'][i]['values']['cloudCover'];
        }
        console.log(this.data_chartOne);
        this.chooseDay = 0;
        this.un_line = true;
        //console.log(this.current_date);
        const submit = document.getElementById("submit") as HTMLInputElement;
        this.dataProcess = false;
        this.smallTitle = false;
        this.firstTag = false;
        this.secondTag = false;
        this.third_Tag = false;
        this.detailPane = true;
        this.show_two = true;
        this.show_one = false;
      })
      this.res_fav = true;
    })
  }


  chartOptions: Highcharts.Options = {
    chart: {
      type: 'arearange',
      zoomType: 'x',
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1
      }
    },
    title: {
      text: 'Temperature Ranges(Min, Max)'
    },
    xAxis: {
      crosshair: true,
      type: 'datetime',
      tickInterval:  24 * 3600 * 1000,
      labels: {
        format: '{value: %e %b}'
      },
    },
    yAxis: {
      crosshair: true,
      title: {
        text: null
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: '°C',
      xDateFormat: '%A, %b %e'
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      arearange: {
        fillColor:{
          linearGradient: { x1: 100, x2: 180, y1: 100, y2: 0 },
          //linearGradient: [100, 200, 100, 0],
          stops: [
            [0, '#dbebfa'],
            [1, '#ffa600']
          ]
        },
        lineColor:'#ffba00',
        fillOpacity: 0.2
      }
    },
    series: [{
      name: 'Temperatures',
      data: this.data_chartOne,
      type: 'arearange',
      marker: { fillColor: '#88b0f1' }
    }]
  };

}
