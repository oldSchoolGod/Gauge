import { LightningElement,track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chartJs';

const percentage = 0;
const generateRandomNumber = () => {
    return Math.round(percentage);
};

export default class LibsChartjs extends LightningElement {
    error;
    chart;
    config
    chartjsInitialized = false;
    percentage1=5;
    percentage2=100 - this.percentage1;

    @track changeColor;


changeColor = () => {
    if(this.percentage1 <= 30){
        this.config = {
            type: 'doughnut',
           
            data: {
                datasets: [
                    {
                        data: [
                            this.percentage2,
                            this.percentage1
                           
                        ],
                        
                        backgroundColor: [
                            
                            'rgb(255, 255, 255)',
                            'rgb(255, 0, 0)'
                            
                        ],
                        label: 'Dataset 1'
                    }
                ],
              
               
            },
            options: {
                responsive: false,
            
              
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
    }

    if(this.percentage1 > 30 && this.percentage1 <= 60 ){
        this.config = {
            type: 'doughnut',
           
            data: {
                datasets: [
                    {
                        data: [
                            this.percentage2,
                            this.percentage1
                        ],
                        
                        backgroundColor: [
                            'rgb(255, 255, 255)',
                            'rgb(255,255,0)'
                            
                        ],
                        label: 'Dataset 1'
                    }
                ],
              
               
            },
            options: {
                responsive: false,
            
              
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
    }

    if(this.percentage1 > 60 && this.percentage1 <=100 ){
        this.config = {
            type: 'doughnut',
           
            data: {
                datasets: [
                    {
                        data: [
                            this.percentage2,
                            this.percentage1
                        ],
                        
                        backgroundColor: [
                            'rgb(255, 255, 255)',
                            'rgb(75, 192, 192)'
                            
                        ],
                        label: 'Dataset 1'
                    }
                ],
              
               
            },
            options: {
                responsive: false,
            
              
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        };
    }
}


   /* config = {
        type: 'doughnut',
       
        data: {
            datasets: [
                {
                    data: [
                        generateRandomNumber(),
                        this.percentage1
                       
                    ],
                    
                    backgroundColor: [
                        
                        'rgb(255, 255, 255)',
                        'rgb(75, 192, 192)'
                        
                    ],
                    label: 'Dataset 1'
                }
            ],
          
           
        },
        options: {
            responsive: false,
        
          
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };*/

    renderedCallback() {

        this.changeColor();
        if (this.chartjsInitialized) {
            return;
        }
        this.chartjsInitialized = true;

        loadScript(this, chartjs)
            .then(() => {
               
                
                const canvas = document.createElement('canvas');
                canvas.setAttribute('style','position:relative; top: -41px; width: 67px; height: 67px; color: black; left: -20px;');
                
              
                this.template.querySelector('div.chart').appendChild(canvas);
                const ctx = canvas.getContext('2d');
               

                
                this.chart = new window.Chart(ctx, this.config);
            })
            .catch((error) => {
                this.error = error;
            });
    }
}