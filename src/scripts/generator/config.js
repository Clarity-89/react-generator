const listComponents = require("./listComponents");
const componentsPath = "../../components/";

/**
 * Generate React component for an app
 */

module.exports = {
  description: "Generate a new React component",
  prompts: [
    {
      type: "list",
      name: "action",
      message: "Select action",
      choices: () => [
        {
          name:
            "Create (Create component folder with Component.js and index.js files)",
          value: "create"
        },
        {
          name:
            "Add (Add new Component.js file inside of existing component folder)",
          value: "add"
        }
      ]
    },
    {
      type: "list",
      name: "component",
      message: "Select component",
      when: answer => answer.action === "add",
      choices: listComponents,
      filter: value => value.toLowerCase()
    },
    {
      type: "input",
      name: "name",
      message: "Component name:",
      validate: value => {
        if (!value) {
          return "Component name is required";
        }
        return true;
      }
    },
    {
      type: "list",
      name: "type",
      message: "Select component type",
      default: "Functional component",
      choices: () => [
        "Functional component",
        "Class Based Component",
        "Pure Component"
      ]
    }
  ],
  actions: data => {
    let template = "./templates/class.js.hbs";
    let actions = [];
    let path = "../../components/{{properCase name}}/{{properCase name}}.js";

    if (data.type === "Stateless Function") {
      template = "./templates/functional.js.hbs";
    }

    if (data.action === "add") {
      path = `../../components/{{properCase component}}/{{properCase name}}.js`;
      actions = [
        {
          type: "append",
          path: "../../{{app}}/components/{{properCase component}}/index.js",
          templateFile: "./templates/index.js.hbs"
        }
      ];
    }

    actions = [
      ...actions,
      {
        type: "add",
        path: path,
        templateFile: template
      }
    ];

    if (data.action === "create") {
      actions = [
        ...actions,
        {
          type: "add",
          path: "../../{{app}}/components/{{properCase name}}/index.js",
          templateFile: "./templates/index.js.hbs"
        },
        {
          type: "add",
          path: "../../{{app}}/components/{{properCase name}}/messages.js",
          templateFile: "./templates/messages.js.hbs"
        }
      ];
    }

    return actions;
  }
};
