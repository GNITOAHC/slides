// Repo URL
const repo = 'github/gnitoahc/slides/blob/main/'
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
  return `
    <div class="relative p-5 rounded w-full hover:bg-white/10">
      <div class="flex w-full relative">
        <a class="text-white" href="#${file.name}">${file.name}</a>
        &nbsp;<a href="${pdfPrefix}${file.path}" class="h-3 w-3"><link-icon class="h-3 w-3"></link-icon></a>
        <p class="text-white absolute right-2">${getDate(file.date)}</p>
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

async function main() {
  // Retrieve files from JSON
  let files = await fetchFiles()

  // Preprocess files
  files = files.files // Set files to the JSON's files object
  files.forEach((file) => (file.path = file.path.replace('${repo}', repo))) // Replace ${repo} with the actual repo
  files = files.sort((a, b) => sortFunc(a, b)) // Sort files by date

  // Set the document
  setDoc(files)
}
main()
