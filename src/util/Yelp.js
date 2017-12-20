const apiKey = 'YFekqBc9lNtp4WEyyUkmPgH4-sK8bYkU5D61XxEL0H6VS4c9pFwC8C_wTq3OX82aOKQpjOKB8dfRNl2u6HX9RTby1_25Nv63TEh3j65lcD74I4MeDo7JS5KYerA6WnYx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch( `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: { Authorization: `Bearer ${apiKey}` }
        }).then( response => {
            return response.json();
        }).then(
            jsonResponse => {
                if( jsonResponse.businesses ) {
                    console.log( jsonResponse );
                    return jsonResponse.businesses.map( business => ({
                        id: business.id,
                        url: business.url,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }))
                }
        })
    }
};

export default Yelp;