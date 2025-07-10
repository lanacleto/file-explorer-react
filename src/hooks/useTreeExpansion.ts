import { useState, useCallback } from 'react';

export const useTreeExpansion = () => {
  const [expandedFolderIds, setExpandedFolderIds] = useState<Set<string>>(new Set());

  const toggleFolderExpansion = useCallback((folderId: string) => {
    setExpandedFolderIds(previousExpandedIds => {
      const updatedExpandedIds = new Set(previousExpandedIds);
      const isCurrentlyExpanded = updatedExpandedIds.has(folderId);
      
      if (isCurrentlyExpanded) {
        updatedExpandedIds.delete(folderId);
      } else {
        updatedExpandedIds.add(folderId);
      }
      
      return updatedExpandedIds;
    });
  }, []);

  const isFolderExpanded = useCallback((folderId: string): boolean => {
    return expandedFolderIds.has(folderId);
  }, [expandedFolderIds]);

  return {
    toggleFolderExpansion,
    isFolderExpanded,
  };
}; 