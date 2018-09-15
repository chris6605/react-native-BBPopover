import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    AppState,
    StyleSheet
} from 'react-native';

import { AppConst, SvgUri } from 'react-native-iber-common';

import LanguageMap from '../resource/LanguageMap';

import SvgMap from '../resource/SvgMap';

import PngMap from '../resource/PngMap';

/**
*   <BBPopver
*       ref={ref=>this.popver=ref}
*       position='top'        
*       arrowRect={}
*       contentRect={}
*   >
*       {your popver content}
*   </BBPopver>
*/

export default class BBPopver extends Component {

    static defaultProps = {
        position: 'left'
    }

    direction = 'column'
    path = new Animated.Value(0)
    constructor(props) {
        super(props)
        this.state = {
            isShow: false
        }
    }

    componentDidMount() {
        this.contentRect = this.props.contentRect
        this.arrowRect = this.props.arrowRect
        this.getDirection(this.props.position)

    }


    componentWillUnmount() {

    }


    getDirection(position) {
        switch (position) {
            case 'top':
                this.direction = 'column'
                break
            case 'bottom':
                this.direction = 'column-reverse'
                break
            case 'left':
                this.direction = 'row'
                break
            case 'right':
                this.direction = 'row-reverse'
                break
        }
    }


    getArrowStyle(position) {
        let style = {}
        switch (position) {
            case 'top':
                style = {
                    marginLeft: this.arrowRect.x,
                    borderTopColor: 'transparent',
                    borderBottomColor: '#fff',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                }
                break
            case 'bottom':
                style = {
                    marginLeft: this.arrowRect.x,
                    borderTopColor: '#fff',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent'
                }
                break
            case 'left':
                style = {
                    marginTop: this.arrowRect.y,
                    borderTopColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: '#fff'
                }
                break
            case 'right':
                style = {
                    marginTop: this.arrowRect.y,
                    borderTopColor: 'transparent',
                    borderBottomColor: 'transparent',
                    borderLeftColor: '#fff',
                    borderRightColor: 'transparent'
                }
                break
        }

        return style
    }



    // 收到父組件傳遞的屬性變化
    componentWillReceiveProps(nextProps) {

    }


    show() {
        this.setState({ isShow: true }, () => {
            Animated.timing(this.path, {
                toValue: 1,
                duration: 300
            }).start()
        })
    }

    dismiss() {
        Animated.timing(this.path, {
            toValue: 0,
            duration: 300
        }).start(() => {
            this.setState({ isShow: false })
        });
    }



    render() {
        return this.state.isShow ?
            <TouchableOpacity
                onPress={() => {
                    this.dismiss()
                }}
                activeOpacity={1}
                style={{ position: 'absolute', left: 0, top: 0, width: AppConst._SCREEN_WIDTH, height: AppConst._SCREEN_HEIGHT, backgroundColor: 'transparent' }}>
                <Animated.View style={{
                    flexDirection: this.direction, backgroundColor: '#fff', position: 'absolute',
                    left: this.contentRect.x, top: this.contentRect.y,
                    opacity: this.path.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    }),
                    width: this.path.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, this.contentRect.width]
                    }),
                    transform: [
                        {
                            translateX: this.path.interpolate({
                                inputRange: [0, 1],
                                outputRange: [this.contentRect.width, 0]
                            })
                        }, {
                            translateY: this.path.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-50, 0]
                            })
                        },
                    ]
                }}>

                    <View style={{
                        width: this.arrowRect.width,
                        height: this.arrowRect.height,
                        borderTopWidth: this.arrowRect.width / 2,
                        borderLeftWidth: this.arrowRect.height / 2,
                        borderBottomWidth: this.arrowRect.width / 2,
                        borderRightWidth: this.arrowRect.height / 2,
                        shadowColor: '#999',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 2,
                        shadowOpacity: 0.6,
                        ...this.getArrowStyle(this.props.position)
                    }} />
                    <View style={{
                        backgroundColor: '#fff',
                        shadowColor: '#999',
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 2,
                        shadowOpacity: 0.6
                    }} >

                        {this.props.children}
                    </View>

                </Animated.View>
            </TouchableOpacity > : null

    }




}
