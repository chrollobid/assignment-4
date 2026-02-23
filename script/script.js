let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn'

let total = document.getElementById('total-count')
let interviewCount = document.getElementById('interview-count')
let rejectedCount = document.getElementById('rejected-count')
const available = document.getElementById('available')

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('all-cards')
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section')





function calculateCount(){
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length
if (currentStatus === 'all-filter-btn') {
        available.innerText = allCardSection.children.length;
    } else if (currentStatus === 'interview-filter-btn') {
        available.innerText = interviewList.length;
    } else {
        available.innerText = rejectedList.length;
    }
}
calculateCount()



function toggleStyle(id){
    allFilterBtn.classList.remove('bg-blue-600', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-600', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-600', 'text-white')
    
    allFilterBtn.classList.add('bg-white', 'text-black')
    interviewFilterBtn.classList.add('bg-white', 'text-black')
    rejectedFilterBtn.classList.add('bg-white', 'text-black')

    
    const selected = document.getElementById(id)
    currentStatus = id
    selected.classList.remove('bg-white', 'text-black')
    selected.classList.add('bg-blue-600', 'text-white')

    if(id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        available.innerText = interviewList.length
        renderInterview()
    }
    else if (id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden')
        available.innerText = allCardSection.children.length
        filterSection.classList.add('hidden')
    }
    else if (id == 'rejected-filter-btn'){
        available.innerText = rejectedList.length
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderRejected()
    }

}

mainContainer.addEventListener('click', function(event){
if(event.target.classList.contains('interview-btn')){
    const parentNode =event.target.parentNode.parentNode
    
    const companyName = parentNode.querySelector('.company-name').innerText
    const jobName = parentNode.querySelector('.job-name').innerText
    const locationName = parentNode.querySelector('.location').innerText
    const status = parentNode.querySelector('.status')
    const description = parentNode.querySelector('.desc').innerText
    parentNode.querySelector('.status').innerText = 'Interview'
status.classList.add('border-3', 'border-green-600', 'px-4', 'font-semibold', 'py-2', 'text-green-600' ,'rounded-md')
status.classList.remove('border-red-600', 'text-red-600');    
const cardInfo = {
        companyName, 
        jobName,
        locationName,
        status: 'Interview',
        description
    }
    const jobExist = interviewList.find(item => item.jobName == cardInfo.jobName)
    
    
    if(!jobExist){
        interviewList.push(cardInfo)
    }
    rejectedList = rejectedList.filter(item=> item.jobName !== cardInfo.jobName)

calculateCount()
if(currentStatus == 'rejected-filter-btn'){
    renderRejected()
}
}    
else if(event.target.classList.contains('rejected-btn')){
    const parentNode =event.target.parentNode.parentNode
    
    const companyName = parentNode.querySelector('.company-name').innerText
    const jobName = parentNode.querySelector('.job-name').innerText
    const locationName = parentNode.querySelector('.location').innerText
    const status = parentNode.querySelector('.status')
    const description = parentNode.querySelector('.desc').innerText
    parentNode.querySelector('.status').innerText = 'Rejected'
    status.classList.add('border-3', 'border-red-600', 'px-4', 'font-semibold', 'py-2', 'text-red-600' ,'rounded-md')
    status.classList.remove('border-green-600', 'text-green-600')
    const cardInfo = {
        companyName, 
        jobName,
        locationName,
        status: 'Rejected',
        description
    }
    const jobExist = rejectedList.find(item => item.jobName == cardInfo.jobName)
    
    
    if(!jobExist){
        rejectedList.push(cardInfo)
    }
    interviewList = interviewList.filter(item=> item.jobName !== cardInfo.jobName)
    if(currentStatus == 'interview-filter-btn'){
        renderInterview()
        
    }
    calculateCount()
}    
if (event.target.closest('.delete-btn')) {
        const card = event.target.closest('.card');
        const jobName = card.querySelector('.job-name').innerText;

      
        if (card.parentElement.id === 'all-cards') {
            card.remove();
        }

        
        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        
        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }

})

function noJob(tabName) {
    return `
        <div class="flex flex-col items-center justify-center py-20 text-center w-full col-span-full">
            
            <h3 class="text-2xl font-bold text-gray-700">No jobs Available</h3>
            
        </div>
    `;
}
function renderInterview(){
    filterSection.innerHTML = ''
   if (interviewList.length === 0) {
        filterSection.innerHTML = noJob('Interview');
        return;
    }

    for(let interview of interviewList){
        console.log(interview);
        filterSection.className = 'space-y-6';
        let div = document.createElement('div')
        div.className = 'card flex justify-between shadow rounded-md p-5 hover:bg-green-200 hover:translate-1 duration-300 ease-in-out'
        div.innerHTML = `
    
            <div class="left space-y-5">
<h2 class="text-xl font-semibold company-name">${interview.companyName}</h2>
<p class=" text-[#64748B] job-name ">${interview.jobName}</p>
<p class=" text-[#64748B] location">${interview.locationName}</p>
<p class="status py-2 px-4 border-3 border-green-600 font-semibold text-green-600 inline-block rounded-md">${interview.status}</p>
<p class="desc">${interview.description}</p>
<div class="">
    <button class="interview-btn border-3 border-green-600 px-4 py-2 text-green-600 rounded-md">Interview</button>
    <button class="rejected-btn border-3 border-red-600 px-4 py-2 text-red-600 mx-3 rounded-md">Rejected</button>
</div>
            </div>
            <div class="right">
                <button class="delete-btn px-3 py-2 rounded-full shadow"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
        `
        filterSection.appendChild(div)
    }
}
function renderRejected(){
    filterSection.innerHTML = ''

   if (rejectedList.length === 0) {
        filterSection.innerHTML = noJob('Rejected');
        return;
    }

    for(let rejected of rejectedList){
        console.log(rejected);
        filterSection.className = 'space-y-6';
        let div = document.createElement('div')
        div.className = 'card flex justify-between shadow rounded-md p-5 hover:bg-red-200 hover:translate-1 duration-300 ease-in-out'
        div.innerHTML = `
        <div class="left  space-y-5">
                <h2 class="text-xl font-semibold company-name">${rejected.companyName}</h2>
                <p class="text-[#64748B] job-name">${rejected.jobName}</p>
                <p class="text-[#64748B] location">${rejected.locationName}</p>
                <p class="status py-2 px-4 border-3 border-red-600 bg-red-100 text-red-600 inline-block rounded-md">${rejected.status}</p>
                <p class="desc">${rejected.description}</p>
                <div class="flex gap-3">
                    <button class="interview-btn border-3 border-green-600 px-4 py-2 text-green-600 rounded-md">Interview</button>
                    <button class="rejected-btn border-3 border-red-600 px-4 py-2 text-red-600 rounded-md">Rejected</button>
                </div>
            </div>
            <div class="right">
                <button class="delete-btn px-3 py-2 rounded-full shadow "><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `
        filterSection.appendChild(div)
    }
}

