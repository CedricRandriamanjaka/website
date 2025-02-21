import { Container, HStack, Icon, Link, Stack } from '@chakra-ui/react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { Copyright } from './copyright';

const socialLinks = [
  { href: 'https://x.com', icon: SiX },
  { href: 'https://github.com', icon: SiGithub },
  { href: 'https://www.linkedin.com', icon: SiLinkedin },
];

const Footer = () => {
  return (
    <Container as="footer" py="0">
      <Stack gap="6">
        <Stack direction="row" justify="space-between" align="center">
            <Copyright />
          <HStack gap="4">
            {socialLinks.map(({ href, icon: IconComponent }, index) => (
              <Link key={index} href={href} colorPalette="gray">
                <Icon as={IconComponent} boxSize={5} />
              </Link>
            ))}
          </HStack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;