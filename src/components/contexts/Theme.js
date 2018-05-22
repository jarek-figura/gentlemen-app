import React, { Component } from 'react'

const themes = {
    basic: {
        backgroundColor: "#A9A9A9",
        color: '#fff',

    },
    taskManPink: {
        backgroundColor: '#442d0a',
        color: '#acee70',

    }
};

const ThemeContext = React.createContext(themes.basic)

export const ThemeConsumer = ThemeContext.Consumer

export class ThemeProvider extends Component {
    state = {
        theme: themes.basic,
        toggle: () => this.setState(
            ({ theme }) => ({ theme: theme === themes.basic ? themes.taskManPink : themes.basic })
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