import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaSearch, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarker, FaArrowRight, FaPlus } from 'react-icons/fa';
import backgroundImage from '../assets/images/background.png';
import bruger from '../assets/images/b (1).png';
import burger2 from '../assets/images/b (2).png';
import burger3 from '../assets/images/b (5).png';
import logo from '../assets/images/logo.png';
import PizzaCard from '../components/PizzaCard';
import Menubg from '../assets/images/menu-bg.png';
import { usePizza } from '../context/PizzaContext';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Pasta from '../assets/images/pasta.png';
import PastaVideo from '../assets/images/foodVideo.mp4';
import Fastfood1 from '../assets/images/section3(1).png';
import Fastfood2 from '../assets/images/section3(2).png';
import Ceo from '../assets/images/ceo.png';
import PosterBurger from '../assets/images/poster-burger.png';
import Salad from '../assets/images/salad.png';
import Formbg from '../assets/images/formbg.png';
import Reservation from '../components/ReservationForm';
import Salad1 from '../assets/images/formbg3.png';
import FooterImage1 from '../assets/images/footer-food (1).png';
import FooterImage2 from '../assets/images/footer-food (2).png';






const Home = () => {
  const [selectedImage, setSelectedImage] = useState(bruger);
  const { state, fetchPizzas } = usePizza();
  const { pizzas, loading, error } = state;



  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleMouseEnter = () => {
    if (isPlaying) {
      setShowControls(true);
    }
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };


  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  if (loading) return <Loading />;
  if (error) return <Error />;


  const imageOptions = [
    { src: bruger, alt: 'Burger 1' },
    { src: burger2, alt: 'Burger 2' },
    { src: burger3, alt: 'Burger 3' },
  ];

  return (
    <div className="relative">
      {/* Main */}
      <section id='main'>
        {/* Top bar */}
        <div className="bg-[#e90028] text-white py-2 text-xs md:text-sm flex items-center px-4 md:px-8">
          <div className="flex-grow"></div>

          <div className="text-center">
            Free Delivery on all orders Over $50
          </div>

          <div className="flex-grow flex justify-end space-x-2 md:space-x-4 items-center text-xs md:text-sm">
            <span className="hidden md:flex items-center space-x-1">
              <FaMapMarker />
              <span>Rd. Allentown, New Mexico 31134</span>
            </span>

            <div className="flex space-x-2">
              <FaFacebookF className="hover:text-gray-200 cursor-pointer" />
              <FaTwitter className="hover:text-gray-200 cursor-pointer" />
              <FaInstagram className="hover:text-gray-200 cursor-pointer" />
              <FaLinkedinIn className="hover:text-gray-200 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="bg-[#e90028]">
          <nav className="relative bg-[#010f1c] flex items-center justify-between px-4 md:px-8 py-3 md:py-4 text-white">
            <div className="flex items-center">
              <div className="">
                <img src={logo} alt="PIZZAN Logo" className="h-10 md:h-14 w-auto" />
              </div>
            </div>

            <ul className="hidden md:flex space-x-6 md:space-x-8 text-base md:text-lg font-medium">
              <li>
                <a href="#home" className="hover:text-red-600 flex items-center space-x-2">
                  <span>Home</span> <FaPlus className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-red-600 flex items-center space-x-2">
                  <span>Menu</span> <FaPlus className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-red-600 flex items-center space-x-2">
                  <span>Shop</span> <FaPlus className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#pages" className="hover:text-red-600 flex items-center space-x-2">
                  <span>Pages</span> <FaPlus className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#offer" className="hover:text-red-600 flex items-center space-x-2">
                  <span>Offers</span> <FaPlus className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-red-600 flex items-center space-x-2">
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>


            <div className="flex items-center space-x-4 md:space-x-6">
              <FaSearch className="text-xl md:text-2xl cursor-pointer hover:text-yellow-500" />
              <FaShoppingCart className="text-xl md:text-2xl cursor-pointer hover:text-yellow-500" />
              <a href="#reservation">
                <button className="bg-[#e90028] flex items-center justify-center space-x-2 text-white px-3 md:px-4 py-2 rounded-sm font-semibold hover:bg-red-700">
                  <span>BOOK A TABLE</span>
                  <FaArrowRight />
                </button>
              </a>
            </div>
          </nav>
        </div>

        {/* Main section */}
        <div
          className="px-4 md:px-10 relative bg-cover bg-center h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] flex items-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Text container */}
          <div className="relative ml-4 sm:ml-12 md:ml-40 z-10 px-2 sm:px-4 md:px-8 text-white max-w-sm sm:max-w-md md:max-w-2xl">
            <p className="font-galada text-[#e90028] mb-2 sm:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
              Welcome to PIZZAN
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-customH1 font-bold mb-2 sm:mb-4">
              GET BEST QUALITY FOOD FROM US
            </h1>
            <a href="#menu">
              <button className="flex items-center justify-center space-x-2 bg-[#e90028] text-white px-3 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-3 rounded-sm font-semibold hover:bg-red-700">
                <span>EXPLORE MENU</span>
                <FaArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
              </button>
            </a>
          </div>

          {/* Thumbnail image options */}
          <div className="absolute left-2 sm:left-4 md:left-8 space-y-2 sm:space-y-3 md:space-y-4">
            {imageOptions.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`w-8 sm:w-10 h-8 sm:h-10 cursor-pointer border-2 ${selectedImage === image.src ? 'border-red-500' : 'border-transparent'
                  } rounded`}
                onClick={() => setSelectedImage(image.src)}
              />
            ))}
          </div>

          {/* Large food image */}
          <div className="relative z-10 w-full flex justify-center md:justify-start ml-0 sm:ml-8 md:ml-32 lg:ml-56">
            <img
              src={selectedImage}
              alt="Food Illustration"
              className="h-32 sm:h-48 md:h-64 lg:h-80 xl:h-[30rem] w-auto object-contain"
            />
          </div>

        </div>

      </section>

      {/* Menu */}
      <section id="menu"
        style={{ backgroundImage: `url(${Menubg})` }}
        className="bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-white opacity-50"></div>

        <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10 lg:px-20 relative z-10">

          <div className="flex flex-col justify-center items-center text-center mb-8 sm:mb-10">
            <p className="font-galada text-[#e90028] text-xl sm:text-2xl md:text-3xl">
              Best Food Menu
            </p>
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mt-2 mb-6 sm:mb-10">
              Our Popular Food Item
            </h1>
          </div>

          {/* Pizza Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
            {pizzas.slice(0, 5).map(pizza => (
              <PizzaCard
                key={pizza.id}
                image={pizza.Image}
                name={pizza.Name}
                description={pizza.Description}
                price={pizza.Price}
              />
            ))}
          </div>
        </div>
      </section>
      {/* about us  */}
      <section id='aboutus'>
        <div class="flex flex-col md:flex-row items-center gap-10 pr-8">
          <div className="relative w-full md:w-3/5">
            <img src={Pasta} alt="Delicious Food" className="rounded-lg w-full" />

            <div
              className="absolute bottom-48 right-48 transform translate-x-1/2 translate-y-1/2 w-56 h-56 rounded-full overflow-hidden border-4 border-white"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
              >
                <source src={PastaVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play Button */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex justify-center items-center cursor-pointer"
                  onClick={handlePlay}
                >
                  <div className="bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg">
                    <i className="fas fa-play text-[#e90028] text-xl"></i>
                  </div>
                </div>
              )}

              {isPlaying && showControls && (
                <div
                  className="absolute inset-0 flex justify-center items-center cursor-pointer"
                  onClick={handlePause}
                >
                  <div className="bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg">
                    <i className="fas fa-pause text-[#e90028] text-xl"></i>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div class="w-full md:w-2/5 pr-10">
            <p class="text-xl text-[#e90028] font-galada">About Company</p>
            <h2 class="text-black text-3xl md:text-5xl font-bold my-4">Where Quality Food Meet Excellent Service.</h2>
            <p class="text-gray-600 mb-6">
              It's the perfect dining experience where every dish is crafted with fresh, high-quality ingredients and served by friendly staff who go...
            </p>

            <div class="flex flex-col md:flex-row gap-6 mb-6">
              <div class="border  p-6 rounded-lg text-start flex-1 items-start shadow-lg">
                <img src={Fastfood1} alt="Fast Foods Icon" class="mb-4 w-20 h-20 self-start" />
                <h3 class="font-bold text-xl">Fast Foods</h3>
                <p class="text-gray-500">Health foods are nutrient-Dense Foods</p>
              </div>
              <div class="border border-[#e90028] p-6 rounded-lg text-start flex-1 items-start shadow-lg">
                <img src={Fastfood2} alt="Fast Foods Icon" class="mb-4 w-20 h-20 self-start" />
                <h3 class="font-bold text-xl">Fast Foods</h3>
                <p class="text-gray-500">Health foods are nutrient-Dense Foods</p>
              </div>

            </div>

            <div class="flex items-center  gap-24  ">
              <a href="#" class="inline-flex items-center bg-red-500 text-white font-semibold py-3 px-6 rounded-sm hover:bg-red-600 transition duration-300">
                ABOUT MORE
                <FaArrowRight class="ml-2" />
              </a>

              <div class="flex items-center">
                <img src={Ceo} alt="CEO Image" class="w-16 h-16 rounded-full" />
                <div className='ml-4'>
                  <h4 class=" text-lg font-bold">Ronald Richards</h4>
                  <p class="text-gray-500">Founder CEO</p>
                </div>
              </div>
            </div>

          </div>
        </div>


      </section>

      {/* Offers */}
      <section id="offer">
        <div
          className="flex items-center justify-start h-[650px]" 
          style={{ backgroundImage: `url(${PosterBurger})` }} 
        >
          <div className=" ml-10 mt-14 px-16 py-10  text-start"> 
            <p className="font-galada text-white mb-2 sm:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
              Welcome to PIZZAN
            </p>

            <h1 className="text-2xl sm:text-3xl text-white md:text-4xl lg:text-9xl font-customH1 font-bold mb-2 sm:mb-4">
              DELICIOUS <br /> BURGER
            </h1>
            <p className="sm:text-xl md:text-2xl lg:text-3xl text-black font-bold">
              THE BEST BURGER PIZZAN
            </p>
          </div>
        </div>
      </section>


      {/* Reservation */}
      <section id='reservation'
        className="relative flex flex-col md:flex-row items-center justify-between h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${Salad1})`,
          backgroundPosition: 'center',
          backgroundSize: 'auto',
        }}
      >
        <div
          className=" flex items-center justify-center w-full md:w-2/3 h-[70vh] md:h-[90vh] p-4 md:p-10 relative z-10 rounded-none md:rounded-tr-full md:rounded-br-full"
          style={{
            backgroundImage: `url(${Formbg})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className="absolute inset-0 bg-black opacity-80 rounded-none md:rounded-tr-full md:rounded-br-full"
            style={{ pointerEvents: 'none', zIndex: 0 }}
          ></div>

          <div className="w-3/4  relative z-10 justify-center">

            <p className="font-galada text-[#e90028] mb-2 sm:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl">
              Booking Table
            </p>
            <h1 className="text-2xl sm:text-3xl text-white md:text-4xl lg:text-7xl font-bold mb-2 sm:mb-4">

              Make A Reservation         </h1>
            <Reservation />
          </div>
        </div>
      </section>

      {/* contact us  */}
      <section id='contact'>
        <footer className="bg-black text-gray-300 py-10 px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* About Restaurant */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg border-b-2 border-red-600 inline-block">
                About Restaurant
              </h3>
              <p>
                Quickly supply alternative strategic theme areas vis-a-vis B2C mindshare.
                Objectively repurpose stand-alone synergy via user-centric architectures.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Our Menus */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg border-b-2 border-red-600 inline-block">
                Our Menus
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white flex items-center "><span>Burgers</span><FaArrowRight class="ml-2" /></a></li>
                <li><a href="#" className="text-gray-400 hover:text-white flex items-center"> <span>Desserts</span> <FaArrowRight class="ml-2" /></a></li>
                <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><span>Pasta</span><FaArrowRight class="ml-2" /></a></li>
                <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><span>Vegetable</span><FaArrowRight class="ml-2" /></a></li>
                <li><a href="#" className="text-gray-400 hover:text-white flex items-center"><span>Korean Food</span><FaArrowRight class="ml-2" /></a></li>
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg border-b-2 border-red-600 inline-block">
                Recent Posts
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <img src={FooterImage1} alt="Post" className="w-24 h-24 rounded" />
                  <div>
                    <p className="text-white">New Restaurant Town Our Ple Award</p>
                    <span className="text-gray-400 text-sm">Nov 16 2022</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img src={FooterImage2} alt="Post" className="w-24 h-24 rounded" />
                  <div>
                    <p className="text-white">Innovative Hot Chessyraw Make Creator.</p>
                    <span className="text-gray-400 text-sm">Nov 16 2022</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Now */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg border-b-2 border-red-600 inline-block">
                Contact Now
              </h3>
              <div className="space-y-2">
                <p className="flex items-start">
                  <i className="fas fa-map-marker-alt text-red-600 mr-2"></i>
                  1403 Washington Ave, New Orleans, LA 70130, United States
                </p>
                <p className="flex items-start">
                  <i className="fas fa-phone-alt text-red-600 mr-2"></i>
                  (+1) 123 456 7890 <br />
                  (+1) 098 765 4321
                </p>
                <p className="flex items-start">
                  <i className="fas fa-envelope text-red-600 mr-2"></i>
                  info@pizzan.com <br />
                  info.example@pizzan.com
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 bg-gray-900 py-6 px-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <h3 className="text-white text-lg mb-4 md:mb-0">Subscription News</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="py-2 px-4 bg-gray-800 text-white rounded-l-lg"
                />
                <button className="bg-red-600 text-white py-2 px-4 rounded-r-lg">
                  SUBSCRIBE <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex mt-4 text-gray-500 text-sm justify-between">
            <p className="w-1/2">
              Copyright © 2022 Pizzan. All Rights Reserved by Themeholy
            </p>
            <div className="w-1/2 text-right space-x-4">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
            </div>
          </div>

        </footer>

      </section>


    </div>
  );
};

export default Home;
