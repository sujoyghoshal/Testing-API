const URL="https://apitest-6zir.onrender.com/api/show";
    let FetchApi=async()=>{
        let table=document.querySelector('#table');
        const div=document.querySelector('#div');
        let responce=await fetch(URL);
        let data=await responce.json();
        data.forEach((item)=>{
            console.log(item);
            let tr=document.createElement('tr');
            let td1=document.createElement('td');
            let td2=document.createElement('td');
            let td3=document.createElement('td');
            let td4=document.createElement('td');
            td1.innerHTML=item.id;
            td2.innerHTML=item.name;
            td3.innerHTML=item.email;
            td4.innerHTML=`<a href="${item.git}">${item.git}</a>`;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            table.appendChild(tr);
        })
    }
    FetchApi();