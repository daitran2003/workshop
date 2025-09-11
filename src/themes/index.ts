import {
  createSystem,
  defaultConfig,
  defineRecipe,
  defineConfig
} from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "8px",
    fontSize: "15px",
  },
  variants: {
    visual: {
      solid: {
        bg: "#fedf56",
        color: "#74610e",
        px: "30px",
        py: "25px",
      },
      outline: {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(254, 223, 86, 0.6)",
        color: "#fedf56",
        borderRadius: "5px",
        fontWeight: "bold",
        px: "12px",
        py: "36px",
      },
    },
  },
  defaultVariants: {
    visual: "solid",
  },
});
export const config = defineConfig({
globalCss: {
    "html, body": {
      backgroundColor: "#121212", // màu nền dark mặc định
      color: "#fff",              // chữ trắng
    },
  },

  theme: {
    recipes: {
      button: buttonRecipe,
    },
  },
});

export const theme = createSystem(defaultConfig, config);