const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};

${variables.interfaces};


interface _SVGProps extends SvgProps {
  xmlns?: string;
  
}

const ${variables.componentName} = (${variables.props}: SvgProps) => (
  ${variables.jsx}
);
 
${variables.exports};
`;
};

module.exports = template;
