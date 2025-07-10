export const NODE_TYPES = {
  PROJECT: 'project',
  FOLDER: 'folder',
  FILE: 'file',
} as const;

export type NodeType = typeof NODE_TYPES[keyof typeof NODE_TYPES];

export interface TreeNode {
  id: string;
  type: NodeType;
  name: string;
  children?: TreeNode[];
}

export interface FileExplorerProps {
  node: TreeNode | null;
  onDelete: (id: string) => void;
  isRoot?: boolean;
  isFolderExpanded?: (folderId: string) => boolean;
  toggleFolderExpansion?: (folderId: string) => void;
  level?: number;
  position?: number;
  totalSiblings?: number;
}

export interface FileNodeProps {
  node: TreeNode;
  onDelete: (id: string) => void;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  level?: number;
  position?: number;
  totalSiblings?: number;
}

export interface IconComponent {
  width?: number;
  height?: number;
  fill?: string;
}

export interface KeyboardEventHandlers {
  handleKeyDown: (event: React.KeyboardEvent, nodeId: string) => void;
  handleDeleteKeyDown: (event: React.KeyboardEvent, nodeId: string) => void;
} 
