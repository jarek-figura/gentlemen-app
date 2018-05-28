import React, {Component} from 'react'

const themes = {
  basic: {
    body: {
      backgroundColor: "#d62261"
    },
    bodyBottom: {
      backgroundColor: "#d62261"
    },
    clickedBottom: {
      background: "white",
      color: "#d62261"
    },
    unClickedBottom: {
      backgroundColor: "#d62261",
      color: "#fff"
    },
    taskListStyle: {
      color: "#000"
    },
    bodyClass: "nazwaKlasy"
  },
  taskManPink: {
    body: {
      backgroundColor: '#0271d1',
      color: '#fff'
    },
    bodyBottom: {
      backgroundColor: "#0271d1",
      color: '#000'
    },
    clickedBottom: {
      backgroundColor: "white",
      color: "#0271d1"
    },
    unClickedBottom: {
      backgroundColor: "#0271d1",
      color: "#fff"
    },
    taskListStyle: {
      color: "#000"
    },
    bodyClass: "nazwaKlasy2"
  }
};

const ThemeContext = React.createContext(themes.basic);

export const ThemeConsumer = ThemeContext.Consumer;

export class ThemeProvider extends Component {
  state = {
    themeName: 'basic',
    theme: themes.basic,
    toggle: () => this.setState(
      ({theme}) => ({
        theme: theme === themes.basic ? themes.taskManPink : themes.basic,
      })
    )
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}