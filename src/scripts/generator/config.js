const listComponents = require("./listComponents");
const { reactConfig } = require("./config/react");
const { reduxConfig } = require("./config/redux");
/**
 * Generate React component for an app
 */

module.exports = {
  description: "Generate a new React component",
  prompts: [
    {
      type: "list",
      name: "select",
      choices: () => [
        { name: "React Component", value: "react_component" },
        { name: "Redux Action", value: "redux_action" }
      ]
    },

    {
      type: "list",
      name: "action",
      message: "Select action",
      when: answer => answer.select === "react_component",
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
      when: ({ action, select }) =>
        action === "add" && select === "react_component",
      choices: listComponents
    },
    {
      type: "input",
      name: "name",
      message: "Component name:",
      when: answer => answer.select === "react_component",
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
      when: answer => answer.select === "react_component",
      choices: () => [
        { name: "Functional component", value: "functional" },
        { name: "Class Based Component", value: "class" }
      ]
    },
    {
      type: "list",
      name: "create_or_modify",
      message: "Do you want to create a new action or modify an existing one?",
      when: answer => answer.select === "redux_action",
      choices: () => [
        {
          name: "Create (will create new actions file)",
          value: "create"
        },
        {
          name: "Modify (will add the action to an existing one) ",
          value: "modify"
        }
      ]
    },
    {
      type: "list",
      name: "action",
      message: "Select action folder",
      when: ({ select, create_or_modify }) => {
        return select === "redux_action" && create_or_modify === "modify";
      },
      choices: listComponents("actions")
    },
    {
      type: "input",
      name: "action_prefix",
      message: "Action prefix (e.g. 'user'):",
      when: ({ select, create_or_modify }) =>
        select === "redux_action" && create_or_modify === "create",
      validate: value => {
        if (!value) {
          return "A name is required";
        }
        return true;
      }
    },
    {
      type: "input",
      name: "action_name",
      message: "Action name:",
      when: answer => answer.select === "redux_action",
      validate: value => {
        if (!value) {
          return "A name is required";
        }
        return true;
      }
    },
    {
      type: "confirm",
      name: "reducer_confirm",
      message: "Do you want to import actions into reducer?",
      when: ({ select }) => select === "redux_action"
    },
    {
      type: "list",
      name: "reducer_name",
      choices: listComponents("reducers"),
      when: ({ select, create_or_modify, reducer_confirm }) => {
        return (
          select === "redux_action" &&
          create_or_modify === "modify" &&
          reducer_confirm
        );
      },
      message: "Select reducer"
    }
  ],
  actions: data => {
    return data.select === "react_component"
      ? reactConfig(data)
      : reduxConfig(data);
  }
};
