import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faFacebook, 
  faWhatsapp, 
  faThreads
} from '@fortawesome/free-brands-svg-icons';
import { 
  faSun, 
  faMoon, 
  faShareNodes,
  faUserPlus,
  faChartLine,
  faAd,
  faMagnifyingGlass,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import { QRCodeSVG } from 'qrcode.react';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useState, useCallback } from 'react';
import logo from './assets/logo.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const themes = {
  dark: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    text: 'white',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    skillBg: 'rgba(255, 255, 255, 0.08)',
    skillHover: 'rgba(255, 255, 255, 0.15)',
    accent: '#dc2743',
    accentGradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743)'
  },
  light: {
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    text: '#343a40',
    textSecondary: 'rgba(52, 58, 64, 0.7)',
    skillBg: 'rgba(52, 58, 64, 0.08)',
    skillHover: 'rgba(52, 58, 64, 0.15)',
    accent: '#dc2743',
    accentGradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743)'
  }
};

const Container = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  transition: all 0.3s ease;
`;

const Card = styled.div`
  background: ${props => props.theme.cardBg};
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.text};
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  z-index: 1;
  
  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const ProfileImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 0 auto 2.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: ${props => props.theme.accentGradient};
    border-radius: 50%;
    z-index: -1;
    animation: rotate 4s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    background: ${props => props.theme.accentGradient};
    border-radius: 50%;
    z-index: -2;
    opacity: 0.5;
    filter: blur(10px);
    animation: rotate 4s linear infinite reverse;
  }
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${props => props.theme.cardBg};
    padding: 4px;
    background: ${props => props.theme.cardBg};
  }
`;

const glowAnimation = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(240, 148, 51, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(220, 39, 67, 0.8);
  }
  100% {
    text-shadow: 0 0 10px rgba(240, 148, 51, 0.5);
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1.5rem;
  
  &::after {
    content: 'DIGITAL MARKETING';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    letter-spacing: 0.4em;
    color: ${props => props.theme.textSecondary};
    font-weight: 500;
    white-space: nowrap;
    opacity: 0.8;
  }
`;

const FirstName = styled.span`
  font-size: 2.8rem;
  font-weight: 800;
  background: ${props => props.theme.accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: -1px;
  position: relative;
  animation: ${glowAnimation} 3s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.theme.accentGradient};
    opacity: 0.5;
  }
`;

const LastName = styled.span`
  font-size: 2.8rem;
  font-weight: 800;
  background: ${props => props.theme.accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: -1px;
  margin-left: 0.8rem;
  position: relative;
  animation: ${glowAnimation} 3s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 2rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  opacity: 0.9;
`;

const SkillsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  padding: 0 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const skillAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const Skill = styled.div`
  background: ${props => props.theme.skillBg};
  padding: 0.8rem 1.2rem;
  border-radius: 16px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  color: ${props => props.theme.text};
  border: 1px solid rgba(255, 255, 255, 0.05);
  justify-content: flex-start;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.skillHover};
    animation: ${skillAnimation} 1s ease infinite;
  }

  svg {
    font-size: 1.2rem;
    color: ${props => props.theme.accent};
    min-width: 1.2rem;
  }
`;

const Bio = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
  margin: 2rem 0;
  padding: 0 1rem;
  opacity: 0.9;
`;

const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin-top: 2.5rem;
  padding: 0 0.5rem;
`;

const buttonHover = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 14px;
  background: ${props => props.$background};
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    animation: ${buttonHover} 1s ease infinite;
    
    &::before {
      opacity: 1;
    }
  }

  svg {
    margin-right: 10px;
    font-size: 1.3rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ActionButton = styled.button`
  background: ${props => props.theme.skillBg};
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.theme.skillHover};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.1rem;
    color: ${props => props.theme.accent};
  }
`;

const QRCodeContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ${props => props.$show ? 'scale(1)' : 'scale(0.8)'};
  background: ${props => props.theme.cardBg};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  opacity: ${props => props.$show ? '1' : '0'};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 100;
  text-align: center;

  .qr-title {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.text};
  }

  .qr-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    color: ${props => props.theme.text};
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.$show ? '1' : '0'};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  z-index: 99;
  backdrop-filter: blur(3px);
`;

const DeveloperButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: ${props => props.theme.text};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  svg {
    color: #25D366;
    font-size: 1.1rem;
  }

  span {
    background: ${props => props.theme.accentGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }
`;

const skills = [
  { icon: faChartLine, name: 'Growth Strategy' },
  { icon: faAd, name: 'Meta Ads' },
  { icon: faMagnifyingGlass, name: 'SEO' },
  { icon: faEnvelope, name: 'Copywriting' },
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [showQR, setShowQR] = useState(false);
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    fullScreen: false,
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: theme === 'dark' ? '#ffffff' : '#000000',
      },
      links: {
        color: theme === 'dark' ? '#ffffff' : '#000000',
        distance: 150,
        enable: true,
        opacity: 0.05,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out"
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.08,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kaua Borges - Marketing Digital',
          text: 'Conecte-se comigo para estratégias de Marketing Digital!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
        setShowQR(true);
      }
    } else {
      setShowQR(true);
    }
  };

  const saveContact = () => {
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Kaua Borges
TITLE:Estrategista Digital & Growth Hacker
TEL:+5517988243238
URL:https://instagram.com/_kaua.fborges_
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kaua-borges.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0
          }}
        />
        
        <Card>
          <ProfileImage>
            <img src={logo} alt="Kaua Borges Logo" />
          </ProfileImage>
          <LogoContainer>
            <FirstName>Kaua</FirstName>
            <LastName>Borges</LastName>
          </LogoContainer>
          <Title>Estrategista Digital & Growth Hacker</Title>
          
          <SkillsSection>
            {skills.map((skill, index) => (
              <Skill key={index}>
                <FontAwesomeIcon icon={skill.icon} />
                {skill.name}
              </Skill>
            ))}
          </SkillsSection>

          <Bio>
            Transformando marcas através do Marketing Digital. 
            Especialista em estratégias de crescimento, SEO e 
            gestão de tráfego pago que geram resultados reais.
          </Bio>
          
          <SocialButtons>
            <SocialButton 
              href="https://instagram.com/_kaua.fborges_" 
              target="_blank"
              rel="noopener noreferrer"
              $background="linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)"
            >
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </SocialButton>
            
            <SocialButton 
              href="https://www.facebook.com/share/15PWU8mGQ4/?mibextid=wwXIfr" 
              target="_blank"
              rel="noopener noreferrer"
              $background="#1877F2"
            >
              <FontAwesomeIcon icon={faFacebook} /> Facebook
            </SocialButton>
            
            <SocialButton 
              href="https://wa.me/5517988243238?text=Olá%20tudo%20bem?%20Gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho." 
              target="_blank"
              rel="noopener noreferrer"
              $background="#25D366"
            >
              <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
            </SocialButton>
            
            <SocialButton 
              href="https://www.threads.net/@_kaua.fborges_" 
              target="_blank"
              rel="noopener noreferrer"
              $background="linear-gradient(45deg, #000000, #333333)"
            >
              <FontAwesomeIcon icon={faThreads} /> Threads
            </SocialButton>
          </SocialButtons>

          <ActionButtons>
            <ActionButton onClick={toggleTheme}>
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
              {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            </ActionButton>

            <ActionButton onClick={handleShare}>
              <FontAwesomeIcon icon={faShareNodes} />
              Compartilhar
            </ActionButton>

            <ActionButton onClick={saveContact}>
              <FontAwesomeIcon icon={faUserPlus} />
              Salvar Contato
            </ActionButton>
          </ActionButtons>

          <DeveloperButton 
            href="https://wa.me/5517999754390?text=Olá%20tudo%20bem?%20Gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho." 
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            Crie seu cartão digital com <span>DGSolutionWEB</span>
          </DeveloperButton>

          <Overlay $show={showQR} onClick={() => setShowQR(false)} />
          <QRCodeContainer $show={showQR}>
            <div className="qr-title">Escaneie o QR Code para compartilhar</div>
            <QRCodeSVG 
              value={window.location.href}
              size={200}
              level="H"
              includeMargin={true}
            />
            <button className="qr-close" onClick={() => setShowQR(false)}>
              ✕
            </button>
          </QRCodeContainer>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
