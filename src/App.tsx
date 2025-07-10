import React, { useState, useEffect } from 'react';
import FileExplorer from './components/FileExplorer';
import api from './api';
import { TreeNode } from './types/fileExplorer';
import './App.scss';

function App() {
  const [directoryTree, setDirectoryTree] = useState<TreeNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDirectoryTree = async () => {
      try {
        const tree = await api.getDirectoryTree();
        setDirectoryTree(tree);
      } catch (error) {
        console.error('Failed to load directory tree:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDirectoryTree();
  }, []);

  const handleDelete = async (id: string) => {
    if (!directoryTree) return;
    try {
      const updatedTree = await api.deleteById(id);
      setDirectoryTree(updatedTree);
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <main>
      {isLoading ? (
        <div className="loading">Loading file explorer...</div>
      ) : (
        <FileExplorer node={directoryTree} onDelete={handleDelete} />
      )}
    </main>
  );
}

export default App;
