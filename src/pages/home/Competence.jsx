import React from "react";
import "./competence.css";
import { Heading, Text, Center,Grid } from "@chakra-ui/react";
import CardCompetence from "./CardCompetence"; // Ajustez le chemin si nécessaire
import { FrontEndLogo, BackEndLogo, ToolsLogo } from "./Logos";
import { useTranslation } from "react-i18next";

const Competence = () => {
  const { t } = useTranslation();

  // Récupération des données du JSON
  const frontend = t("competences.frontend.skills", { returnObjects: true });
  const backend = t("competences.backend.skills", { returnObjects: true });
  const tools = t("competences.tools.skills", { returnObjects: true });

  return (
    <>
      <Heading as="h2" size={{ base: "3xl", md: "3xl", lg: "3xl" }} mb={8}>
        {t("competences.title")}
      </Heading>
      <Text textStyle="sm" maxW={{ base: "100%", md: "70%" }} mb={8}>
        {t("competences.description")}
      </Text>
      <Center>
      <Grid templateColumns={{ base :"repeat(1, 1fr)" , md:"repeat(2, 1fr)" , lg:"repeat(3, 1fr)" }} gap="20">
          {/* Frontend */}
          <CardCompetence
            title={t("competences.frontend.title")}
            icons={frontend.map(skill => ({
              src: skill.icon,
              alt: skill.name,
              tooltip: skill.tooltip
            }))}
            logo={<FrontEndLogo />}
          />
          {/* Backend */}
          <CardCompetence
            title={t("competences.backend.title")}
            icons={backend.map(skill => ({
              src: skill.icon,
              alt: skill.name,
              tooltip: skill.tooltip
            }))}
            logo={<BackEndLogo />}
          />
          {/* Tools */}
          <CardCompetence
            title={t("competences.tools.title")}
            icons={tools.map(skill => ({
              src: skill.icon,
              alt: skill.name,
              tooltip: skill.tooltip
            }))}
            logo={<ToolsLogo />}
          />
        </Grid>
      </Center>
    </>
  );
};

export default Competence;
