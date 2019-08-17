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
      name: "dir",
      message: "Select component",
      when: answer => answer.action === "add",
      choices: listComponents
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
      default: "functional",
      choices: () => [
        { name: "Functional component", value: "functional" },
        { name: "Class Based Component", value: "class" }
      ]
    }
  ],
  actions: data => {
    const target = data.action === "create" ? "properCase name" : "dir";
    let actions = [
      {
        type: "add",
        path: `${componentsPath}/{{${target}}}/{{properCase name}}.js`,
        templateFile: "./templates/{{type}}.js.hbs"
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

    if (data.action === "add") {
      actions = [
        ...actions,
        {
          type: "append",
          path: `${componentsPath}/{{dir}}/index.js`,
          templateFile: "./templates/index.js.hbs"
        }
      ];
    }

    return actions;
  }
};
