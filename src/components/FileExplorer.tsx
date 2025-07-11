import React from 'react';
import { FileExplorerProps, NODE_TYPES } from '../types/fileExplorer';
import FileNode from './FileNode';
import styles from './FileExplorer.module.scss';

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  node, 
  onDelete, 
  isRoot = true,
  isFolderExpanded,
  toggleFolderExpansion,
  level = 1,
  position = 1,
  totalSiblings = 1
}) => {
  if (!node) {
    return <div className={styles.loading}>Loading your files...</div>;
  }

  if (isRoot) {
    return (
      <div className={styles.fileExplorer} role="tree" aria-label="File Explorer">
        <h2 className={styles.projectHeader}>{node.name}</h2>
        <div className={styles.projectChildren}>
          {node.children?.map((childNode, index) => (
            <FileExplorer 
              key={childNode.id}
              node={childNode} 
              onDelete={onDelete} 
              isRoot={false}
              isFolderExpanded={isFolderExpanded}
              toggleFolderExpansion={toggleFolderExpansion}
              level={level + 1}
              position={index + 1}
              totalSiblings={node.children!.length}
            />
          ))}
        </div>
      </div>
    );
  }

  const isExpanded = isFolderExpanded ? isFolderExpanded(node.id) : false;
  const isFolder = node.type === NODE_TYPES.FOLDER;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <FileNode 
        node={node} 
        onDelete={onDelete} 
        isExpanded={isExpanded}
        onToggleExpand={toggleFolderExpansion || (() => {})}
        level={level}
        position={position}
        totalSiblings={totalSiblings}
      />
      
      {isFolder && isExpanded && hasChildren && (
        <div className={styles.children} role="group">
          {node.children!.map((childNode, index) => (
            <FileExplorer 
              key={childNode.id}
              node={childNode} 
              onDelete={onDelete} 
              isRoot={false}
              isFolderExpanded={isFolderExpanded}
              toggleFolderExpansion={toggleFolderExpansion}
              level={level + 1}
              position={index + 1}
              totalSiblings={node.children!.length}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default FileExplorer; 
