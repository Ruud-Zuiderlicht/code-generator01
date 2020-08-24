import React, { useState, createContext } from "react";

export const ContentFirebase = createContext();

export const ContentFirebaseContext = ({ children }) => {
  const [items, setItems] = useState([]);
  const [variable, setVariable] = useState("");
  const [myKey, setMyKey] = useState("");
  const [type, setType] = useState("");
  const [rangeType, setRangeType] = useState("");
  const [range, setRange] = useState("");
  const [range2, setRange2] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [ownerSelector, setOwnerSelector] = useState("");
  const [onlyOwnerGetAccess, setOnlyOwnerGetAccess] = useState(false);

  return (
    <ContentFirebase.Provider
      value={{
        items,
        setItems,
        variable,
        setVariable,
        myKey,
        setMyKey,
        type,
        setType,
        rangeType,
        setRangeType,
        range,
        setRange,
        range2,
        setRange2,
        isRequired,
        setIsRequired,
        ownerSelector,
        setOwnerSelector,
        onlyOwnerGetAccess,
        setOnlyOwnerGetAccess,
      }}
    >
      {children}
    </ContentFirebase.Provider>
  );
};

export default ContentFirebaseContext;
