# Near Horizon Style Guide

Rules and conventions for all projects in this monorepo.

---

## Philosophy

**Simplicity and quick iteration.** We are a small team solving real problems. Every decision should bias toward shipping something usable over architecting something perfect. Build the simplest version that works, put it in front of people, and improve based on what you learn.

- Prefer boring technology over clever technology
- Fewer dependencies, fewer abstractions, fewer layers
- If a feature can be cut without losing the core value, cut it
- A working prototype today beats a polished product next quarter
- Every project should be deployable from a single README

---

## Stack

### Frontend

- **React** with TypeScript
- **Ant Design** (antd) as the component library -- use it for everything it covers before building custom components
- **Vite** for builds
- **Bun** as package manager and runtime

### Backend

- Keep it simple. Most projects should start with a single service
- Node/Bun for API services, Python where scientific computing or data work demands it
- SQLite or PostgreSQL depending on scale. Start with SQLite unless you have a reason not to

### General

- **TypeScript** everywhere JS is written
- Monorepo projects live in their own directories under the root
- Each project has its own `package.json` and can be built/run independently

---

## Color System

Our palette is rooted in a solarpunk sensibility -- warm, organic, grounded -- mapped onto Ant Design's token system for consistency across all applications.

### Brand Colors

These are the Near Horizon identity colors used across the website, deck, and all projects.

#### Primary: Grove Green

The core brand color. Used for primary actions, navigation, key interactive elements.

| Token | Hex | Usage |
|---|---|---|
| `colorPrimary` | `#2d4a2d` | Primary buttons, links, active states |
| `green-1` | `#e8f0e0` | Light backgrounds, success badges |
| `green-2` | `#c5dbb5` | Hover backgrounds, light borders |
| `green-3` | `#9cc28a` | Secondary accents |
| `green-4` | `#7cb87a` | Icons, progress bars |
| `green-5` | `#4a7c59` | Hover on primary, subheadings |
| `green-6` | `#2d4a2d` | **Primary** -- buttons, links, key UI |
| `green-7` | `#1a2e1a` | Headings, high-emphasis text |

#### Accent: Harvest Gold

Used sparingly for emphasis, highlights, callouts, and visual warmth.

| Token | Hex | Usage |
|---|---|---|
| `colorWarning` | `#d4a35a` | Accent borders, highlights, callouts |
| `gold-1` | `#fdf6ec` | Light accent backgrounds |
| `gold-2` | `#f0e0c0` | Hover accent backgrounds |
| `gold-3` | `#f0d08c` | Tags, badges, light accents |
| `gold-4` | `#d4a35a` | **Accent** -- borders, emphasis, dividers |
| `gold-5` | `#b8893e` | Hover on accent elements |

### Neutral Colors

| Token | Hex | Usage |
|---|---|---|
| `colorBgBase` | `#f5f0e8` | Page background (cream) |
| `colorBgContainer` | `#ffffff` | Cards, modals, panels |
| `colorBgElevated` | `#f7f4ed` | Elevated surfaces, sidebar backgrounds |
| `colorBorder` | `#e8e2d6` | Default borders, dividers |
| `colorBorderSecondary` | `#e0dbd0` | Subtle borders, table lines |
| `colorText` | `#1a1a16` | Primary body text |
| `colorTextSecondary` | `#5c5a52` | Secondary text, descriptions |
| `colorTextTertiary` | `#8c8985` | Placeholder text, metadata, timestamps |
| `colorTextQuaternary` | `#d9d2c7` | Disabled text, footer text |

### Semantic / Functional Colors

Map to Ant Design's functional color tokens. Use these for status and feedback, not decoration.

| Role | Hex | Ant Token | Usage |
|---|---|---|---|
| **Success** | `#52c41a` | `colorSuccess` | Confirmations, completed states |
| **Error** | `#ff4d4f` | `colorError` | Errors, destructive actions, validation |
| **Warning** | `#d4a35a` | `colorWarning` | Warnings (shares accent gold) |
| **Info** | `#1677ff` | `colorInfo` | Informational messages, links to docs |

### Pillar Tag Colors

For categorizing projects by resilience pillar across dashboards and project lists.

| Pillar | Background | Text | Example |
|---|---|---|---|
| Energy | `#fef3c7` | `#92400e` | Warm amber tag |
| Food | `#d1fae5` | `#065f46` | Soft green tag |
| Carbon | `#e0e7ff` | `#3730a3` | Soft indigo tag |
| Ecology | `#d5f5f6` | `#0e5e6f` | Soft cyan tag |
| Community | `#fce7f3` | `#9d174d` | Soft rose tag |

### Ant Design Theme Config

Use this as the starting point for `ConfigProvider` in any React project:

```tsx
import { ConfigProvider } from 'antd';

const theme = {
  token: {
    // Brand
    colorPrimary: '#2d4a2d',
    colorLink: '#4a7c59',
    colorLinkHover: '#2d4a2d',

    // Backgrounds
    colorBgBase: '#f5f0e8',
    colorBgContainer: '#ffffff',
    colorBgElevated: '#f7f4ed',
    colorBgLayout: '#f5f0e8',

    // Borders
    colorBorder: '#e8e2d6',
    colorBorderSecondary: '#e0dbd0',

    // Text
    colorText: '#1a1a16',
    colorTextSecondary: '#5c5a52',
    colorTextTertiary: '#8c8985',
    colorTextQuaternary: '#d9d2c7',

    // Functional
    colorSuccess: '#52c41a',
    colorWarning: '#d4a35a',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',

    // Shape
    borderRadius: 6,
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    Button: {
      primaryShadow: 'none',
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      {/* ... */}
    </ConfigProvider>
  );
}
```

### CSS Custom Properties

For non-React contexts (static pages, Slidev decks, etc.), use these CSS variables:

```css
:root {
  --nh-green-deep: #1a2e1a;
  --nh-green-mid: #2d4a2d;
  --nh-green-light: #4a7c59;
  --nh-green-bright: #7cb87a;
  --nh-gold: #d4a35a;
  --nh-gold-light: #f0d08c;
  --nh-cream: #f5f0e8;
  --nh-cream-dim: #d9d2c7;
  --nh-bg-elevated: #f7f4ed;
  --nh-border: #e8e2d6;
  --nh-border-secondary: #e0dbd0;
  --nh-text: #1a1a16;
  --nh-text-secondary: #5c5a52;
  --nh-text-tertiary: #8c8985;
}
```

---

## Typography

- **Headings**: DM Serif Display (website/marketing) or the system font stack (applications)
- **Body / UI**: DM Sans as the primary font, falling back to the system stack
- Let Ant Design's typography defaults handle sizing within applications. Don't fight the framework
- Use `antd`'s `<Typography.Title>`, `<Typography.Text>`, and `<Typography.Paragraph>` components

---

## Component Guidelines

### Use Ant Design First

If antd has a component for it, use it. Don't build a custom date picker, table, modal, form, or notification system. Customize through the theme token system, not by overriding CSS.

### When to Build Custom

- Domain-specific visualizations (maps, sensor dashboards, energy charts)
- Components that have no antd equivalent
- Layouts specific to a project's unique needs

### Patterns

- Use `antd` Form with form validation for all data entry
- Use `antd` Table for tabular data -- it handles sorting, filtering, pagination
- Use `antd` notification/message for feedback, not custom toast systems
- Use `antd` Layout (Sider, Header, Content) for app shells

---

## Project Structure

Each project in the monorepo should follow this layout:

```
project-name/
  README.md          # What it does, how to run it, how to deploy it
  package.json
  src/
    main.tsx         # Entry point
    App.tsx          # Root component with ConfigProvider theme
    components/      # Shared components for this project
    pages/           # Route-level components
    hooks/           # Custom hooks
    utils/           # Pure functions
    types/           # TypeScript types
  public/
```

Keep it flat until complexity demands otherwise. A project with 3 pages doesn't need 15 directories.

---

## Code Conventions

- **No premature abstraction.** Duplicate code twice before extracting. Three is the threshold
- **Name things plainly.** `getUsers` not `fetchAndHydrateUserEntities`
- **Components are functions.** No class components
- **Props over context** until prop drilling becomes genuinely painful (3+ levels)
- **Colocate tests** next to the code they test: `Button.tsx` and `Button.test.tsx` in the same directory
- Format with Prettier, lint with ESLint. Don't argue about semicolons

---

## Iteration Process

1. **Spike** -- Build the smallest thing that proves the idea works
2. **Ship** -- Deploy it. Get it in front of someone
3. **Film** -- Document the build process for content
4. **Feedback** -- Learn from real usage
5. **Improve** -- Iterate based on what you learned, not what you assumed

The goal is to move through this loop as fast as possible. Optimize for cycle time, not for coverage of edge cases on the first pass.
