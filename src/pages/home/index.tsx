import React from 'react';
import Header from '../../components/header';
import Navbar from '../../components/nav';
import FooterComponent from '../../components/footer';
import Title from 'antd/es/typography/Title';

const HomePage = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="relative overflow-hidden w-full h-[500px] bg-gray-900">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&loop=1&playlist=dQw4w9WgXcQ"
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
