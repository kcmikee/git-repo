import React from "react";
import styled, { css } from "styled-components";

function Dropdown({ onChange, selected, setSelected, options, label, disabled }) {
  const handleSelect = (e) => {
    let currentSelection = e.currentTarget.value;
    setSelected(currentSelection);
    if (label === "Sort") {
      let dObject = options.filter((o) => o.label === currentSelection)[0];
      onChange({
        sort: dObject.sort,
        order: dObject.order,
      });
    } else {
      onChange(currentSelection);
    }
  };
  if (!options) {
    return null;
  }
  return (
    <Container label={label}>
      <DropdownLabel>{`${label}: `}</DropdownLabel>
      <DropdownSelect value={selected} onChange={handleSelect} disabled={disabled || false}>
        {options.map((d) => (
          <DropdownOption key={d.label} value={d.label}>
            {d.label}
          </DropdownOption>
        ))}
      </DropdownSelect>
    </Container>
  );
}

export default Dropdown;

const Container = styled.div``;

const DropdownSelect = styled.select`
  ${({ theme }) => css`
    border-radius: 10px;
    border: 2px solid ${theme.colors.secondary};
    padding: 0.25rem;
    margin-bottom: 1rem;
    cursor: pointer;
  `}
`;

const DropdownLabel = styled.label`
  font-weight: 900;
`;

const DropdownOption = styled.option``;
