const params = new URLSearchParams(window.location.search)
function setStyle (entries) {
    const {done, value} = entries.next()
    if (done) return
    const newStyle = {[value.shift()]: value.pop()}
    console.debug(newStyle)
    document.querySelectorAll('path')?.forEach((path)=>{
        path.style[Object.keys(newStyle).shift()] = Object.values(newStyle).shift()
    })
    setStyle(entries)
}
setStyle(params.entries())
