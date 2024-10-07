import Title from "antd/es/typography/Title"

const AboutPage = () => {
    return (
        <div className="">
            <img height="600" src="https://www.crunchlabs.com/cdn/shop/files/LabPictureAtNight.jpg?v=1662929749&width=2560" alt="" />
            <div className="py-20 px-20 text-center" >
                <Title className="px-20" level={3}>
                    We’re a small team of fun-loving engineers, designers and makers led by Mark Rober, our Head EnginNerd & former NASA engineer.
                </Title>
            </div>
            <div className="grid grid-cols-2 container px-20">
                <iframe
                    width={"100%"}
                    height={"300"}
                    src="https://www.youtube.com/embed/wxxszUSs4Kk?si=rVegNCBhwuZXJFvs"></iframe>
                <div className="flex items-center">
                    <p className="px-20">CrunchLabs is a real place! Check out our massive Willy Wonka factory for engineering, located in the San Francisco Bay Area in California. Watch more videos on the CrunchLabs YouTube Channel.</p>
                </div>
            </div>
            <div className="grid grid-cols-2 mt-20" style={{ backgroundColor: "#006EAD" }}>
                <div className="flex items-center text-white">
                    <div className="px-20">
                        <p className="pb-3">Our goal is to show kids and kids at heart how to Think Like an Engineer (because who better to teach children engineering than childish engineers!?)</p>

                        <p> To us, thinking like an engineer isn’t about a profession or degree path, it’s a hands-on approach that helps you accomplish whatever you set your mind to. Even if that’s… starting a toy company! We hope you have as much fun with our toys as we do.</p>
                    </div>
                </div>
                <div>
                    <img style={{ height: "450px", width: "100%" }} src="https://www.crunchlabs.com/cdn/shop/products/sq-kids-playing-mobile.jpg?v=1656436615" alt="" />
                </div>
            </div>
            <div className="container px-20 my-3 text-center">
                <Title className="" level={2}>Engineering Sustainability</Title>
                <p>We couldn’t do CrunchLabs without Earth, so we believe the best way to inspire responsible engineering is to lead by example:</p>
                <p><span className="font-bold">Our packaging is compostable.</span>
                    Our toys stay out of the landfill longer.</p>
                <p><span className="font-bold">Our toys grow on trees.</span>
                    We use as much wood as possible in the design of our toys.</p>
                <p><span className="font-bold">
                    Our toys stay out of the landfill longer.</span>
                    We make our toys robust and repairable so they can be enjoyed for as long as possible.
                </p>
            </div>
        </div>
    )
}

export default AboutPage