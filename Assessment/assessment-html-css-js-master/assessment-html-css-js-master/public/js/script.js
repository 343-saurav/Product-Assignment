var data = [];
fetchProducts();
var dataf=[];

async function fetchProducts() {
  const response = await fetch("http://localhost:3000/products");
  data = await response.json();
  for (let i = 0; i < data.length; i++) {
    document.getElementById("products").innerHTML += `
                 <div class="card" style="width:400px">
                    <img id="img1" class="card-img-top" src="${data[i].thumbnail}" alt="Card image">
                    <div class="card-body">
                      <h4 class="card-title">Product Title : ${data[i].title}</h4>
                      <p class="card-text">Product Description : ${data[i].description}.</p>
                      <p class="card-text">Product Rating : ${data[i].rating}</p>
                      <p class="card-text">Product Price : ${data[i].price}.</p>
                      <p class="card-text">Product Stock : ${data[i].stock}.</p>
                      <p class="card-text">Product Brand : ${data[i].brand}.</p>
                      <p class="card-text">Product Category : ${data[i].category}.</p>
                      <a href="#" id="${data[i].id}" onclick="Addfavourite(this.id)" class="btn btn-primary">Save for later</a>
                    </div>
                  </div>
            `;
  }
}
async function Addfavourite(id) {
    debugger;
    // alert("hello")
    // // var item=data.find(item=> item.id===id);
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].id === id) {
    //     var item = data[i];
    //     console.log(item)
    //   }
    // }
    // console.log(item);
    // alert(item.movieCode);
    const responseprod = await fetch("http://localhost:3000/products/"+id)
    var item = await responseprod.json();
    if (dataf.find((temp) => temp.title === item.title) != null) {
        alert("Movie already exist");
      }
      else{
    
      const response = await fetch("http://localhost:3000/saveforLater", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          rating: item.rating,
          thumbnail: item.thumbnail,
        }),
      });
      fetchFavourites();
    }
}

  async function fetchFavourites() {
    const response1 = await fetch("http://localhost:3000/saveforLater");
    dataf = await response1.json();
    for (let i = 0; i < dataf.length; i++) {
      document.getElementById("saveforlater").innerHTML += `
               <div class="card" style="width:400px">
                  <img id="img1" class="card-img-top" src="${dataf[i].thumbnail}" alt="Card image">
                  <div class="card-body">
                    <h4 class="card-title">Movie Title : ${dataf[i].title}</h4>
                    <p class="card-text">Movie Rating : ${dataf[i].rating}.</p>
                    <button id="${dataf[i].id}" class="btn btn-primary" onClick="deleteFavourite(this.id)">Delete Product</button>
                    
                  </div>
                </div>
          `;
    }
  }

  fetchFavourites();