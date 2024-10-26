import {_process, ioFile, script} from "./lib/svgx/main.js";

const [_,__,base,...pattern]=process.argv
console.debug(process.argv, base, pattern)
const svgPathPattern = pattern.map((path)=>`${base}/${path}`)
script.read((script_err, script_data)=>{
    if (script_err) {
        console.warn(script_err)
        return
    }
    ioFile.content = script_data
    svgPathPattern?.forEach((file_path)=>{
        _process(file_path, script_data)
    })
})