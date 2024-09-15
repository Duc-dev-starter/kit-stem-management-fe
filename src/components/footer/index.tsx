import { Layout, Row, Col, Typography, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, YoutubeOutlined, InstagramOutlined, TikTokOutlined, FacebookOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

const FooterComponent = () => {
  return (
    <div>
      <Footer style={{ backgroundColor: '#00416c', padding: '20px 0' }}>
        <Row justify="space-around" gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Title style={{ color: 'white' }} level={4}>Contact Us</Title>
            <Paragraph style={{ color: 'white' }}>
              <MailOutlined style={{ color: 'white' }} /> <Text style={{ color: 'white' }} strong>help@crunchlabs.com</Text>
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <PhoneOutlined style={{ color: 'white' }} /> <Text style={{ color: 'white' }} strong>650-267-2473</Text>
            </Paragraph>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title style={{ color: 'white' }} level={4}>Products</Title>
            <Paragraph style={{ color: 'white' }}>Build Box</Paragraph>
            <Paragraph style={{ color: 'white' }}>Hack Pack</Paragraph>
            <Paragraph style={{ color: 'white' }}>Merch & Extras</Paragraph>
            <Paragraph style={{ color: 'white' }}>Replacement Parts</Paragraph>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title style={{ color: 'white' }} level={4}>Bonus</Title>
            <Paragraph style={{ color: 'white' }}>Videos</Paragraph>
            <Paragraph style={{ color: 'white' }}>Roblox</Paragraph>
            <Paragraph style={{ color: 'white' }}>International</Paragraph>
            <Paragraph style={{ color: 'white' }}>Camp CrunchLabs</Paragraph>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title style={{ color: 'white' }} level={4}>Our Company</Title>
            <Paragraph style={{ color: 'white' }}>About Us</Paragraph>
            <Paragraph style={{ color: 'white' }}>FAQs</Paragraph>
            <Paragraph style={{ color: 'white' }}>Build Box Reviews</Paragraph>
            <Paragraph style={{ color: 'white' }}>Hack Pack Reviews</Paragraph>
            <Paragraph style={{ color: 'white' }}>Careers</Paragraph>
            <Paragraph style={{ color: 'white' }}>Press</Paragraph>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title style={{ color: 'white' }} level={4}>Programs</Title>
            <Paragraph style={{ color: 'white' }}>Educators (Bulk Orders)</Paragraph>
            <Paragraph style={{ color: 'white' }}>Class CrunchLabs</Paragraph>
            <Paragraph style={{ color: 'white' }}>Referral Program</Paragraph>
            <Paragraph style={{ color: 'white' }}>Affiliate Program</Paragraph>
            <Paragraph style={{ color: 'white' }}>Sponsor a Future Engineer</Paragraph>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title style={{ color: 'white' }} level={4}>Legal & Policies</Title>
            <Paragraph style={{ color: 'white' }}>Terms & Conditions</Paragraph>
            <Paragraph style={{ color: 'white' }}>Privacy Notice</Paragraph>
            <Paragraph style={{ color: 'white' }}>Accessibility</Paragraph>
            <Paragraph style={{ color: 'white' }}>Other Policies</Paragraph>
            <Paragraph style={{ color: 'white' }}>Do Not Share or Sell My Personal Data</Paragraph>
          </Col>
        </Row>
        <Divider style={{ margin: '20px 0', borderColor: '#fff' }} />
        <Row justify="center" align="middle">
          <Col span={12} className="flex justify-center items-center gap-4">
            <YoutubeOutlined style={{ color: 'white' }} />
            <InstagramOutlined style={{ color: 'white' }} />
            <TikTokOutlined style={{ color: 'white' }} />
            <FacebookOutlined style={{ color: 'white' }} />
          </Col>
          <Col span={12} className="text-center">
            <Text style={{ color: 'white' }}>&copy; 2024 CrunchLabs LLC - All Rights Reserved</Text>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};

export default FooterComponent;
