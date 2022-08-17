
console.log("Script is loaded")




const weatherform=document.querySelector('form')

const search=document.querySelector('input')

const msgone=document.querySelector('#message1')
const msgtwo=document.querySelector('#message2')


weatherform.addEventListener('submit',(e)=>{
    
    e.preventDefault()
    const location=search.value

    msgone.textContent="Loading..."
    msgtwo.textContent=" "


    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
    
            if(data.error){
                msgone.textContent=data.error
            }else{
                msgone.textContent=data.location
                msgtwo.textContent=data.forecastData
                
            }
    
    
            
        })
    })


})