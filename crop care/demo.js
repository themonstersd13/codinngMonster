let DaysCounter=document.querySelector(".DaysCounter");
let lDiv1=document.querySelector(".lDiv1Inside");
let apilink=`https://api.api-ninjas.com/v1/weather?city=`;
let DATA =localStorage.getItem("savedData");
let jsonDATA = JSON.parse(DATA);
const vectorData=jsonDATA.checked.checked;
const cropName=jsonDATA.checked.cropName;
const tDay=crops[cropName].days;
console.log(jsonDATA)
lDiv1.innerText=tDay+" days left";
let data1=crops[cropName.toLowerCase()].watercycle;
let data2=crops[cropName.toLowerCase()].pesticides;
let lDivInside3=document.querySelector(".lDiv3Inside");
lDivInside3.innerText=cropName;
let data=[];
data1.forEach((ele)=>{
  for(let i=ele;i<=ele+1;i++)
  {
    data.push((i));
  }
  
})
let lDiv3=document.querySelector(".lDiv3");
let lDiv3Img=document.createElement("img");
lDiv3Img.setAttribute("class","clock");
lDiv3Img.src=`${cropName}.png`;
// let td3=document.querySelector(".td3");
// let td3Img=document.createElement("img");
// td3Img.setAttribute("class","clock");
// td3Img.src=`${cropName}.png`;
// td3.append(td3Img);
lDiv3.append(lDiv3Img);
let noOfWeeks=tDay/7;


let checked=[0];

let pestopt = '<div class="dropdown"><button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-mdb-toggle="dropdown"></button><ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">';

let pestImages = crops[cropName].pest_link;
let pestlinks = [
"https://www.indiamart.com/proddetail/arch-agriculture-pesticides-26252504273.html",
"https://www.industrybuying.com/pesticide-ebs-AGR.PES.524261238/",
"https://www.indiamart.com/proddetail/organic-liquid-pesticides-13078963248.html"];


//........................creating main content........................................................



for(let i=1;i<=noOfWeeks;i++)
{
  let WeakDiv=document.createElement("div");
  WeakDiv.setAttribute("class","WeakDiv container row p-3");
  let para1=document.createElement("p");
  para1.setAttribute("class","para1");
  para1.innerText=`Week ${i}`;
  
  DaysCounter.append(para1);
  // DaysCounter.append(WeakDiv);
  let DaysCounter01=document.createElement("div");
  DaysCounter01.setAttribute("class","bigWaek");
  DaysCounter.append(DaysCounter01);

  DaysCounter01.append(WeakDiv);
  for(let k=1;k<=7;k++)
  {
    let daysdiv=document.createElement("div");
    if(data.includes(((i-1)*7)+k))
    {
      daysdiv.setAttribute("class",`daysDiv p-3 ml-2 water `);
      
     
    }
    else if(data2.includes(((i-1)*7)+k))
    {
      daysdiv.setAttribute("class",`daysDiv p-3 ml-2 pest`);
      
    }
    else 
    {
      daysdiv.setAttribute("class",`daysDiv p-3 ml-2`);
      
    }
    daysdiv.id =`${((i-1)*7)+k}`;
    daysdiv.innerText=((i-1)*7)+k;
    WeakDiv.append(daysdiv);
  }
}


//...................................................finished here.................................................



let pestdiv = document.querySelectorAll(".pest");


//.................................................................................................................

let i=0;
pestImages.forEach((elee)=>{
  
let pestoptTemp=pestopt;
pestoptTemp+=` <li><a class="dropdown-item "><img height="80px" src="${elee}"width="120px"></a></li>`;
pestoptTemp += '</ul></div>';
pestdiv[i].innerHTML=pestoptTemp;
i++;
});


let dropdownopt=document.querySelectorAll(".dropdown");
dropdownopt.forEach((target)=>{
  target.addEventListener("click",()=>{
    let parentEle=target.parentElement;
    parentEle.setAttribute("class", `daysDiv p-3 ml-2`);
     parentEle.style.backgroundColor="#66B539";
     let loop=parentEle.id;
     
     parentEle.innerText=((loop*1)+1);
     target.remove(target.selectedIndex);
    
  })
})


//....................................................update the checked................................................


function updateCheckedData(username, password, updatedVector) {

  console.log("Running the my funtion ");
  console.log(username);
  console.log(password);
  console.log(updatedVector);
  const requestData = {
    username: username,
    password: password,
    updatedVector: updatedVector
  };

  fetch('http://localhost:3000/updateVector', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to update checked data');
  })
  .then(data => {
    console.log(data.message); // Log success message from backend
    // You can do something with the response data if needed
  })
  .catch(error => {
    console.error('Error updating checked data:', error.message);
  });
}

// let usern=jsonDATA.username;
// let pass=jsonDATA.password;
// updateCheckedData(usern,pass,checked);
//..................................................................................................................
let td1=document.querySelector(".td1");
let daysDiv=document.querySelectorAll(".daysDiv");
//...............................................retrive checked + main working....................................................
function getCheckedData(username, password) {
  const requestData = { username, password };

  fetch('http://localhost:3000/getCheckedData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Invalid username or password');
  })
  .then(data => {
    // checked=data.checked;
    console.log(data.checked);
    return data.checked;
    // console.log(data,checked)
    // console.log('Checked data:', data.checked); // Log the retrieved checked data
    // You can do something with the retrieved data if needed
  })
  .then(checked=>{
    
    let numbers = checked.map(Number); 
    let max = Math.max(...numbers); 
    console.log(max);
    let DATA1 =localStorage.getItem("savedData");
        let jsonDATA1 = JSON.parse(DATA1);
        const cropName1=jsonDATA1.checked.cropName;
        let data11=crops[cropName1.toLowerCase()].watercycle;
        let data22=crops[cropName1.toLowerCase()].pesticides;
        let data00=[];
        data11.forEach((ele)=>{
          for(let i=ele;i<=ele+1;i++)
          {
            data00.push((i));
          }
          
        })
        if(max>0)
        {
          lDiv1.innerText=(tDay-max)+" Days Left";
          td1.innerText=(tDay-max)+" Days Left";
        }
        else{
          lDiv1.innerText=(tDay)+" Days Left";
          td1.innerText=(tDay)+" Days Left";
        }
    for(i=0;i<max-1;i++)
    {
      if(!checked.includes(i+1))
      {
        
        if(data00.includes(i+1) || data22.includes(i+1)){
        daysDiv[i].setAttribute("class", `daysDiv p-3 ml-2 daysdiv${i+1}`);
        daysDiv[i].style.backgroundColor = "red";
        daysDiv[i].style.border = "5px solid red";
        }
        else
        {
          daysDiv[i].setAttribute("class", `daysDiv p-3 ml-2`);
          daysDiv[i].style.backgroundColor = "#66B539";
          daysDiv[i].style.border="5px solid #66B539";
        }
        
      }
      
    }
    for(ele of checked)
    {
          daysDiv[ele-1].setAttribute("class", `daysDiv p-3 ml-2`);
          daysDiv[ele-1].style.backgroundColor = "#66B539";
          daysDiv[ele-1].style.border="5px solid #66B539";
          
    }
    daysDiv.forEach((target)=>{
      target.addEventListener("click",()=>{
        lDiv1.innerText=(tDay-target.textContent)+" Days Left";
        checked.push(target.textContent);
        td1.innerText=(tDay-target.textContent)+" Days Left";
    
    
        for(i=target.textContent;i>=1;i--)
          {
            if(!checked.includes(daysDiv[i-1].textContent) && (data00.includes(daysDiv[i-1].textContent) || data22.includes(daysDiv[i-1].textContent)))
            {
                daysDiv[i-1].setAttribute("class", `daysDiv p-3 ml-2 daysdiv${i}`);
                daysDiv[i-1].style.backgroundColor = "red";
                daysDiv[i-1].style.border = "5px solid red";
                daysDiv[i-1].innerText=i;
            }
            else
            {
              daysDiv[i-1].setAttribute("class", `daysDiv p-3 ml-2 daysdiv${i}`);
                daysDiv[i-1].style.backgroundColor = "#66B539";
                daysDiv[i-1].style.border = "5px solid #66B539";
                daysDiv[i-1].innerText=i;
            }
          }
           target.setAttribute("class", `daysDiv p-3 ml-2 daysdiv${target.textContent}`);
            target.style.backgroundColor = "#66B539";
            target.style.border="5px solid #66B539";
            target.innerText=target.textContent;
          
    
          let  lota =  localStorage.getItem("savedData");
          let meta = JSON.parse(lota);
          let  password = meta.checked.password;
          let username = meta.checked.username;
          
          console.log(checked);
          city=meta.checked.district;
          updateCheckedData(username, password, checked);
          location.reload();
            
      })
    })
  })
  .catch(error => {

daysDiv.forEach((target)=>{
  target.addEventListener("click",()=>{
    lDiv1.innerText=(tDay-target.textContent)+" Days Left";
    checked.push(target.textContent);
    td1.innerText=(tDay-target.textContent)+" Days Left";


    for(i=target.textContent;i>=1;i--)
      {
        if(!checked.includes(daysDiv[i-1].textContent) && (data.includes(daysDiv[i-1].textContent) || data.includes(daysDiv[i-1].textContent)))
        {
            daysDiv[i-1].setAttribute("class", `daysDiv p-3 ml-2 daysdiv${i}`);
            daysDiv[i-1].style.backgroundColor = "red";
            daysDiv[i-1].style.border = "5px solid red";
            daysDiv[i-1].innerText=i;
        }
        else
        {
          daysDiv[i-1].setAttribute("class", `daysDiv p-3 ml-2 daysdiv${i}`);
            daysDiv[i-1].style.backgroundColor = "#66B539";
            daysDiv[i-1].style.border = "5px solid #66B539";
            daysDiv[i-1].innerText=i;
        }
      }
       target.setAttribute("class", `daysDiv p-3 ml-2 daysdiv${target.textContent}`);
        target.style.backgroundColor = "#66B539";
        target.style.border="5px solid #66B539";
        target.innerText=target.textContent;
        let  lota =  localStorage.getItem("savedData");
          let meta = JSON.parse(lota);
          let  password = meta.checked.password;
          let username = meta.checked.username;
          
          console.log(checked);
          city=meta.checked.district;
          updateCheckedData(username, password, checked);
      })
    })


    console.error('Error retrieving checked data:', error.message);
  });
}
 //...................................................refress issue resolved........................................................
 let  metaj =  localStorage.getItem("savedData");
 let meta = JSON.parse(metaj);
 let  password = meta.checked.password;
 let username = meta.checked.username;
checked=getCheckedData(username,password);
console.log("get  ",checked)


//..................................................................................................................................
// let daysDiv=document.querySelectorAll(".daysDiv");
// daysDiv.forEach((target)=>{
//   target.addEventListener("click",()=>{
//     lDiv1.innerText=(tDay-target.textContent)+" Days Left";
//     checked.push(target.textContent);
//     td1.innerText=(tDay-target.textContent)+" Days Left";


//     for(i=target.textContent;i>=1;i--)
//       {
//         if(!checked.includes(daysDiv[i-1].textContent) && (data00.includes(daysDiv[i-1].textContent) || data22.includes(daysDiv[i-1].textContent)))
//         {
//             daysDiv[i-1].setAttribute("class", `daysDiv p-3 ml-2 daysdiv${i}`);
//             daysDiv[i-1].style.backgroundColor = "red";
//             daysDiv[i-1].style.border = "5px solid red";
//             daysDiv[i-1].innerText=i;
//         }
//         else
//         {
//           daysDiv[i-1].setAttribute("class", `daysDiv p-3 ml-2 daysdiv${i}`);
//             daysDiv[i-1].style.backgroundColor = "#66B539";
//             daysDiv[i-1].style.border = "5px solid #66B539";
//             daysDiv[i-1].innerText=i;
//         }
//       }
//        target.setAttribute("class", `daysDiv p-3 ml-2 daysdiv${target.textContent}`);
//         target.style.backgroundColor = "#66B539";
//         target.style.border="5px solid #66B539";
//         target.innerText=target.textContent;
//       })
//     })



//........................................................weather api..............................................................


const API_KEY="d1845658f92b31c64bd94f06f7188c9c";

let  td2in=document.querySelector(".td2in");
let weatherDiv=document.querySelector(".lDiv2In");
async function fetchWeather() {
  try {
    let p =localStorage.getItem("savedData");

    let g = JSON.parse(p);
    let cities=g.checked.district;
  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${API_KEY}&units=metric`);
    const dataimp = await response.json();
    let parag1=document.createElement("p");
    let parag0=document.createElement("p");
    let parag2=document.createElement("p");
    parag0.innerText=dataimp.main.temp+"\u00B0C";
    parag2.innerText=dataimp.name;
    parag1.innerText=dataimp.weather[0].description;
    let parag11=document.createElement("p");
    let parag00=document.createElement("p");
    let parag22=document.createElement("p");
    parag00.innerText=dataimp.main.temp+"\u00B0C";
    parag22.innerText=dataimp.name;
    parag11.innerText=dataimp.weather[0].description;
    weatherDiv.append(parag0);
    weatherDiv.append(parag1);
    weatherDiv.append(parag2);
    weatherDiv.style.fontSize="0.6em";
    td2in.append(parag00);
    td2in.append(parag11);
    td2in.append(parag22);
    td2in.style.fontSize="0.8em";
    
  } catch (error) {
    console.error(error);
  }
}

fetchWeather();
//........................................................Done....................................................................
