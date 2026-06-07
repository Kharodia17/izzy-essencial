/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Surface
        "background":                   "#f9f9ff",
        "surface":                      "#f9f9ff",
        "surface-dim":                  "#c7dbff",
        "surface-bright":               "#f9f9ff",
        "surface-container-lowest":     "#ffffff",
        "surface-container-low":        "#f0f3ff",
        "surface-container":            "#e7eeff",
        "surface-container-high":       "#dee9ff",
        "surface-container-highest":    "#d5e3ff",
        "surface-variant":              "#d5e3ff",
        "surface-tint":                 "#00658b",
        // On-surface
        "on-surface":                   "#001c3b",
        "on-surface-variant":           "#3f484e",
        "on-background":                "#001c3b",
        // Inverse
        "inverse-surface":              "#133155",
        "inverse-on-surface":           "#ebf1ff",
        "inverse-primary":              "#7ed0ff",
        // Outline
        "outline":                      "#6f787f",
        "outline-variant":              "#bfc8cf",
        // Primary — Blue
        "primary":                      "#006388",
        "on-primary":                   "#ffffff",
        "primary-container":            "#187da8",
        "on-primary-container":         "#fcfcff",
        "primary-fixed":                "#c5e7ff",
        "primary-fixed-dim":            "#7ed0ff",
        "on-primary-fixed":             "#001e2d",
        "on-primary-fixed-variant":     "#004c6a",
        // Secondary — Green
        "secondary":                    "#106d39",
        "on-secondary":                 "#ffffff",
        "secondary-container":          "#9df3b1",
        "on-secondary-container":       "#18713d",
        "secondary-fixed":              "#a0f5b4",
        "secondary-fixed-dim":          "#84d99a",
        "on-secondary-fixed":           "#00210c",
        "on-secondary-fixed-variant":   "#005228",
        // Tertiary — Gold
        "tertiary":                     "#745b00",
        "on-tertiary":                  "#ffffff",
        "tertiary-container":           "#cda72b",
        "on-tertiary-container":        "#4f3d00",
        "tertiary-fixed":               "#ffe08b",
        "tertiary-fixed-dim":           "#ebc246",
        "on-tertiary-fixed":            "#241a00",
        "on-tertiary-fixed-variant":    "#584400",
        // Error
        "error":                        "#ba1a1a",
        "on-error":                     "#ffffff",
        "error-container":              "#ffdad6",
        "on-error-container":           "#93000a",
      },
      fontFamily: {
        "display":   ["Plus Jakarta Sans", "sans-serif"],
        "body":      ["Plus Jakarta Sans", "sans-serif"],
        "label":     ["Inter", "sans-serif"],
      },
      fontSize: {
        "headline-xl":        ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg":        ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "headline-md":        ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "body-lg":            ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md":            ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-md":           ["14px", { lineHeight: "20px", fontWeight: "600" }],
      },
      borderRadius: {
        "sm":      "0.25rem",  // 4px
        "DEFAULT": "0.5rem",   // 8px  — buttons, inputs
        "md":      "0.75rem",  // 12px
        "lg":      "1rem",     // 16px — product cards
        "xl":      "1.5rem",   // 24px
        "full":    "9999px",   // icon containers
      },
      spacing: {
        "xs":             "4px",
        "base":           "8px",
        "sm":             "12px",
        "md":             "24px",
        "lg":             "48px",
        "xl":             "80px",
        "gutter":         "24px",
        "margin-mobile":  "16px",
        "margin-desktop": "64px",
      },
      boxShadow: {
        // Level 1 — cards
        "card":       "0 4px 12px -2px rgba(30, 58, 95, 0.15)",
        // Level 2 — hover
        "card-hover": "0 8px 20px -2px rgba(30, 58, 95, 0.20)",
      },
    },
  },
  plugins: [],
};
