import {
  Box,
  SimpleGrid,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Heading, Text, Center } from "@chakra-ui/react";
import { Badge, Button, Card, HStack, Image } from "@chakra-ui/react"

import { useColorMode } from "@/components/ui/color-mode";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";

const Annexe = () => {
  const { t } = useTranslation();
  const projects = t("projects.list", { returnObjects: true });
  const bgColor = useColorMode("gray.50", "gray.800");

  return (
    <Box id="projects" bg={bgColor}>
      <Heading as="h2" size="4xl" mb={8}>
      {t("projects.title")}
      </Heading>
      <Stack>
      {projects.map((project) => (
        <DialogRoot scrollBehavior="inside" size="lg" >
          <DialogTrigger asChild>

            <Card.Root flexDirection="row" overflow="hidden" cursor="pointer">
              <Image
                objectFit="cover"
                maxW={{ base: "15%", md: "40%" , lg: "40%" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Box>
                <Card.Body>
                  <Card.Title mb="2">{project.title}</Card.Title>
                  <Card.Description>
                  {project.description}
                  </Card.Description>
                  <HStack mt="4">
                  {project.badges.map((badge, index) => (
                      <Badge key={index}>{badge}</Badge>
                    ))}
                  </HStack>
                </Card.Body>
                {/* <Card.Footer>
              <Button>Buy Latte</Button>
            </Card.Footer> */}
              </Box>
            </Card.Root>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody><ReactMarkdown>{project.descriptionMd}</ReactMarkdown></DialogBody>
          </DialogContent>
        </DialogRoot>
))}
      </Stack>
    </Box>
  );
};

export default Annexe;
