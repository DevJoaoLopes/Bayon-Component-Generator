import { workspace, Uri, window } from 'vscode';
import { createBayonFolder, createBayonReactComponent, verifyPermissionWriteFile } from '../components';


describe('Extension Test Suite', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('createBayonFolder - criação de pasta', () => {
    const path = '/caminho/qualquer';
    const nameComponent = 'MeuComponente';
  
    createBayonFolder(path, nameComponent);
  
    expect(workspace.fs.createDirectory).toHaveBeenCalled();
  });


  it('deve criar componentes corretamente',  () => {
    const path = 'pathTest';
    const nameComponent = 'MeuComponente';

    createBayonReactComponent(path, nameComponent);

    expect(workspace.fs.writeFile).toHaveBeenCalledWith(
      Uri.parse(`${path}/${nameComponent}/index.ts`),
      expect.any(Uint8Array)
    );
    expect(workspace.fs.writeFile).toHaveBeenCalledWith(
      Uri.parse(`${path}/${nameComponent}/${nameComponent}.tsx`),
      expect.any(Uint8Array)
    );
    expect(workspace.fs.writeFile).toHaveBeenCalledWith(
      Uri.parse(`${path}/${nameComponent}/${nameComponent}.test.tsx`),
      expect.any(Uint8Array)
    );
  });


  it('deve mostrar uma mensagem de erro se o sistema não permitir a escrita de arquivos', () => {
    (workspace.fs.isWritableFileSystem as jest.Mock).mockImplementationOnce(() => false);

    const showErrorMessageMock = jest.spyOn(window, 'showErrorMessage');

    verifyPermissionWriteFile();

    expect(showErrorMessageMock).toHaveBeenCalledWith('System does not allow creating files!!');
  });

  it('não deve mostrar uma mensagem de erro se o sistema permitir a escrita de arquivos', () => {
    const showErrorMessageMock = jest.spyOn(window, 'showErrorMessage');

    verifyPermissionWriteFile();

    expect(showErrorMessageMock).not.toHaveBeenCalled();
  });
});