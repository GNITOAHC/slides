// Repo URL
const repo = 'github/GNITOAHC/slides/blob/main/'
// Data URL
const rawFile =
  'https://raw.githubusercontent.com/GNITOAHC/slides/main/js/files.json'
// Prefix for the href (to display PDF via nbviewer.org)
const pdfPrefix = 'https://nbviewer.org/'

async function fetchFiles() {
  const response = await fetch(rawFile)
  return await response.json()
}

// Sort files by date (newest first)
function sortFunc(a, b) {
  return a.date < b.date ? 1 : -1
}

function getDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function listComponent(file) {
  const tagComp = file.tags
    .map((tag) => {
      return `<span class="text-white bg-[#5c6bc0] rounded-md px-[3px] mx-[2px]">${tag}</span>`
    })
    .join('')
  let pdflink = file.path.startsWith('http') ? file.path : pdfPrefix + file.path
  return `
    <div class="relative p-5 rounded w-full hover:bg-white/10">
      <div class="flex flex-wrap-reverse w-full relative justify-between">
        <a class="text-white underline" href="${pdflink}">${file.name}</a>
        <p class="text-white">${getDate(file.date)}</p>
      </div>
      <p class="opacity-75">${file.desc}</p>
      <div>${tagComp}</div>
    </div>
    <hr class="w-full bg-white opacity-50"></hr>
  `
}

function setDoc(files) {
  document.getElementById('slides').innerHTML = files
    .map((file) => {
      return listComponent(file)
    })
    .join('')
}

async function handleRedirect(files) {
  const search = new URLSearchParams(window.location.search)
  const des = search.get('goto')

  for (const file of files) {
    if (des === file.short) {
      window.location.href = pdfPrefix + file.path
    }
  }

  return
}

async function main() {
  // Retrieve files from JSON
  let files = await fetchFiles()

  // Preprocess files
  files = files.files // Set files to the JSON's files object
  files.forEach((file) => (file.path = file.path.replace('${repo}', repo))) // Replace ${repo} with the actual repo
  files = files.sort((a, b) => sortFunc(a, b)) // Sort files by date

  // Set the document
  setDoc(files)

  // Handle redirect
  handleRedirect(files)
}
main()
