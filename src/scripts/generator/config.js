const listComponents = require("./listComponents");
const componentsPath = "../../components";

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
          name: "Create component folder",
          value: "create"
        },
        {
          name: "Add separate component",
          value: "add"
        }
      ]
    },
    {
      type: "list",
      name: "component",
      message: "Select component",
      when: answer => answer.action === "add",
      choices: listComponents(),
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
      choices: () => ["Functional component", "Class Based Component"]
    }
  ],
  actions: data => {
    let template = "./templates/class.js.hbs";
    let actions = [];
    let path = `${componentsPath}/{{properCase name}}/{{properCase name}}.js`;

    if (data.type === "Functional component") {
      template = "./templates/functional.js.hbs";
    }

    if (data.action === "add") {
      path = `${componentsPath}/{{properCase component}}/{{properCase name}}.js`;
      actions = [
        {
          type: "append",
          path: `${componentsPath}/{{properCase component}}/index.js`,
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
          path: `${componentsPath}/{{properCase name}}/index.js`,
          templateFile: "./templates/index.js.hbs"
        }
      ];
    }

    return actions;
  }
};
