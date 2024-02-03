import * as vscode from 'vscode';
import { getTemplates } from '../';

export const verifyPermissionWriteFile = () => {
  if(!vscode.workspace.fs.isWritableFileSystem('file')) {
    return vscode.window.showErrorMessage('Sistema nao permite a criacao de arquivos !!');
  }
};

export const createBayonFolder = (path: string, nameComponent: string) => {
  const uriParse = vscode.Uri.parse(path + '/' + nameComponent + '/');
  vscode.workspace.fs.createDirectory(uriParse);
};

export const createBayonReactComponent = (path: string, nameComponent: string) => {
  const baseUri = `${path}/${nameComponent}/${nameComponent}`;
  vscode.workspace.fs.writeFile(vscode.Uri.parse(path + '/' + nameComponent + '/index.ts'), new TextEncoder().encode(getTemplates(nameComponent, 'INDEX')));
  vscode.workspace.fs.writeFile(vscode.Uri.parse(baseUri + '.styles.tsx'), new TextEncoder().encode(getTemplates(nameComponent, 'STYLES')));
  vscode.workspace.fs.writeFile(vscode.Uri.parse(baseUri + '.tsx'), new TextEncoder().encode(getTemplates(nameComponent, 'COMPONENT')));
  vscode.workspace.fs.writeFile(vscode.Uri.parse(baseUri + '.test.tsx'), new TextEncoder().encode(getTemplates(nameComponent, 'TEST')));
};