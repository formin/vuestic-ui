import { definePageConfig } from "~~/types/page-config";
import {
  colorsConfig,
  iconsInstall,
  iconsConfig,
  componentsConfig,
} from "./code-examples";

const block = useDocsBlocks(import.meta);

export default definePageConfig({
  blocks: [
    block.title("configurationGuide.title"),
    block.paragraph("configurationGuide.description"),
    block.subtitle("configurationGuide.colors.title"),
    block.paragraph("configurationGuide.colors.description"),
    block.code(colorsConfig),
    block.link("configurationGuide.readMore", "/services/colors-config"),

    block.subtitle("configurationGuide.icons.title"),
    block.paragraph("configurationGuide.icons.description"),
    block.code(iconsInstall, "bash"),

    block.subtitle("configurationGuide.icons.subtitle"),
    block.paragraph("configurationGuide.icons.subDescription"),
    block.code(iconsConfig),
    block.link("configurationGuide.readMore", "/services/icons-config"),

    block.subtitle("configurationGuide.components.title"),
    block.paragraph("configurationGuide.components.intro"),
    block.paragraph("configurationGuide.components.description"),
    block.example("PageConfigButtonDefault", { hideCode: true }),
    block.paragraph("configurationGuide.components.action"),
    block.code(componentsConfig),
    block.paragraph("configurationGuide.components.result"),
    block.example("PageConfigButton", { hideCode: true }),
    block.paragraph("configurationGuide.components.example"),
    block.paragraph("configurationGuide.components.more"),
    block.link("configurationGuide.readMore", "/services/components-config"),
  ],
});
