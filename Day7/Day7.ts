import { InputFile } from '../Common/InputFile'

var input = new InputFile("./day7/input.txt");
var input1 = new InputFile("./day7/input1.txt");

class File {
    public mName: String;
    public mSize: number;

    constructor(aName: String, aSize: number) {
        this.mName = aName
        this.mSize = aSize
    }
}

class Directory {

    public mName: String;
    public mParent: Directory | null;
    public mChilds: Array<Directory>;
    public mFiles: Array<File>;

    constructor(aName: String, aParent: Directory | null) {
        this.mName = aName
        this.mParent = aParent
        this.mChilds = new Array<Directory>();
        this.mFiles = new Array<File>();
    }

    getParent() : Directory | null {
        return this.mParent;
    }

    addChild(aName: String): Directory {
        let newDir = new Directory(aName, this);
        this.mChilds.push(newDir);

        return newDir
    }

    addFile(aName: String, aSize: number) {
        this.mFiles.push(new File(aName, aSize));
    }

    getChildDir(aName: String): Directory | null {
        let found = this.mChilds.find(dir => dir.mName === aName)
        if(found)
          return found
        
        return null
    }

    getSize(): number {

        let filesSize = this.mFiles.map(file => file.mSize)
                                   .reduce((acc, size) => {return acc + size}, 0);
        return filesSize + this.mChilds.map(dir => dir.getSize())
                                       .reduce((acc, size) => {return acc + size}, 0)
    }
}

let root = new Directory('/', null);
let currentDir: Directory = root

let dirs = new Array<Directory>();

input.getAsLines().forEach(line => {

    let cmd = line.split(' ');
    if(cmd[0] === '$') { // we have a command

        if(cmd[1] === 'cd') {

            if(cmd[2] === '/')
                currentDir = root;
            else if(cmd[2] === '..') {
                let upDir = currentDir.getParent();
                if(upDir) // we can change directory
                  currentDir = upDir;
            }
            else {
                let childDir = currentDir.getChildDir(cmd[2]);
                if(childDir) // we can change directory
                  currentDir = childDir;
            }
        }
        else if(cmd[1] === 'ls') { // list dir content
            // nothing to do here
        }
    }
    else if(cmd[0] === 'dir') { 
        dirs.push(currentDir.addChild(cmd[1]));
    }
    else {
        currentDir.addFile(cmd[1], Number(cmd[0]));
    }
})

let minReqFreeSapce = 30000000 - (70000000 - root.getSize());
let minEnoughtSpace = new Array<number>();

dirs.forEach(dir => {
    let dirSize = dir.getSize();
    if(dirSize >= minReqFreeSapce)
      minEnoughtSpace.push(dirSize)
})

console.log(Math.min(...minEnoughtSpace))