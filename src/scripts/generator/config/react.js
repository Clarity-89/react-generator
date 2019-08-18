const componentsPath = `${__dirname}/../../../components`;
const templatesPath = `${__dirname}/../templates/react`;

exports.reactConfig = data => {
  const target = data.action === "create" ? "properCase name" : "dir";

  let actions = [
    {
      type: "add",
      path: `${componentsPath}/{{${target}}}/{{properCase name}}.js`,
      templateFile: `${templatesPath}/{{type}}.js.hbs`
    }
  ];

  if (data.action === "create") {
    actions = [
      ...actions,
      {
        type: "add",
        path: `${componentsPath}/{{properCase name}}/index.js`,
        templateFile: `${templatesPath}/index.js.hbs`
      }
    ];
  }

  if (data.action === "add") {
    actions = [
      ...actions,
      {
        type: "append",
        path: `${componentsPath}/{{dir}}/index.js`,
        templateFile: `${templatesPath}/index.js.hbs`
      }
    ];
  }

  return actions;
};
