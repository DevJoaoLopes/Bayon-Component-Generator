// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const verifyPermissionWriteFile = () => {
		if(!vscode.workspace.fs.isWritableFileSystem('file')) {
			return vscode.window.showErrorMessage('Sistema nao permite a criacao de arquivos !!');
		}
	};

	const createBayonFolder = (path: string, nameComponent: string) => {
		const uriParse = vscode.Uri.parse(path + '/' + nameComponent + '/');
		vscode.workspace.fs.createDirectory(uriParse);
	};

	//! criar templates para os arquivos criados
	const createBayonReactComponent = (path: string, nameComponent: string) => {
		const baseUri = `${path}/${nameComponent}/${nameComponent}`;
		vscode.workspace.fs.writeFile(vscode.Uri.parse(path + '/' + nameComponent + '/index.ts'), new TextEncoder().encode('index')); //! criar template de importacao ts
		vscode.workspace.fs.writeFile(vscode.Uri.parse(baseUri + '.styles.tsx'), new TextEncoder().encode('styles'));
		vscode.workspace.fs.writeFile(vscode.Uri.parse(baseUri + '.tsx'), new TextEncoder().encode('component'));
		vscode.workspace.fs.writeFile(vscode.Uri.parse(baseUri + '.test.tsx'), new TextEncoder().encode('test'));
	};


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bayon-component-generator.generate', async (resource) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Generate from bayon-component-generator!');

		let inputBoxField = await vscode.window.showInputBox({
			placeHolder: "Digite o nome do componente",
			prompt: "Crie o nome preferencialmente em PascalCase"
		});

		
		if(!inputBoxField || inputBoxField?.trim().length === 0) {
			vscode.window.showErrorMessage('Nome digitado nao eh valido!!');
		} else {
			//! separar as funcoes
			verifyPermissionWriteFile();
			createBayonFolder(resource?.path, inputBoxField);
			createBayonReactComponent(resource?.path, inputBoxField);
			vscode.window.showInformationMessage(`Criado componente ${inputBoxField}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
