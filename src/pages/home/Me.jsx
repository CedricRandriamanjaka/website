import { Float, HStack, Span, Box,Separator } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Blockquote, BlockquoteIcon } from "@/components/ui/blockquote";
import Timeline from "./Timeline";
import Competence from "./Competence";
import Annexe from "./Annexe";
import { useTranslation } from "react-i18next";
const Me = () => {
  const { t } = useTranslation();
  return (
    <Box as="section" py={16} px={6} maxW="4xl" mx="auto">
      <Blockquote
        // bg="bg.subtle"
        padding="8"
        icon={
          <Float placement="bottom-end" offset="10">
            <BlockquoteIcon opacity="0.4" boxSize="10" rotate="180deg" />
          </Float>
        }
        cite={
          <HStack mt="2" gap="3">
            <Avatar
              size="sm"
              name="R. Cedric"
              src="https://cedricrandriamanjaka.wordpress.com/wp-content/uploads/2024/06/download.gif"
            />
            <Span fontWeight="medium">{t("metaData.forName")} {t("metaData.name")}</Span>
          </HStack>
        }
      >
        {t("metaData.parole1")}
        <br />
        {t("metaData.objectif")}
      </Blockquote>

      <br />
      <br />
      <br />
      <br />
      <br />
      <Competence />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Timeline />
      <br />
      <br />
      <br />
      <br />
      <Separator size="lg" />
      <br />

      <Annexe />
    </Box>
  );
};

export default Me;
