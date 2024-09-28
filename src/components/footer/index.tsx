import {
  Layout,
  Row,
  Col,
  Typography,
  Divider,
  Form,
  Button,
  Input,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  TikTokOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

import { footerLinks } from "../../consts";

import "./footer.css";
const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const FooterComponent = () => {
  return (
    <div>
      <Footer style={{ backgroundColor: "#00416c", padding: "60px 0" }}>
        <Row>
          <Col flex={2}>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <p
                style={{
                  maxWidth: "420px",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#fff",
                  lineHeight: "30px",
                }}
              >
                <span style={{ color: "#fed103" }}>Join our community </span>
                of builders, hackers, and thinkers! You’ll be the first to know
                about new videos, products, and deals - don’t miss out.
              </p>
            </Row>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Form
                id="newsletterForm"
                name="newsletterForm"
                // layout="inline"
                style={{
                  marginTop: "16px",
                  width: "65%",
                  display: "flex",
                  gap: '10px'
                }}
                onFinish={(values) => {
                  console.log("Success:", values);
                  // Handle form submission
                }}
              >
                <Form.Item
                  name="email"
                  className="input-container"
                  style={{ width: "300px" }}
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input className="input-email" placeholder="Your Email" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submit-button"
                    aria-label="Subscribe"
                    style={{ padding: "23px 24px", fontWeight: "600" }}
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
            </Row>

            <Row justify="center" align="middle">
              <Col span={12} className="flex justify-center items-center gap-4" style={{ padding: "10px 30px", fontSize: "25px" }}>
                <YoutubeOutlined style={{ color: "white", padding: "0 10px" }} />
                <InstagramOutlined style={{ color: "white", padding: "0 10px" }} />
                <TikTokOutlined style={{ color: "white", padding: "0 10px" }} />
                <FacebookOutlined style={{ color: "white", padding: "0 10px" }} />
              </Col>
            </Row>

            <Row justify="center" align="middle">
              <Col span={12} className="flex justify-center items-center gap-4">
                <Text style={{ color: "white", paddingTop: "100px", fontWeight: "bold" }}>
                  &copy; 2024 CrunchLabs LLC - All Rights Reserved
                </Text>
              </Col>
            </Row>
          </Col>

          <Col flex={3}>
            {/* <Row justify="center" align="top">
              <Col xs={24} sm={12} md={6}>
                <Title style={{ color: "white" }} level={4}>
                  Contact Us
                </Title>
                <Paragraph style={{ color: "white" }}>
                  <MailOutlined style={{ color: "white" }} />{" "}
                  <Text style={{ color: "white" }} strong>
                    help@crunchlabs.com
                  </Text>
                </Paragraph>
                <Paragraph style={{ color: "white" }}>
                  <PhoneOutlined style={{ color: "white" }} />{" "}
                  <Text style={{ color: "white" }} strong>
                    650-267-2473
                  </Text>
                </Paragraph>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Title style={{ color: "white" }} level={4}>
                  Products
                </Title>
                <Paragraph style={{ color: "white" }}>Build Box</Paragraph>
                <Paragraph style={{ color: "white" }}>Hack Pack</Paragraph>
                <Paragraph style={{ color: "white" }}>Merch & Extras</Paragraph>
                <Paragraph style={{ color: "white" }}>
                  Replacement Parts
                </Paragraph>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Title style={{ color: "white" }} level={4}>
                  Bonus
                </Title>
                <Paragraph style={{ color: "white" }}>Videos</Paragraph>
                <Paragraph style={{ color: "white" }}>Roblox</Paragraph>
                <Paragraph style={{ color: "white" }}>International</Paragraph>
                <Paragraph style={{ color: "white" }}>
                  Camp CrunchLabs
                </Paragraph>
              </Col>
            </Row> */}

            {/* Second Row of Links */}
            {/* <Row justify="center" align="top" style={{ marginTop: "20px" }}>
              <Col xs={24} sm={12} md={6}>
                <Title style={{ color: "white" }} level={4}>
                  Our Company
                </Title>
                <Paragraph style={{ color: "white" }}>About Us</Paragraph>
                <Paragraph style={{ color: "white" }}>FAQs</Paragraph>
                <Paragraph style={{ color: "white" }}>
                  Build Box Reviews
                </Paragraph>
                <Paragraph style={{ color: "white" }}>
                  Hack Pack Reviews
                </Paragraph>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Title style={{ color: "white" }} level={4}>
                  Programs
                </Title>
                <Paragraph style={{ color: "white" }}>
                  Educators (Bulk Orders)
                </Paragraph>
                <Paragraph style={{ color: "white" }}>
                  Class CrunchLabs
                </Paragraph>
                <Paragraph style={{ color: "white" }}>
                  Referral Program
                </Paragraph>
                <Paragraph style={{ color: "white" }}>
                  Affiliate Program
                </Paragraph>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Title style={{ color: "white" }} level={4}>
                  Legal & Policies
                </Title>
                <Paragraph style={{ color: "white" }}>
                  Terms & Conditions
                </Paragraph>
                <Paragraph style={{ color: "white" }}>Privacy Notice</Paragraph>
                <Paragraph style={{ color: "white" }}>Accessibility</Paragraph>
                <Paragraph style={{ color: "white" }}>Other Policies</Paragraph>
              </Col>
            </Row> */}

            <Row justify="center" align="top">
              {footerLinks.map((section, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                  <Title style={{ color: "white" }} level={4}>
                    {section.title}
                  </Title>
                  {section.links.map((link, linkIndex) => (
                    <Paragraph key={linkIndex} style={{ color: "white" }}>
                      <a href={link.url} style={{ color: "white" }}>
                        {link.name}
                      </a>
                    </Paragraph>
                  ))}
                </Col>
              ))}
            </Row>

          </Col>
        </Row>

        {/* <Divider style={{ margin: "20px 0", borderColor: "#fff" }} />

        <Row justify="center" align="middle">
          <Col span={12} className="flex justify-center items-center gap-4">
            <YoutubeOutlined style={{ color: "white" }} />
            <InstagramOutlined style={{ color: "white" }} />
            <TikTokOutlined style={{ color: "white" }} />
            <FacebookOutlined style={{ color: "white" }} />
          </Col>
          <Col span={12} className="text-center">
            <Text style={{ color: "white" }}>
              &copy; 2024 CrunchLabs LLC - All Rights Reserved
            </Text>
          </Col>
        </Row> */}
      </Footer>
    </div>
  );
};

export default FooterComponent;
