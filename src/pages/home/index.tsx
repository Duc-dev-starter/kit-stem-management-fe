import { Col, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {


    return (
        <div>
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
            <Title className="text-center mt-2" level={1}>How CrunchLabs Works</Title>
            <div className="grid grid-cols-3 text-center">
                <div>
                    <Title level={3} className="font-bold ">Build</Title>
                    <Image src="https://cdn.shopify.com/s/files/1/0634/1535/3575/files/CrunchLabs_HIW_01.png?v=1713021949" />
                </div>
                <div>
                    <Title level={3} className="font-bold text-center">Play and Hack</Title>
                    <Image src="https://cdn.shopify.com/s/files/1/0634/1535/3575/files/CrunchLabs_HIW_02.png?v=1713021949" />
                </div>
                <div>
                    <Title level={3} className="font-bold text-center">Think</Title>
                    <Image src="https://cdn.shopify.com/s/files/1/0634/1535/3575/files/CrunchLabs_HIW_03.png?v=1713021949" />
                </div>
            </div>
            <div style={{ backgroundColor: "#00416c" }} className="container mx-auto py-5 mb-10 px-20">
                <Row>
                    <Col span={16}>
                        <Title className="text-white" level={1}>  Thinking like an engineer means you're resilient. It's getting back up after being knocked down and approaching things differently. That determination helps kids tackle everyday challenges and it's the same determination that puts rovers on other dang planets!</Title>
                        <Title className="text-white" level={5}>- Mark Rober
                            Founder of CrunchLabs, NASA engineer for the Curiosity Mars Rover, public enemy #1 of neighborhood squirrels, & creator of the sparkliest glitter bomb pranks</Title>
                       <div className="text-center mt-3">
                       <Link to={"/about"} >
                            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">ABOUT US</button>
                        </Link>
                       </div>
                    </Col>
                    <Col span={8}>
                        <img src="https://www.crunchlabs.com/cdn/shop/files/mark-nasa-shirt_1_3x_509ac96a-f1f2-4e7f-a1e8-b83d5b10248c.webp?v=1711497523&width=800" alt="" />
                    </Col>
                </Row>

            </div>
        </div>
    );
};

export default HomePage;
