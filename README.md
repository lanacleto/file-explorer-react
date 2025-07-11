# File Explorer React 🗂️

I made this project in Svelte first, once this is the framework this role requires - But now, you are looking at a resolution in React, and I honestly hope you love it.

A sophisticated file explorer built with **React** and **TypeScript**, featuring a hierarchical tree structure with interactive folder expansion, file deletion, and comprehensive accessibility support.

## 🌐 Live Demo

**🚀 Deployed on Vercel:** [https://file-explorer-react-one.vercel.app/](https://file-explorer-react-one.vercel.app/)

## 🚀 Getting Started

```bash
git clone https://github.com/lanacleto/file-explorer-react.git
cd file-explorer-react
yarn install
yarn start
```

## 🏗️ Architecture

### Core Components

- **`FileExplorer`** - Main recursive component that renders the tree structure
- **`FileNode`** - Individual tree item with expand/collapse and delete functionality
- **`useTreeExpansion`** - Custom hook managing folder expansion state globally

### Key Features

#### 🌳 **Hierarchical Tree Structure**
- Recursive rendering of nested folders and files
- Global expansion state management (lifted to App level)
- Proper ARIA attributes for accessibility (`aria-level`, `aria-posinset`, `aria-setsize`)

#### 🎯 **Interactive Operations**
- **Folder Expansion**: Click folders to expand/collapse
- **File Deletion**: Delete button appears on hover with confirmation
- **Keyboard Navigation**: Full keyboard support (Arrow up and down, Enter, Space, Delete)

#### ♿ **Accessibility**
- **ARIA Tree Structure**: Proper `role="tree"` and `role="treeitem"`
- **Keyboard Navigation**: Complete keyboard support for all operations
- **Screen Reader Support**: Descriptive labels and proper focus management
- **Focus Indicators**: Visible focus rings for keyboard users

### Data Structure

```typescript
interface TreeNode {
  id: string;
  type: "project" | "folder" | "file";
  name: string;
  children?: TreeNode[];
}
```

### State Management

- **Global Expansion State**: Managed by `useTreeExpansion` hook
- **Directory Data**: In-memory tree structure with async API simulation
- **Loading States**: Proper loading indicators during data fetch

## 🧪 Testing

### E2E Tests (Cypress)
Comprehensive test suite covering:
- Initial file structure loading
- Folder expansion/collapse functionality
- File and folder deletion
- Icon verification for different file types
- Keyboard navigation
- Nested folder operations
- Multiple deletion scenarios

```bash
yarn cypress:open    # Interactive mode
yarn cypress:run     # Headless mode
```

## 🛠️ Tech Stack

- **React 19** - UI framework with TypeScript
- **SCSS Modules** - Styled components with CSS Grid
- **TypeScript** - Type safety and better DX
- **Cypress** - End-to-end testing
- **Yarn** - Package management

## 📁 Project Structure

```
src/
├── components/
│   ├── FileExplorer.tsx      # Main tree component
│   ├── FileNode.tsx          # Individual tree item
│   └── FileExplorer.module.scss
├── hooks/
│   └── useTreeExpansion.ts   # Global expansion state
├── types/
│   └── fileExplorer.ts       # TypeScript interfaces
├── utils/
│   └── iconMapping.ts        # File icon service
├── assets/
│   └── icons/               # SVG icon components
└── api.ts                   # Mock API with tree data
```

## 🎯 Key Implementation Details

### Recursive Tree Rendering
The `FileExplorer` component recursively renders itself for nested structures, passing down expansion state and delete handlers.

### Global State Management
Folder expansion state is lifted to the App level using a custom hook, ensuring consistent state across the entire tree.

### Accessibility-First Design
Every interactive element has proper ARIA attributes and keyboard event handlers, making the component fully accessible.

### Icon System
Dynamic icon mapping based on file extensions with fallback to default icons, supporting common development file types.
