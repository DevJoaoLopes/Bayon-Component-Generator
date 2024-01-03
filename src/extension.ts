// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	const createComponentDir = (name?: string) => {
		// vscode.workspace.fs
		// console.log(vscode.window.activeTextEditor?.document.uri.path);
		// console.log(vscode.workspace.workspaceFolders);
		// console.log(vscode.workspace.workspaceFolders?.[0].uri.fsPath);
	};


	// const createReactComponent = (uri: string, nameComponent: string) => {

	// }

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bayon-component-generator.generate', async (resource) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Generate from bayon-component-generator!');
		createComponentDir('teste');

		let inputBoxField = await vscode.window.showInputBox({
			placeHolder: "Digite o nome do componente",
			prompt: "Crie o nome preferencialmente em PascalCase"
		});

		
		if(!inputBoxField || inputBoxField?.trim().length === 0) {
			vscode.window.showErrorMessage('Nome digitado nao eh valido!!');
		} else {
			//! Aqui vai chamar a funcao que criara o componente de fato
			vscode.workspace.fs.writeFile(vscode.Uri.parse(resource.path + '/' +   inputBoxField + '.txt'), new TextEncoder().encode('Hello World'));
			vscode.window.showInformationMessage(`Criado componente ${inputBoxField}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
