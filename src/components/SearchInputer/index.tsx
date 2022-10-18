import React from "react";

import { SearchContainer, SearchInput, SearchIcon } from "./styled";

interface SearchInputerProps {
  onChange?: any;
  className?: string;
  placeholder?: string;
}

const SearchInputer: React.FC<SearchInputerProps> = ({
  className,
  onChange,
  placeholder,
}) => {
  return (
    <SearchContainer className={className}>
      <SearchIcon>
        <i className="fa fa-search" />
      </SearchIcon>
      <SearchInput
        onChange={onChange || (() => {})}
        placeholder={placeholder || ""}
      />
    </SearchContainer>
  );
};

export default SearchInputer;
