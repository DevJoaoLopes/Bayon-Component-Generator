import * as vscode from 'vscode';
import { verifyPermissionWriteFile, createBayonFolder, createBayonReactComponent } from './components';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('bayon-component-generator.generate', async (resource) => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage('Generate from bayon-component-generator!');

    let inputBoxField = await vscode.window.showInputBox({
      placeHolder: 'Enter the component name',
      prompt: 'Create the name preferably in PascalCase'
    });

    if(!inputBoxField || inputBoxField?.trim().length === 0) {
      vscode.window.showErrorMessage('Name entered is not valid!!');
    } else {
      verifyPermissionWriteFile();
      createBayonFolder(resource?.path, inputBoxField);
      createBayonReactComponent(resource?.path, inputBoxField);
      vscode.window.showInformationMessage(`Component created ${inputBoxField}`);
    }
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
