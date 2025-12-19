const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "A charming cottage right on the sand with stunning ocean views.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing_image",
    },
    price: 1200,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in City Center",
    description: "Sleek and spacious loft in the heart of the bustling city.",
    image: {
      url: "https://media.istockphoto.com/id/174543563/photo/hotel-bedroom.webp?a=1&s=612x612&w=0&k=20&c=Ps5LvYoFTeO8XfZ0U4m7tJLjT_O6i_WtpOZkqh8TWE0=",
      filename: "listing_image",
    },
    price: 2500,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Rustic Mountain Cabin",
    description: "Get away from it all in this secluded cabin with breathtaking mountain views.",
    image: {
      url: "https://media.istockphoto.com/id/185244040/photo/hotel-room.webp?a=1&s=612x612&w=0&k=20&c=T6M-I9FBfRXQ7odaxIqzy56Y0FerdIcS_k6f1viwEeE=",
      filename: "listing_image",
    },
    price: 800,
    location: "Banff",
    country: "Canada",
  },
  {
    title: "Luxury Villa with Infinity Pool",
    description: "An exclusive villa offering the height of luxury and a spectacular infinity pool.",
    image: {
      url: "https://media.istockphoto.com/id/174789767/photo/luxury-hotel-suite.webp?a=1&s=612x612&w=0&k=20&c=mzB89EV8NTFcQgaanOfHHNwSv6RPVd8JxwzyrrwwJzw=",
      filename: "listing_image",
    },
    price: 5000,
    location: "Tuscany",
    country: "Italy",
  },
  {
    title: "Charming Apartment in Paris",
    description: "A lovely, romantic apartment in the historic district of Paris.",
    image: {
      url: "https://media.istockphoto.com/id/118953214/photo/guest-room-interior.webp?a=1&s=612x612&w=0&k=20&c=sWfLAUH8sz7GwOXmWhL9F8_LKq-Q-vuTtsj_QvNVTew=",
      filename: "listing_image",
    },
    price: 1800,
    location: "Paris",
    country: "France",
  },
  {
    title: "Desert Oasis Retreat",
    description: "A peaceful home nestled in the arid beauty of the desert landscape.",
    image: {
      url: "https://images.unsplash.com/photo-1746549854913-3be88c9e4352?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      filename: "listing_image",
    },
    price: 950,
    location: "Scottsdale",
    country: "United States",
  },
  {
    title: "Seaside Fisherman's Shack",
    description: "Authentic experience in a simple, traditional shack by the sea.",
    image: {
      url: "https://media.istockphoto.com/id/118953214/photo/guest-room-interior.webp?a=1&s=612x612&w=0&k=20&c=sWfLAUH8sz7GwOXmWhL9F8_LKq-Q-vuTtsj_QvNVTew=",
      filename: "listing_image",
    },
    price: 450,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Penthouse with Panoramic Views",
    description: "A high-end penthouse offering unmatched city and horizon views.",
    image: {
      url: "https://media.istockphoto.com/id/1312592575/photo/bedroom-hotel-class-single-bed.webp?a=1&s=612x612&w=0&k=20&c=LXoRwCTDA9DrJ8XCYA-vZ_tSm4JJRG2haepLNj6uvlg=",
      filename: "listing_image",
    },
    price: 4000,
    location: "New York",
    country: "United States",
  },
  {
    title: "Traditional Japanese Ryokan",
    description: "Experience authentic Japanese culture in this beautiful traditional inn.",
    image: {
      url: "https://images.unsplash.com/photo-1620194570048-ffaf03c75faa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
      filename: "listing_image",
    },
    price: 1500,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Historic Castle Stay",
    description: "Spend a night like royalty in a preserved historic European castle.",
    image: {
      url: "https://images.unsplash.com/photo-1655265173443-4b9ae377f9e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 3200,
    location: "Edinburgh",
    country: "United Kingdom",
  },
  {
    title: "Tropical Treehouse Getaway",
    description: "An adventurous stay high up in the lush canopy of a tropical forest.",
    image: {
      url: "https://images.unsplash.com/photo-1661258320748-6c3ec4641813?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 1100,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Minimalist Scandinavian Apartment",
    description: "Clean lines and cozy hygge design in this modern apartment.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1682377521385-bb04165dc742?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI4fHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 1400,
    location: "Stockholm",
    country: "Sweden",
  },
  {
    title: "Vineyard Estate Home",
    description: "A beautiful home surrounded by rolling vineyards and tasting rooms.",
    image: {
      url: "https://images.unsplash.com/photo-1761470371217-a4de0ff0e8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDMxfHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 2800,
    location: "Napa Valley",
    country: "United States",
  },
  {
    title: "Canal-side Houseboat",
    description: "Unique stay on a cozy houseboat right on the famous canals.",
    image: {
      url: "https://images.unsplash.com/photo-1600077625345-f401f4ba2fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM3fHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 1350,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Icy Glacier Igloo",
    description: "An unforgettable stay in a luxurious igloo with views of the northern lights.",
    image: {
      url: "https://images.unsplash.com/photo-1587874522487-fe10e954d035?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQzfHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 1900,
    location: "Lapland",
    country: "Finland",
  },
  {
    title: "Earthen Home in the Atlas Mountains",
    description: "A traditional Berber home offering a glimpse into local life and stunning views.",
    image: {
      url: "https://images.unsplash.com/photo-1734456416941-416c08f0778e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ7fHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 700,
    location: "Marrakech",
    country: "Morocco",
  },
  {
    title: "Ski-in/Ski-out Chalet",
    description: "Perfect mountain retreat with direct access to the ski slopes.",
    image: {
      url: "https://images.unsplash.com/photo-1630568238435-27b47667969b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDUxfHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 3500,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Colonial Heritage Home",
    description: "Stay in a beautifully preserved home with rich history and classic architecture.",
    image: {
      url: "https://images.unsplash.com/photo-1675409145919-277c0fc2aa7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU1fHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 1600,
    location: "Cartagena",
    country: "Colombia",
  },
  {
    title: "Bohemian Artist's Studio",
    description: "A colorful, creative studio space in an artsy neighborhood.",
    image: {
      url: "https://images.unsplash.com/photo-1673098224975-275b929f280f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU5fHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 900,
    location: "Berlin",
    country: "Germany",
  },
  {
    title: "Outback Farm Stay",
    description: "Experience the vast Australian outback from a working farm.",
    image: {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYzfHx8ZW58MHx8fHx8",
      filename: "listing_image",
    },
    price: 650,
    location: "Queensland",
    country: "Australia",
  },
];

module.exports = { data: sampleListings };