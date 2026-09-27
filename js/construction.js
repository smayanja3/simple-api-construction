document.querySelector('button').addEventListener('click', warning)

function warning() {
    const inputVal = document.querySelector('input').value
    const url = `https://api.waterdata.usgs.gov/rtfi-api/referencepoints/flooding?date=${inputVal}`
    const container = document.querySelector('#resultContainer')

    if(!inputVal){
        alert('Please select a date first!')
        return;
    }
 
    fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json' 
        }
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data)

            // clears past list 
            container.innerHTML = '';
        
            const ul = document.createElement('ul')
            ul.classList.add('siteList')

            // count how many each site appears
            const siteCount = data.reduce((acc, current) => {
                const siteName = current.site_name

                // if the site is not in the count yet add it to the count
                if(!acc[siteName]){
                    // create a li to hold the list item
                    const li = document.createElement('li')
                    li.classList.add('siteItem')
                    li.textContent = `${siteName}`
                    //add the li to our ul container
                    ul.appendChild(li)
                // add a count to this site location
                    acc[siteName]= {
                        count: 0,
                        element: li
                    };
                }
                // add a count and update the original count
                acc[siteName].count +=1;
                //print this information to the DOM
                // look inside this element and find its current count. take it and print its content to the DOM/ 
                acc[siteName].element.textContent = `${siteName.toUpperCase()}: ${acc[siteName].count}`
                
                
                //${siteName} prints the name of the site
                //${acc[siteName].count} prints the current, updated number for that site.

                return acc;
            }, {}); // start with an empty object to list can start counting 

            console.log("Site counts:", siteCount) 


            // //Append CHILD ?????
            // const ul = document.createElement('ul');
            // const li = document.createElement('li');
            // li.textContent = `${siteName}: ${count}`
            // ul.appendChild(li)

            container.appendChild(ul)


            // show the results in the html container
        })
         .catch(err => {
            console.log(`error ${err}`)
        })


        // const flood = data.reduce((acc, curr) => {
        //     const key = current.
        // })
}


//  // to much data pick a random index from the array
            // const randomIndex = Math.floor(Math.random() * data.length)
            // //grab just one from the array
            // const single = data[randomIndex]
            // console.log(single)