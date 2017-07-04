export function saveFile(data, filename) {
  let a = document.createElement('a'),
    blob = new Blob([JSON.stringify(data)], {type: 'text/plain;charset=utf-8'}),
    url = window.URL.createObjectURL(blob);
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  console.log(a);
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
