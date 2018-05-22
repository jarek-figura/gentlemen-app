import React, { Component } from 'react'

const themes = {
    basic: {
        body: {
          backgroundColor: "#A9A9A9",
          color: '#fff',
        }

    },
    taskManPink: {
        body: {
          backgroundColor: '#442d0a',
          color: '#acee70',
        },
      bodyBottom: {
        backgroundColor: "#25a915",
        color: '#cc02b3',
      }

    }
};

const ThemeContext = React.createContext(themes.basic)

export const ThemeConsumer = ThemeContext.Consumer

export class ThemeProvider extends Component {
    state = {
        themeName: 'basic',

        theme: themes.basic,
        toggle: () => this.setState(
            ({ theme }) => ({
              theme: theme === themes.basic ? themes.taskManPink : themes.basic,
              })
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