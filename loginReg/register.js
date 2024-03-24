const cities = {
    1: "Ahmednagar",
    2: "Akola",
    3: "Amravati",
    4: "Aurangabad",
    5: "Beed",
    6: "Bhandara",
    7: "Buldhana",
    8: "Chandrapur",
    9: "Dhule",
    10: "Gadchiroli",
    11: "Gondia",
    12: "Hingoli",
    13: "Jalgaon",
    14: "Jalna",
    15: "Kolhapur",
    16: "Latur",
    17: "Mumbai",
    18: "Mumbai",
    19: "Nagpur",
    20: "Nanded",
    21: "Nandurbar",
    22: "Nashik",
    23: "Osmanabad",
    24: "Palghar",
    25: "Parbhani",
    26: "Pune",
    27: "Raigad",
    28: "Ratnagiri",
    29: "Sangli",
    30: "Satara",
    31: "Sindhudurg",
    32: "Solapur",
    33: "Thane",
    34: "Wardha",
    35: "Washim",
    36: "Yavatmal"
  };
  
 let city=document.querySelector("#cities");

 for(let i = 1; i <= 36; i++)
 {
     let option = document.createElement("option");
     option.value = cities[i];
     option.innerHTML = cities[i];
     city.appendChild(option);
 }