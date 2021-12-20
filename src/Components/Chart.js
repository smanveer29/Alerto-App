import axios from './axios';
import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import { BarChart } from "react-native-chart-kit";
import Colors from '../../Helper/Colors';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

let datachart =
{
    labels: [],
    datasets: [
        {
            data: []
        }
    ]
};
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height/2
const chartLabels = []
const chartData = []

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
        this.state = {
            isLoading: true
        }
        this.getData()
    }

    updateChartData = (res) => {
        let location = []
        let dataset = []

        for (let item in res.data.list) {
            location.push(item)
            dataset.push(res.data.list[item].length)
        }
        datachart.labels = location
        datachart.datasets[0].data = dataset
        this.setState({ isLoading: false })
    }
    getData = async () => 
    {
        var param = {}
        if (this.props.type === 'current') {
            const location = this.props.data
            param = {
                pincode: location
            }
        }
        else {
            const location = this.props.data
            param =
            {
                location: location
            }
        }
        await axios.post('/area/bar-chart', param)
            .then((res) => {
                if (res.data.type == 'current') {
                    this.updateChartData(res)
                }
                else{
                    this.updateChartData(res)
                }
            })
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <View style={styles.cont}>
                {this.state.isLoading ? <ActivityIndicator size="large" color="#fff" />
                    :
                    <View style={{alignItems: "center",justifyContent: 'space-between'}}>
                        <Text style={styles.label}>Crime Rate</Text>
                        <BarChart
                            data={datachart}
                            width={screenWidth}
                            height={300}
                            yAxisSuffix=""
                            fromZero
                            chartConfig={chartConfig}
                            verticalLabelRotation={0}
                            showValuesOnTopOfBars
                        />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 22,
        color: 'white',
        letterSpacing:4,
        margin:20, 
        textTransform:'uppercase',

    }
})
