import {IO} from "../IO.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const ioFile = new IO({})
export const SCRIPT_PATH = `${dirname(fileURLToPath(import.meta.url))}/script.js`;
export const script = new IO({path: SCRIPT_PATH})

export const _process = (file_path, content) => {
    ioFile.path = file_path
    if (ioFile.isDirectory()) {
        ioFile.readDir((readdir_err, files) => {
            if (readdir_err) {
                console.warn(readdir_err)
                return
            }
            files.forEach((file) => {
                const filename = file_path+file;
                // console.debug("filename:", filename)
                new IO({path: filename, content: content}).writeReplace()
            })
        })
    } else {
        ioFile.writeReplace()
    }
}