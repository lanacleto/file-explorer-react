import icons from '../assets/icons';

export interface IconMapping {
  [key: string]: React.ComponentType<{ width?: number; height?: number; fill?: string }>;
}

export class FileIconService {
  private static iconMap: IconMapping = {
    'package.json': icons.JsonFile,
    'yarn.lock': icons.YarnFile,
    'package-lock.json': icons.DefaultFile,
    '.gitignore': icons.GitFile,
    
    'js': icons.JsFile,
    'ts': icons.JsFile,
    'jsx': icons.JsFile,
    'tsx': icons.JsFile,
    'css': icons.CssFile,
    'scss': icons.CssFile,
    'html': icons.DefaultFile,
    'svg': icons.ImageFile,
    'ico': icons.ImageFile,
    'png': icons.ImageFile,
    'jpg': icons.ImageFile,
    'jpeg': icons.ImageFile,
    'gif': icons.ImageFile,
    'webp': icons.ImageFile,
    'bmp': icons.ImageFile,
    'tiff': icons.ImageFile,
  };

  static getFileIcon(filename: string) {
    const ext = filename.split('.').pop()?.toLowerCase();
    const fullName = filename.toLowerCase();
    
    if (fullName === 'package.json' || fullName.endsWith('.json')) {
      return icons.JsonFile;
    }
    if (fullName === 'yarn.lock') {
      return icons.YarnFile;
    }
    if (fullName === 'package-lock.json' || fullName.endsWith('.lock')) {
      return icons.DefaultFile;
    }
    if (fullName.startsWith('readme')) {
      return icons.ReadmeFile;
    }
    if (fullName === '.gitignore' || fullName.startsWith('.git')) {
      return icons.GitFile;
    }
    if (fullName.startsWith('.env') || fullName.endsWith('.env')) {
      return icons.DefaultFile;
    }
    
    return ext ? this.iconMap[ext] || icons.DefaultFile : icons.DefaultFile;
  }

  static addIconMapping(extension: string, icon: React.ComponentType<{ width?: number; height?: number; fill?: string }>) {
    this.iconMap[extension] = icon;
  }
} 