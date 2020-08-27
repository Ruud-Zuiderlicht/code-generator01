import React, { useState, useEffect } from "react";
import Paper02 from "./../Paper02";
import CodeBlock from "./../CodeBlock";
import { capitalize } from "./../../functions/textTransform";

const ValidationFirebase = (props) => {
  const [items, setItems] = useState("");
  const prefixFirebase = "request.resource.data";
  const variable = props.variable ? props.variable : "NO-VARIABLE-SELECTED";
  const capitalizedVariable = capitalize(variable);
  const space = "    ";
  const andBrk = " &&\n";
  const brk = "\n";

  const setContent = () => {
    setItems("");
    props.items.forEach((e) => {
      setItems((prev) => prev + generateItems(e));
    });
  };

  useEffect(() => {
    setContent();
    // eslint-disable-next-line
  }, [props.items, props.variable]);

  const type = (input) => {
    const inputType = () => {
      if (input.type === "boolean") {
        return "bool";
      } else if (input.type === "object") {
        return "map";
      } else if (input.type === "array") {
        return "list";
      } else return input.type;
    };

    return `${variable}.${input.myKey} is ${inputType()}`;
  };

  const rangeType = (input) => {
    const inputRange =
      input.type === "string" ? `"${input.range}"` : input.range;

    const rangeSymbol = () => {
      switch (input.rangeType) {
        case "equal":
          return "==";
        case "notEqual":
          return "!=";
        case "lessThan":
          return "<";
        case "lessThanOrEqualTo":
          return "<=";
        case "greaterThan":
          return ">";
        case "greaterThanOrEqualTo":
          return ">=";
        case "between":
          return ">=";
        default:
          return "";
      }
    };

    return `${variable}.${input.myKey} ${rangeSymbol()} ${inputRange}`;
  };

  const range2 = (input) => {
    const inputRange =
      input.type === "string" ? `"${input.range2}"` : input.range2;
    return `${variable}.${input.myKey} <= ${inputRange}`;
  };

  const isRequired = (input) => {
    return `${variable}.${input.myKey} != ""`;
  };

  const generateItems = (item) => {
    const comment = item.myKey ? `\n${space}// ${variable}.${item.myKey}` : "";
    const curType = item.type ? brk + space + type(item) : "";
    const curRangeType = item.rangeType ? andBrk + space + rangeType(item) : "";
    const curRange2 = item.range2 ? andBrk + space + range2(item) : "";
    const curRequired = item.isRequired
      ? andBrk + space + isRequired(item)
      : "";
    const allContent =
      comment + curType + curRangeType + curRange2 + curRequired + " &&";
    return allContent;
  };

  const isSignedInFunctionContent = `
  function isSignedIn() {
    return request.auth != null
  }`;
  const isSignedInCallContent = `&& isSignedIn()`;

  const isOwnerFunctionContent = props.onlyOwnerGetAccess
    ? `function isOwner(${variable}) {
  return request.auth.uid == ${variable}.${props.ownerSelector}
}
  `
    : "";

  const isOwnerCallCreate = props.onlyOwnerGetAccess
    ? `&& isOwner(request.resource.data)`
    : "";
  const isOwnerCallEdit = props.onlyOwnerGetAccess
    ? `&& isOwner(resource.data)`
    : "";
  const isOwnerCallDelete = props.onlyOwnerGetAccess
    ? `isOwner(resource.data)`
    : "";

  const allowCreate = `allow create: if isValid${capitalizedVariable}(${prefixFirebase}) ${isOwnerCallCreate}`;
  const allowUpdate = `allow update: if isValid${capitalizedVariable}(${prefixFirebase}) ${isOwnerCallEdit}`;
  const allowDelete = `allow delete: if ${isOwnerCallDelete}`;
  const allowRead = `allow read: if //add validation or remove`;

  // slice used to delete last &&
  const isValidFunction = `function isValid${capitalizedVariable}(${variable}) {
  return (${items.slice(0, -2)}
  )
}

`;
  const generateContent = () => {
    const isOwnerFunction = props.onlyOwnerGetAccess
      ? isOwnerFunctionContent + brk
      : "";

    const allContent =
      isOwnerFunction +
      isValidFunction +
      allowCreate +
      brk +
      allowUpdate +
      brk +
      allowDelete +
      brk +
      allowRead;
    return allContent;
  };

  return (
    <Paper02 title="Firebase Validation">
      <CodeBlock content={generateContent()} />
    </Paper02>
  );
};

export default ValidationFirebase;
