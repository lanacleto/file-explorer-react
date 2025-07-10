import React, { useCallback } from 'react';
import { FileNodeProps, NODE_TYPES } from '../types/fileExplorer';
import { FileIconService } from '../utils/iconMapping';
import icons from '../assets/icons';
import styles from './FileExplorer.module.scss';

const FileNode: React.FC<FileNodeProps> = ({ 
  node, 
  onDelete, 
  isExpanded, 
  onToggleExpand,
  level = 1,
  position = 1,
  totalSiblings = 1
}) => {
  const isFolder = node.type === NODE_TYPES.FOLDER;

  const getIconForFile = useCallback((filename: string) => {
    return FileIconService.getFileIcon(filename);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isFolder) {
          onToggleExpand(node.id);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onDelete(node.id);
        break;
    }
  }, [isFolder, node.id, onToggleExpand, onDelete]);

  const renderFolderToggleButton = (folderName: string, expanded: boolean) => (
    <button
      className={styles.folderButton}
      aria-label={expanded ? `Collapse ${folderName}` : `Expand ${folderName}`}
      tabIndex={-1}
    >
      {expanded ? <icons.ArrowDown /> : <icons.ArrowRight />}
    </button>
  );

  const renderFileIcon = (fileName: string) => {
    const FileIconComponent = getIconForFile(fileName);
    return (
      <span 
        className={styles.icon} 
        role="img" 
        aria-label={`File: ${fileName}`}
      >
        <FileIconComponent />
      </span>
    );
  };

  const renderFolderNameButton = (folderName: string, expanded: boolean) => (
    <button
      className={`${styles.name} ${styles.clickable}`}
      aria-label={`${expanded ? 'Collapse' : 'Expand'} folder ${folderName}`}
      tabIndex={-1}
    >
      {folderName}
    </button>
  );

  const renderDeleteButton = (itemName: string) => (
    <button
      className={styles.deleteButton}
      onClick={(e) => {
        e.stopPropagation();
        onDelete(node.id);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.stopPropagation();
          onDelete(node.id);
        }
      }}
      title={`Delete ${itemName}`}
      aria-label={`Delete ${itemName}`}
    >
      <icons.X />
    </button>
  );

  return (
    <div
      className={styles.node}
      role="treeitem"
      aria-expanded={isFolder ? isExpanded : undefined}
      aria-selected="false"
      aria-level={level}
      aria-posinset={position}
      aria-setsize={totalSiblings}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => isFolder && onToggleExpand(node.id)}
    >
      <div className={styles.nodeContent}>
        <div className={styles.gridItem}>
          {isFolder 
            ? renderFolderToggleButton(node.name, isExpanded)
            : renderFileIcon(node.name)
          }
        </div>
        
        <div className={styles.gridItem}>
          {isFolder 
            ? renderFolderNameButton(node.name, isExpanded)
            : <span className={styles.name}>{node.name}</span>
          }
        </div>
        
        <div className={styles.gridItem}>
          {renderDeleteButton(node.name)}
        </div>
      </div>
    </div>
  );
};

export default FileNode; 