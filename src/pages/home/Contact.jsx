import React, { useState } from "react";
import {
  Button,
  Fieldset,
  Input,
  Stack,
  Flex,
  Center,
  Box,
  Link,
  Text,
  Icon,
  Textarea
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com"; // Import EmailJS

const Contact = () => {
  const { t } = useTranslation();

  // Obtenir la date du jour au format YYYY-MM-DD
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  // 1️⃣ Gestion des champs avec useState
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
   // Charger les valeurs du quota et de la date enregistrée
   const [sendCount, setSendCount] = useState(() => {
    const storedDate = localStorage.getItem("lastSendDate");
    const today = getTodayDate();

    // Si c'est un nouveau jour, réinitialiser le quota
    if (storedDate !== today) {
      localStorage.setItem("lastSendDate", today);
      localStorage.setItem("sendCount", "0");
      return 0;
    }
    
    return parseInt(localStorage.getItem("sendCount") || "0", 10);
  });

  // 2️⃣ Gestion du changement des champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3️⃣ Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    setLoading(true); // Désactiver le bouton pendant l'envoi
    e.preventDefault();
    if (sendCount >= 6) {
      toaster.create({
        title: "Vous avez atteint la limite d'envoi de messages.",
        type: "warning",
      });
      setLoading(false); // Désactiver le bouton pendant l'envoi
      return;
    }
    // Validation simple
    if (!formData.name || !formData.email || !formData.message) {
      toaster.create({
        title: "Tous les champs sont requis.",
        type: "warning",
      })
      setLoading(false); // Désactiver le bouton pendant l'envoi
      return;
    }


    try {
      await emailjs.send(
        "service_ji9ynbc", // Remplace par ton Service ID
        "template_8ckesl4", // Remplace par ton Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "randriamanjakacedric@gmail.com" // L'email du destinataire
        },
        "O1lnzdGsIX2D0zfGe" // Remplace par ton User ID
      );

      // Notification succès
      toaster.create({
        title: "Message envoyé avec succès !",
        type: "success",
      })
      setSendCount(sendCount + 1);
      localStorage.setItem("sendCount", sendCount);
      // Reset du formulaire
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi du mail :", error);
      toaster.create({
        title: "Erreur lors de l'envoi du message.",
        type: "error",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center>
      <Flex width={{ base: "100%", md: "60%" }} direction={{ base: "column", md: "row" }} gap={8}>
        
        {/* Partie gauche : Informations de contact et réseaux sociaux */}
        <Box flex={1} p={4}>
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight="bold">{t("contact.title")}</Text>
            <Text>{t("contact.champ.adresse")}{t("metaData.adresse")}</Text>
            <Text>{t("contact.champ.tel")}
              <Link href={`tel:${t("metaData.tel")}`} isExternal>{t("metaData.tel")}</Link>
            </Text>
            <Text>{t("contact.champ.mail")}
              <Link href={`mailto:${t("metaData.mail")}`} isExternal>{t("metaData.mail")}</Link>
            </Text>
            
            <Text fontSize="lg" fontWeight="semibold">{t("contact.champ.follow")}</Text>
            <Flex gap={4}>
              <Link href="https://facebook.com" isExternal><Icon as={FaFacebook} boxSize={6} /></Link>
              <Link href="https://twitter.com" isExternal><Icon as={FaTwitter} boxSize={6} /></Link>
              <Link href="https://linkedin.com" isExternal><Icon as={FaLinkedin} boxSize={6} /></Link>
            </Flex>
          </Stack>
        </Box>
        
    <Toaster />
        {/* Partie droite : Formulaire de contact */}
        <Box flex={1} p={4}>
          <form onSubmit={handleSubmit}>
            <Fieldset.Root size="lg" maxW="md">
              <Stack mb={4}>
                <Fieldset.Legend size="6xl">{t("contact.champ.formTitle")}</Fieldset.Legend>
                <Fieldset.HelperText>{t("contact.champ.formHelper")}</Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field label={t("contact.champ.nom")}>
                  <Input name="name" value={formData.name} onChange={handleChange} />
                </Field>

                <Field label={t("contact.champ.email")}>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} />
                </Field>

                <Field label={t("contact.champ.comment")} required helperText={t("contact.champ.commentHelper")}>
                  <Textarea name="message" placeholder="Votre message..." value={formData.message} onChange={handleChange} />
                </Field>
              </Fieldset.Content>

              <Button type="submit" alignSelf="flex-start" mt={4} loading={loading} loadingText="traitement..." colorScheme="blue">
                {t("contact.champ.envoyer")}
              </Button>
            </Fieldset.Root>
          </form>
        </Box>

      </Flex>
    </Center>
  );
};

export default Contact;
