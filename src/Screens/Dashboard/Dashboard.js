import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {shadow} from "../../CommonlyUsed/CommonlyUsedConstants";
import {styles} from "./DashboardStyles";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    Navigate = () => {
        this.props.navigation.navigate("HomePage");
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <TouchableOpacity style={[styles.topContainer, shadow]}
                                  onPress={() => this.Navigate()}>
                    <Text style={styles.textStyle}>Hangi ünlüye benzediğini öğren</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.bottomContainer, shadow]}
                                  onPress={() => this.Navigate()}>
                    <Text style={styles.textStyle}>Bir ünlü seç ve ne kadar benzediğinizi öğren</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default Dashboard;
