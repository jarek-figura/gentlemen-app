import React, { Component } from 'react'

const themes = {
    light: {
        backgroundColor: '#e8ee10',
        color: '#000aee'
    },
    dark: {
        backgroundColor: '#442d0a',
        color: '#acee70'
    }
}

const ThemeContext = React.createContext(themes.light)

export const ThemeConsumer = ThemeContext.Consumer

export class ThemeProvider extends Component {
    state = {
        theme: themes.light,
        toggle: () => this.setState(
            ({ theme }) => ({ theme: theme === themes.light ? themes.dark : themes.light })
        )
    }

    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                {this.props.children}
            </ThemeContext.Provider>
        )
    }
}