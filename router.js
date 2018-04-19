import React, { PureComponent } from 'react'
import { BackHandler, Animated, Easing } from 'react-native'
import { Root } from 'native-base'
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation'
import {
    initializeListeners,
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import AesCpherPage from './containers/AesCpherPage'
import AesDescryptionPage from './containers/AesDescryptionPage'
import choosePrivateCodePage from './containers/choosePrivateCodePage'

const HomeNavigator = TabNavigator(
    {
        AesPage: { screen: AesCpherPage },
        AesDescryptionPage: { screen: AesDescryptionPage },

    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        lazyLoad: false,
    }
)

const MainNavigator = StackNavigator(
    {
        HomeNavigator: { screen: HomeNavigator },
        choosePrivateCodePage: {screen: choosePrivateCodePage },
    },
    {
        headerMode: 'screen',
    }
)

const AppNavigator = StackNavigator(
    {
        Main: { screen: MainNavigator },

    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps
                const { index } = scene

                const height = layout.initHeight
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                })

                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                })

                return { opacity, transform: [{ translateY }] }
            },
        }),
    }
)

function getCurrentScreen(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getCurrentScreen(route)
    }
    return route.routeName
}

export const routerMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.router
)
const addListener = createReduxBoundAddListener('root')

@connect(({ app, router }) => ({ app, router }))
class Router extends PureComponent {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentDidMount() {
        initializeListeners('root', this.props.router)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getCurrentScreen(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false
    }

    render() {
        const { dispatch, app, router } = this.props
        // if (app.loading) return <Loading />

        const navigation = addNavigationHelpers({
            dispatch,
            state: router,
            addListener,
        })
        return  <Root><AppNavigator navigation={navigation} /></Root>
    }
}

export function routerReducer(state, action = {}) {
    return AppNavigator.router.getStateForAction(action, state)
}

export default Router
