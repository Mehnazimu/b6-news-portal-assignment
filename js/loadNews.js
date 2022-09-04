const loadNewsData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch(error => console.log(error))

}
// load news category names
const displayNewsCategory = categories => {
    const newsCategorySection = document.getElementById('menu-bar');
    categories.forEach(item => {
        // console.log(item.category_name);
        const ul = document.createElement('ul');
        ul.classList.add('menu','menu-horizontal','bg-base-100')
        ul.innerHTML = `
        <li><a onclick=loadCatDetails("${item.category_id}")>${item.category_name}</a></li>     
        `;
        newsCategorySection.appendChild(ul);
        // console.log(ul);

        // const li = document.createElement('li');
        // li.innerHTML = `<li><a>${category.category_name}</a></li>`;
        // newsCategorySection.appendChild(li);
        // <ul  class="menu menu-horizontal bg-base-100">

    });
}

// Load category details
const loadCatDetails = (newsId) => {
   console.log(newsId);
   const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`
   fetch(url)
   .then(res => res.json())
   .then(data =>displayCatDetails(data.data))
   .catch(error => console.log(error))

 }

// display country details
// const {author, details, image } = news;
const displayCatDetails = news => {
    
    // console.log(news);
   
        const newsContainer =document.getElementById('cat-details');
        newsContainer.innerHTML = '';
        for(items of news){
            console.log(items);
            
           const catDetailsDiv = document.createElement('div');
           catDetailsDiv.classList.add('card' , 'lg:card-side', 'bg-base-100', 'shadow-xl');

        catDetailsDiv.innerHTML=`
       <figure><img class="w-80" src="${items.image_url}" alt="Album"></figure>
        <div class="card-body">
         <h2 class="font-bold">${items.title}</h2>
         <p>"${items.details.slice(0,300)}"</p>
         <div class="flex justify-evenly">
         <div><span class="font-bold">${items.author.name}<span></div>
         <div><span class="font-bold">views :${items.total_view} </span></div>
         <div><span class="font-bold">ratings :${items.rating.number} ${items.rating.badge} </span></div>
         </div>
        <div class=" ">
        <label for="my-modal-3" class="btn modal-button">more</label>


        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box relative">
                <label for="my-modal-3"
                    class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 id="details -news-modal" class="text-lg font-bold">author :${items.author.name}</h3>
                <p class="py-4">${items.author.published_date}</p>
            </div>
        </div>
        </div>
    </div>
    `;
     newsContainer.appendChild(catDetailsDiv);
    }

    


}

loadNewsData();