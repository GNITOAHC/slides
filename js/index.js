const repo = 'github/gnitoahc/slides/blob/main/'
// Files
let files = [
  {
    name: 'TF-IDF',
    date: '2024-04-02',
    desc: 'Intro to TF-IDF - course 1122 GenAI',
    tags: ['GenAI', 'NLP'],
    path: `${repo}TF-IDF.pdf`,
  },
  {
    name: '1122CPPy-Lab02',
    date: '2024-03-05',
    desc: 'Lab02 of course Computer Programming, NCCU',
    tags: ['NCCU', 'Programming', 'CPPY'],
    path: `${repo}1122CPPy-Lab02.pdf`,
  },
  {
    name: 'DBMS-2023',
    date: '2023-01-01',
    desc: 'Description',
    tags: ['NCCU', 'Database'],
    path: 'github/gnitoahc/DBMS-2023/blob/main/pdf/%E9%A1%8C%E7%9B%AE%E8%AA%AA%E6%98%8E.pdf',
  },
]

// Prefix for the href (to display PDF via nbviewer.org)
const hrefPrefix = 'https://nbviewer.org/'

// Sort files by date (newest first)
function sortFunc(a, b) {
  return a.date < b.date ? 1 : -1
}
files = files.sort((a, b) => sortFunc(a, b))

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
        &nbsp;<a href="${hrefPrefix}${file.path}" class="h-3 w-3"><link-icon class="h-3 w-3"></link-icon></a>
        <p class="text-white absolute right-2">${getDate(file.date)}</p>
      </div>
      <p class="opacity-75">${file.desc}</p>
      <div>${tagComp}</div>
    </div>
    <hr class="w-full bg-white opacity-50"></hr>
  `
}

document.getElementById('slides').innerHTML = files
  .map((file) => {
    return listComponent(file)
  })
  .join('')
