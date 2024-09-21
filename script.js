const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")



let ready = false
let  imageLoaded = 0
let totalImages = 0

let photoArray = []


//  Unsplash API
let count = 4
const apiKey = "LLdjL06Hc7vlDP_T06QEd9NjH0i3_PCuEJRYNa0PPA4"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// check if all images were loaded
function imgLoaded(){  
  imageLoaded++
  console.log(imageLoaded)
  if (imageLoaded === totalImages){
    ready = true
    loader.hidden = true
    console.log("ready = ", ready)
    console.log("total Images",totalImages  )
    count = 30
  }

}
// Helper function to set attributes on dom element 
function setAttributes(element, attributes) {
  for (const key in attributes) { 
    element.setAttribute(key, attributes[key])
   }
}



// Create Elements for links and photos, add to dom

function displayPhotos(){
  imageLoaded = 0
  totalImages = photoArray.length
  console.log("total images", totalImages)
  photoArray.forEach((photo)=>{
    // create <a> to link to unsplash 
    const item = document.createElement("a")
   
    // 
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    })

    const img = document.createElement("img")
    // 
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })

    // Event listener, check when each is finished loading 
    img.addEventListener("load",imgLoaded)


      // put <img> inside, then put both imageContainer Element 
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}



// Get photos form unsplash API

async function getPhotos(){
  try {
    const response = await fetch(apiUrl)
    photoArray = await response.json()
    console.log(photoArray)
    displayPhotos()
    
  } catch (error) {
    
  }
}


window.addEventListener("scroll", ()=>{
  if ( window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
    getPhotos()
    ready = false
  }
})


// photo on going 
getPhotos()
 
