import React, {Component} from 'react';
import axios from 'axios';
import {Pie, Line} from 'react-chartjs-2';

export default class Data extends Component{
/* Définition d'un constructeur avec toutes les variables nécessaire pour le stockage et l'affichage d'informations importante*/

  constructor(props){
    super(props);
    this.state = {
      /* Informations utile est necessaires pour l'affichage des graphiques avec chart.js*/
      chartDataGenre:{
        labels: '',
        datasets:[
          {
            label:'Genres',
            data:[],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(0, 159, 64, 0.6)',
              'rgba(255, 99, 0, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(0, 159, 64, 0.6)',
              'rgba(255, 99, 0, 0.6)',
              'rgba(0, 0, 0, 0.6)'
            ]
          }
        ]
      },
      chartDataMovieyear:{

        labels: '',
        datasets:[
          {
            label:'Nombre de films',
            data:[],
            backgroundColor:[
              'rgba(54, 162, 235, 0.6)'
              
            ]
          }
        ]
      },
      chartDataGender:{

        labels: '',
        datasets:[
          {
            label:'Nombre de films',
            data:[],
            backgroundColor:[
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 0, 0, 0.6)'
            ]
          }
        ]
      }
    }
  }
/* Fonction qui se lance dès le début du chargement. Elle appelle les APIs voulu pour y chercher les informations désiré */

  componentDidMount(){ 
    var labels1=[];
    var data1=[]

    axios.get('http://localhost:5000/data/genre')
        .then(response=>{     
          for(var i=0;i<response.data.length;i++)
          {
            labels1.push(response.data[i]._id);
            data1.push(Number(response.data[i].tot))
          }
          var chartData1 = this.state.chartDataGenre;
          chartData1.labels = labels1;
          chartData1.datasets[0].data=data1;
          this.setState({chartDataGenre: chartData1});
        })
    axios.get('http://localhost:5000/data/movieyear')
        .then(response=>{
          var labels2=[];
          var data2=[];
          for(var i=0;i<response.data.length;i++)
          {
            labels2.push(response.data[i]._id);
            data2.push(Number(response.data[i].tot));
          }
          var chartData2 = this.state.chartDataMovieyear;
          chartData2.labels = labels2;
          chartData2.datasets[0].data=data2;
          this.setState({chartDataMovieyear: chartData2});
        })
    axios.get('http://localhost:5000/data/gender')        
        .then(response=>{
          var labels3=[];
          var data3=[];
          for(var i=0;i<response.data.length;i++)
          {
            labels3.push(response.data[i]._id);
            data3.push(Number(response.data[i].tot));
          }
          var chartData3 = this.state.chartDataGender;
          chartData3.labels = labels3;
          chartData3.datasets[0].data=data3;
          this.setState({chartDataGender: chartData3});
        })
}
  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }




  render(){
    return (
      <div className="chart">
        <Pie 
         width='10'
          height='5'
          data={this.state.chartDataGenre}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Différentes proportions de genres dans les films',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        <br/>
        <br/>
        <Line 
         width='10'
          height='4'
          data={this.state.chartDataMovieyear}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Nombre de films sortis par année',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        <br/>
        <br/><Pie 
         width='10'
          height='4'
          data={this.state.chartDataGender}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Répartition Homme/Femme chez les acteurs',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        <br/>
        <br/>
      </div>
    )
  }
}
