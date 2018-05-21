import React from 'react';

const themes = {
    light: {
        backgroundColor: '#00dd61',
        color: '#cc0f13'
    },
    dark: {
        backgroundColor: '#c6ee00',
        color: '#ee0094'
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

    // This function takes a component...
        export function withTheme(Component) {
      // ...and returns another component...
          return function ThemedComponent(props) {
            // ... and renders the wrapped component with the context theme!
                // Notice that we pass through any additional props as well
                   return (
                  <ThemeContext.Consumer>
                       {({ theme, toggle }) => <Component {...props} theme={theme} toggleTheme={toggle} />}
                      </ThemeContext.Consumer>
                );
          };
}