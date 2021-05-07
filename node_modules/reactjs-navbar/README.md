# reactjs-navbar

> A flexible and customizable navigation bar with support for claim authorization.

[![NPM](https://img.shields.io/npm/v/reactjs-navbar.svg)](https://www.npmjs.com/package/reactjs-navbar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save reactjs-navbar
```

## Demo

Try out the navbar by opening both [this](https://react-yeurin.stackblitz.io/ "this") and [this](https://stackblitz.com/edit/react-yeurin/ "this").

## Usage

Below is a comprehensive example of how to use the component. Details are further explained afterwards.

```jsx
import React, { Component } from "react";

import Navbar from "reactjs-navbar";
import logo from "./logo.png";
import Loader from "react-loader-spinner";
import {
  faUsers,
  faBookOpen,
  faGlobe,
  faChartPie,
  faCogs /*...*/,
} from "@fortawesome/free-solid-svg-icons";

import "reactjs-navbar/dist/index.css";

class App extends Component {
  state = {
    isLoading: false,
  };

  render() {
    return (
      <Navbar
        logo={logo}
        loader={<Loader type="Puff" color="#D85B5B" height={25} width={25} />}
        isLoading={this.state.isLoading}
        helpCallback={() => {
          alert("I need help... and coffee...");
        }}
        menuItems={[
          {
            title: "Administration",
            icon: faUsers,
            isAuth: true,
            onClick: () => {
              // What you want to do...
              alert("Its coffee time...");
            },
          },
          {
            title: "Transactions",
            icon: faBookOpen,
            isAuth: () => {
              // Claim authorization logic...
              return false;
            },
          },
          {
            title: "Networks",
            icon: faGlobe,
            isAuth: true,
          },
          {
            title: "Settings",
            icon: faCogs,
            isAuth: true,
            subItems: [
              {
                title: "Subitem 1",
                icon: faAnchor,
                isAuth: true,
                onClick: () => {
                  // What you want to do...
                  alert("I need another cup of coffee...");
                },
              },
              {
                title: "Subitem 2",
                icon: faDizzy,
                isAuth: true,
                subItems: [
                  { title: "Subitem 2-1", icon: faAdjust, isAuth: true },
                  {
                    title: "Subitem 2-2",
                    icon: faBell,
                    isAuth: true,
                    subItems: [
                      {
                        title: "Subitem 2-2-1",
                        icon: faGhost,
                        isAuth: true,
                        subItems: [
                          {
                            title: "Subitem 2-2-2-1",
                            icon: faFan,
                            isAuth: true,
                          },
                          {
                            title: "Subitem 2-2-2-2",
                            icon: faCarSide,
                            isAuth: true,
                          },
                          {
                            title: "Subitem 2-2-2-3",
                            icon: faJedi,
                            isAuth: true,
                          },
                          {
                            title: "Subitem 2-2-2-4",
                            icon: faLaughBeam,
                            isAuth: true,
                          },
                        ],
                      },
                      {
                        title: "Subitem 2-2-2",
                        icon: faKey,
                        isAuth: true,
                      },
                    ],
                  },
                  {
                    title: "Make request",
                    icon: faCheese,
                    isAuth: true,
                    onClick: () => {
                      // What you want to do...
                      this.setState({ isLoading: true }, () =>
                        setTimeout(() => {
                          this.setState({ isLoading: false });
                        }, 3000)
                      );
                    },
                  },
                ],
              },
              {
                title: "Subitem 3",
                icon: faWater,
                isAuth: () => {
                  // Claim authorization logic...
                  return false;
                },
              },
            ],
          },
          {
            title: "Reports",
            icon: faChartPie,
            isAuth: true,
          },
        ]}
      />
    );
  }
}
```

The above will give you some thing like this:

[![Showcase](https://i.ibb.co/vL1RwXX/reactjs-navbar.gif "Showcase")](https://i.ibb.co/vL1RwXX/reactjs-navbar.gif "Showcase")

## Logo

The logo is an image object or an URL and it is optional, exclude the ~~logo~~ prop to remove it.

```jsx
import logo from "./logo.png";

<Navbar
		/* ... */

        logo={logo}

		/* ... */
>
```

## Loader

The loader will show up when _isLoading_ prop is true and will stop when it is false. The loader is also optional. If no custom loader specified using the ~~loader~~ prop, the navbar will fall back to its default loader.

```jsx
import Loader from "react-loader-spinner";

<Navbar
		/* ... */

        loader={<Loader type="Puff" color="#D85B5B" height={25} width={25} />}
        isLoading={this.state.isLoading}

		/* ... */
>
```

## Helper

The helper appears at the right of the navbar, when clicked, the _helpCallback_ function prop is executed. The helper is optional and can be removed by removing the ~~helpCallback~~ prop.

```jsx
<Navbar
		/* ... */

        helpCallback={() => {
          alert("I need help... and coffee...");
        }}

		/* ... */
>
```

## Menu Items

The menu items array consists of all the main menu, sub menus and sub-sub menus items of the navbar. For an item to have sub items, a similar array should be passed as a prop to this item. Each prop is as follows:

```jsx
<Navbar
		/* ... */

        menuItems={[
          {
            title: "Administration",
            icon: faUsers,
            isAuth: true,
            onClick: () => {
              // What you want to do...
              alert("Its coffee time...");
            }
          }
        ]}

		/* ... */
>
```

### Title and Icon

What will be shown as the item text. The icon is a font awesome object, please see the dependencies section for more information about font awesome.

```jsx
import {  faUsers  } from "@fortawesome/free-solid-svg-icons";

	{
		/* ... */

		title: "Administration",
		icon: faUsers

		/* ... */
	}
```

### Claim Authorization

Depending on _isAuth_ value, the navbar will decide if this item will be rendered or not. This is useful if your application implements _claim authorization_ or sometimes called _role-based authorization_. By passing a function which returns true or false, the navbar will evaluate the function and decide if the item will be render or not. Set to true to show the item, false to hide it.

```jsx
{
  /* ... */

  isAuth: () => {
    // Claim authorization logic...
    return false;
  };

  /* ... */
}
```

### Item Action

The _onClick_ prop is function that will be executed when the item is clicked upon.

```jsx
{
  /* ... */

  onClick: () => {
    // What you want to do...
    alert("Its coffee time...");
  };

  /* ... */
}
```

### Sub Items

An item can have a similar array as its own prop to render its own sub menu.

```jsx
	{
		/* ... */

            {
            title: "Settings",
            icon: faCogs,
            isAuth: true,
            subItems: [
              {
                title: "Subitem 1",
                icon: faAnchor,
                isAuth: true,
                onClick: () => {
                  // What you want to do...
                  alert("I need another cup of coffee...");
                }
              },

			  // More items ...

			  {
                    title: "Make request",
                    icon: faCheese,
                    isAuth: true,
                    onClick: () => {
                      // What you want to do...
                      this.setState({ isLoading: true }, () =>
                        setTimeout(() => {
                          this.setState({ isLoading: false });
                        }, 3000)
                      );
                    }
                  }

		/* ... */
	}
```

## CSS Customization

To customize the navbar, you can override the styles by using a local .css file. The navbar isolates the most common styles as CSS variables. I recommened changing them for best results.

1. Create a local .css file.
2. Add the :root pseudo-class.
3. Override the varaiables.

```css
:root {
  --pcol: black;
  --scol: green;
  --tspeed: 0.5s;
  --base-scale: 1.1;
  --subMenu-width: 12.25rem;

  --fgrad: linear-gradient(
    139deg,
    rgba(51, 51, 51, 1) 16%,
    rgb(136, 44, 44) 52%,
    rgba(51, 51, 51, 1) 88%
  );
  --sgrad: linear-gradient(
    139deg,
    rgba(51, 51, 51, 1) 16%,
    rgb(129, 28, 129) 76%,
    rgba(51, 51, 51, 1) 100%
  );

  --rm-font-size: 0.875rem;
  --sm-font-size: 0.65rem;
}
```

### CSS Variables

| Name            | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| --pcol          | Primary Color - Main theme color                                 |
| --scol          | Secondary Color - Secondary theme color                          |
| --tspeed        | Transition Speed - How fast transitions happen                   |
| --base-scale    | Base Scale - How large elements gets when hovered on             |
| --subMenu-width | Width of sub menus and sub-sub menus                             |
| --fgrad         | First Gradient - Gradient of the navbar when not hovering on it  |
| --sgrad         | Second Gradient - Gradient of the navbar when hovering on it     |
| --rm-font-size  | Root Menu Font Size - Font size of the main menu                 |
| --sm-font-size  | Sub Menu Font Size - Font size of the sub menu and sub-sub menus |

## License

MIT © [](https://github.com/)
