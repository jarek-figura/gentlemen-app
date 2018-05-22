import React, { Component } from 'react'

const themes = {
    basic: {
        body: {
          backgroundColor: "#D12B36",
          },
      bodyBottom: {
        backgroundColor: "#d11221",
      },
    },
    taskManPink: {
        body: {
          backgroundColor: '#0271d1',
          color: '#fff',
        },
      bodyBottom: {
        backgroundColor: "#0271d1",
        color: '#fff',
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