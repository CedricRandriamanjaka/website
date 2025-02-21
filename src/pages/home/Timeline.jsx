import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "@/components/ui/timeline";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createListCollection, Box, VStack, Text, Highlight } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

const Timeline = () => {
  const { t } = useTranslation();
  const timeline = t("timeline.entries", { returnObjects: true });
  const frameworks = createListCollection({
    items: [
      { label: t("timeline.filters.experience"), value: "experience" },
      { label: t("timeline.filters.education"), value: "education" },
      { label: t("timeline.filters.both"), value: "both" },
    ],
  });

  const [view, setView] = useState("both");

  return (
    <VStack spacing={4} align="stretch">
      {/* Enveloppement du select pour l'aligner à droite */}
      <Box alignSelf="flex-end">
        <SelectRoot
          collection={frameworks}
          size="sm"
          width="100%"
          alignItems="end"
          onChange={(e) => setView(e.target.value)}
        >
          <SelectLabel as="h2" textStyle="4xl" textAlign="right">
          {t("timeline.title")}
          </SelectLabel>
          
          <Text textStyle="sm" textAlign="right" maxW={{ base: "100%", md: "67%" }}>
            <Highlight query="développement web" styles={{ px: "1.5", bg: "orange.subtle", color: "orange.fg" }}>
            {t("timeline.description")}
            </Highlight>
          </Text>
          <SelectTrigger width={{ base: "70%", md: "25%" }}>
            <SelectValueText placeholder={t("timeline.filters.placeholder")} textAlign="center" />
          </SelectTrigger>
          <SelectContent>
            {frameworks.items.map((item) => (
              <SelectItem item={item.value} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Box>
      <TimelineRoot size="sm" variant="outline">
        {timeline.map((item) => {
          if (
            (view === "experience" && item.type !== "pro") ||
            (view === "education" && item.type !== "scool")
          ) {
            return null;
          }
          return (
            <TimelineItem key={item.id}>
              {item.type === "pro" && (
                <>
                  <TimelineContent flex="1" />
                  <TimelineConnector />
                </>
              )}
              <DialogRoot scrollBehavior="inside" size="lg">
                <DialogTrigger asChild>
                  <TimelineContent
                    flex="1"
                    bg={"bg.muted"}
                    padding={2}
                    marginBottom={2}
                    marginLeft={-2}
                    marginRight={-2}
                    borderRadius={4}
                    cursor="pointer"
                    alignItems={item.type === "scool" ? "flex-end" : "flex-start"}
                  >
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <Box fontSize="sm">{item.company}</Box>
                    <Box fontSize="xs" color="gray.500">
                      {item.year}
                    </Box>
                  </TimelineContent>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                  </DialogHeader>
                  <DialogCloseTrigger />
                  <DialogBody>
                  <ReactMarkdown>{item.descriptionMd}</ReactMarkdown>
                    </DialogBody>
                </DialogContent>
              </DialogRoot>

              {item.type === "scool" && (
                <>
                  <TimelineConnector />
                  <TimelineContent flex="1" />
                </>
              )}
            </TimelineItem>

          );
        })}
      </TimelineRoot>


    </VStack>
  );
};

export default Timeline;
