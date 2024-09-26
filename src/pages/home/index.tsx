import Header from '../../components/header';
import Navbar from '../../components/nav';
import FooterComponent from '../../components/footer';

const HomePage = () => {
    

    return (
        <div>
            <Header />
            <Navbar />
            {/* Hero section with video */}
            <div className="relative overflow-hidden w-full h-[680px] bg-gray-900">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <FooterComponent />
        </div>
    );
};

export default HomePage;
