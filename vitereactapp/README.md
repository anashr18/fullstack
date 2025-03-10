# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## export default {Home, About }} vs export { Home, About }
## Comparison Table

| Syntax                          | Type                     | Import Example                                         | Best Used For                                      |
|---------------------------------|-------------------------|-------------------------------------------------------|--------------------------------------------------|
| `export { home, about }`        | Named Export            | `import { home, about } from './module';`            | Multiple exports, better tooling support        |
| `export default { home, about }` | Default Export (Object) | `import module from './module'; console.log(module.home);` | Not recommended unless exporting a single object explicitly |

