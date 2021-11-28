import axios from './axios';
import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { BarChart } from "react-native-chart-kit";
import Colors from '../../Helper/Colors';

const data =
{
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};
const screenWidth = Dimensions.get("window").width
const chartLabels=[]
const chartData=[]
const chartConfig =
{
    backgroundGradientFrom: Colors.primary,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: Colors.primary,
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.6,
    useShadowColorFromDataset: false// optional
};
export default class Chart extends Component {
    props = null
    constructor(props) {
        super(props)
        this.props = props
        this.getData()
    }
    getData = async () => {
        if(this.props.type==='current')
        {
            const location = this.props.data
            let param = {
                pincode:location
            }
                await axios.post('/area/bar-chart', param)
                .then((res) => 
                {
                    console.log(res.data)
    
                })
                .catch((err) => console.log(err))
            
        }
        else{
            const location = this.props.data
            let param = {
                location:location
            }
                await axios.post('/area/bar-chart', param)
                .then((res) => 
                {
                    console.log(res.data)
    
                })
                .catch((err) => console.log(err))
        }
    }
    render() {
        return (
            <View style={styles.cont}>
                <BarChart
                    style={{
                        flex:1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    data={data}
                    width={screenWidth}
                    height={320}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        height: '100%',
    },
})
