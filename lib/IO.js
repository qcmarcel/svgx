import {writeFile, readFile, statSync, readdir} from "fs"
import * as console from "node:console";

const READ_CALLBACK = (err, data) => {
    if (err) {
        console.warn(err)
        return
    }
    console.debug(data)
}

const WRITE_CALLBACK = (err) => {
    if (err) {
        console.warn(err)
    }
    console.log('The file has been saved!')
}

const DATA_JSON = 'data.json'

const JSON_EXAMPLE = JSON.stringify({name: 'John Doe', age: 33})

const SVG_END = "</svg>";

const embedScript = (script) => {
    return `<script xmlns="http://www.w3.org/2000/svg" type="text/javascript" >${script}</script>`
}

export class IO {
    
    constructor({path = DATA_JSON, content = JSON_EXAMPLE}) {
        this._path = path
        this.content = content
    }

    set replacement(value) {
        this._replacement = value;
    }

    get path() {
        return this._path
    }

    get content() {
        return this._content
    }

    set path(value) {
        this._path = value
    }

    set content(value) {
        this._content = value
        if (this._content.length > 0) {
            this.replacement = [SVG_END, embedScript(this._content)+SVG_END]
        }
    }

    readDir(callback = READ_CALLBACK) {
        return readdir(this._path, callback)
    }

    isDirectory() {
        try {
            const stat = statSync(this._path)
            return stat.isDirectory()
        } catch (error) {
            console.warn(error)
            return false
        }
    }

    read(callback = READ_CALLBACK) {
        return readFile(this._path, callback)
    }

    write(callback = WRITE_CALLBACK) {
        writeFile(this._path, this._content, callback)
    }

    writeReplace() {
        if (this._replacement) {
            const [old, new_] = this._replacement
            this.read((err, data) => {
                if (err) {
                    console.warn(err)
                    return
                }
                this._content = data.toString().replace(old, new_)
                console.debug(this._path, this._content)
                this.write()
            })
        }
    }
}