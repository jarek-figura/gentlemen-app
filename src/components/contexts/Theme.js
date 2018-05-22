import React, { Component } from 'react'

const themes = {
    basic: {
        body: {
          backgroundColor: "#d62261",
          fontFamily: 'Roboto, sans-serif',
          },
      bodyBottom: {
          backgroundColor: "#d62261",
          fontFamily: 'Roboto, sans-serif',
      },
          taskListStyle: {
          fontFamily: 'Roboto, sans-serif',
          color: "#000",
      }
    },
    taskManPink: {
        body: {
          backgroundColor: '#0271d1',
          color: '#fff',
          fontFamily: 'Roboto, sans-serif',
        },
        bodyBottom: {
          backgroundColor: "#0148d1",
          color: '#000',
          fontFamily: 'Roboto, sans-serif',
      },
        taskListStyle: {
          color: "#000",
          fontFamily: 'Roboto, sans-serif',
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