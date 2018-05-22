import React, { Component } from 'react'

const themes = {
    basic: {
        body: {
          backgroundColor: "#D12B36",
          },
      bodyBottom: {
        backgroundColor: "#d11221",
      },
        taskListStyle: {
        color: "#000",
      }

    },
    taskManPink: {
        body: {
          backgroundColor: '#0271d1',
          color: '#000',
        },
        bodyBottom: {
          backgroundColor: "#0271d1",
          color: '#000',
      },
        taskListStyle: {
          color: "#000",
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