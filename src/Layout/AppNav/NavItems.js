const asAdmin = sessionStorage.getItem("admin");
const asDoctor = sessionStorage.getItem("doctor");
const asPatient = sessionStorage.getItem("patient");

console.log("asUser", asAdmin, asDoctor, asPatient);

let asUser;

if (asAdmin === "Admin") {
  asUser = {
    icon: "pe-7s-rocket",
    label: " Dashboards",

    content: [
      {
        label: "Main Page",
        to: "#/dashboards/admin-dashboard",
      },
      {
        label: "Doctor List",
        to: "#/dashboards/doctor-list",
      },
    ],
  };
} else if (asDoctor === "Doctor") {
  asUser = {
    icon: "pe-7s-rocket",
    label: "Dashboards",

    content: [
      {
        label: "main Page",
        to: "#/doctor/doctor-admin",
      },
      {
        label: "Patient List",
        to: "#/doctor/patients",
      },
    ],
  };
} else {
  asUser = {
    icon: "pe-7s-rocket",
    label: "Dashboards",

    content: [
      {
        label: "Main Page",
        to: "#/patient/patient-admin",
      },
      {
        label: "Other",
        to: "#/patient/other",
      },
    ],
  };
}
export const MainNav = [
  asUser,
  {
    icon: "pe-7s-browser",
    label: "Pages",
    content: [
      {
        label: "Login",
        to: "#/pages/login",
      },
      {
        label: "Login Boxed",
        to: "#/pages/login-boxed",
      },
      {
        label: "Register",
        to: "#/pages/register",
      },
      {
        label: "Register Boxed",
        to: "#/pages/register-boxed",
      },
      {
        label: "Forgot Password",
        to: "#/pages/forgot-password",
      },
      {
        label: "Forgot Password Boxed",
        to: "#/pages/forgot-password-boxed",
      },
    ],
  },
  {
    icon: "pe-7s-plugin",
    label: "Applications",
    content: [
      {
        label: "Mailbox",
        to: "#/apps/mailbox",
      },
      {
        label: "Chat",
        to: "#/apps/chat",
      },
      {
        label: "Split Layout",
        to: "#/apps/split-layout",
      },
      {
        label: "FAQ Section",
        to: "#/apps/faq-section",
      },
    ],
  },
];
export const ComponentsNav = [
  {
    icon: "pe-7s-diamond",
    label: "Elements",
    content: [
      {
        label: "Buttons",
        content: [
          {
            label: "Standard",
            to: "#/elements/buttons-standard",
          },
          {
            label: "Pills",
            to: "#/elements/buttons-pills",
          },
          {
            label: "Square",
            to: "#/elements/buttons-square",
          },
          {
            label: "Shadow",
            to: "#/elements/buttons-shadow",
          },
          {
            label: "With Icons",
            to: "#/elements/buttons-icons",
          },
        ],
      },
      {
        label: "Dropdowns",
        to: "#/elements/dropdowns",
      },
      {
        label: "Icons",
        to: "#/elements/icons",
      },
      {
        label: "Badges",
        to: "#/elements/badges-labels",
      },
      {
        label: "Cards",
        to: "#/elements/cards",
      },
      {
        label: "Loading Indicators",
        to: "#/elements/loaders",
      },
      {
        label: "List Groups",
        to: "#/elements/list-group",
      },
      {
        label: "Navigation Menus",
        to: "#/elements/navigation",
      },
      {
        label: "Timeline",
        to: "#/elements/timelines",
      },
      {
        label: "Utilities",
        to: "#/elements/utilities",
      },
      {
        label: "Visibility Sensor",
        to: "#/elements/visibility-sensor",
      },
    ],
  },
  {
    icon: "pe-7s-car",
    label: "Components",
    content: [
      {
        label: "Tabs",
        to: "#/components/tabs",
      },
      {
        label: "Accordions",
        to: "#/components/accordions",
      },
      {
        label: "Notifications",
        to: "#/components/notifications",
      },
      {
        label: "Modals",
        to: "#/components/modals",
      },
      {
        label: "Loading Blockers",
        to: "#/components/loading-blocks",
      },
      {
        label: "Progress Bar",
        to: "#/components/progress-bar",
      },
      {
        label: "Tooltips & Popovers",
        to: "#/components/tooltips-popovers",
      },
      {
        label: "Carousel",
        to: "#/components/carousel",
      },
      {
        label: "Calendar",
        to: "#/components/calendar",
      },
      {
        label: "Pagination",
        to: "#/components/pagination",
      },
      {
        label: "Count Up",
        to: "#/components/count-up",
      },
      {
        label: "Sticky Elements",
        to: "#/components/sticky-elements",
      },
      {
        label: "Scrollable",
        to: "#/components/scrollable-elements",
      },
      {
        label: "Tree View",
        to: "#/components/tree-view",
      },
      {
        label: "Maps",
        to: "#/components/maps",
      },
      {
        label: "Ratings",
        to: "#/components/ratings",
      },
      {
        label: "Image Crop",
        to: "#/components/image-crop",
      },
      {
        label: "Guided Tours",
        to: "#/components/guided-tours",
      },
    ],
  },
  {
    icon: "pe-7s-display2",
    label: "Tables",
    content: [
      {
        label: "Data Tables",
        content: [
          {
            label: "Basic",
            to: "#/tables/data-tables",
          },
          {
            label: "Custom Components",
            to: "#/tables/datatables-custom-components",
          },
          {
            label: "Fixed Header",
            to: "#/tables/datatables-fixed-header",
          },
          {
            label: "Aggregation",
            to: "#/tables/datatables-aggregation",
          },
          {
            label: "Editable Tables",
            to: "#/tables/datatables-editable",
          },
        ],
      },
      {
        label: "Regular Tables",
        to: "#/tables/regular-tables",
      },
      {
        label: "Grid Tables",
        to: "#/tables/grid-tables",
      },
    ],
  },
];
export const FormsNav = [
  {
    icon: "pe-7s-light",
    label: "Elements",
    content: [
      {
        label: "Controls",
        to: "#/forms/controls",
      },
      {
        label: "Layouts",
        to: "#/forms/layouts",
      },
      {
        label: "Validation",
        to: "#/forms/validation",
      },
      {
        label: "Wizards",
        content: [
          {
            label: "Variation 1",
            to: "#/forms/wizard-1",
          },
          {
            label: "Variation 2",
            to: "#/forms/wizard-2",
          },
          {
            label: "Variation 3",
            to: "#/forms/wizard-3",
          },
        ],
      },
      {
        label: "Sticky Form Headers",
        to: "#/forms/sticky-headers",
      },
    ],
  },
  {
    icon: "pe-7s-joy",
    label: "Widgets",
    content: [
      {
        label: "Datepicker",
        to: "#/forms/datepicker",
      },
      {
        label: "Range Slider",
        to: "#/forms/range-slider",
      },
      {
        label: "Input Selects",
        to: "#/forms/input-selects",
      },
      {
        label: "Toggle Switch",
        to: "#/forms/toggle-switch",
      },
      {
        label: "Dropdowns",
        to: "#/forms/dropdown",
      },
      {
        label: "WYSIWYG Editor",
        to: "#/forms/wysiwyg-editor",
      },
      {
        label: "Input Mask",
        to: "#/forms/input-mask",
      },
      {
        label: "Typeahead",
        to: "#/forms/typeahead",
      },
      {
        label: "Clipboard",
        to: "#/forms/clipboard",
      },
      {
        label: "Textarea Autosize",
        to: "#/forms/textarea-autosize",
      },
      {
        label: "Number Spinners",
        to: "#/forms/numberspinners",
      },
      {
        label: "Color Picker",
        to: "#/forms/color-picker",
      },
      {
        label: "Dropzone",
        to: "#/forms/dropzone",
      },
    ],
  },
];
export const WidgetsNav = [
  {
    icon: "pe-7s-graph2",
    label: "Chart Boxes",
    content: [
      {
        label: "Variation 1",
        to: "#/widgets/chart-boxes",
      },
      {
        label: "Variation 2",
        to: "#/widgets/chart-boxes-2",
      },
      {
        label: "Variation 3",
        to: "#/widgets/chart-boxes-3",
      },
    ],
  },
  {
    icon: "pe-7s-id",
    label: "Profile Boxes",
    to: "#/widgets/profile-boxes",
  },
  {
    icon: "pe-7s-display1",
    label: "Content Boxes",
    to: "#/widgets/content-boxes",
  },
];
export const ChartsNav = [
  {
    icon: "pe-7s-graph2",
    label: "ChartJS",
    to: "#/charts/chartjs",
  },
  {
    icon: "pe-7s-graph",
    label: "Apex Charts",
    to: "#/charts/apexcharts",
  },
  {
    icon: "pe-7s-gleam",
    label: "Gauges",
    to: "#/charts/gauges",
  },
  {
    icon: "pe-7s-graph1",
    label: "Chart Sparklines 1",
    to: "#/charts/sparklines-1",
  },
  {
    icon: "pe-7s-edit",
    label: "Chart Sparklines 2",
    to: "#/charts/sparklines-2",
  },
];
