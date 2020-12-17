import React from "react";
import styled from "styled-components";
import {Col, Image} from "react-bootstrap";

const ItemWrapper = styled(Col)`
  //float: left;
  align-items: center;
  padding: 20px;
  width: 325px;
  height: 325px;
  justify-content: center;
  display: flex;
  
  &:hover {
    background-color: var(--blue);
    cursor: pointer;
  }
`

const Item = (props: any) => {
    const item = props.item;
    const itemKey = props.itemKey;
    return (
        <ItemWrapper onClick={() => props.handleItemClick(itemKey)}>
            <Image src={`/assets/${item.image}`} alt={item.image} />
        </ItemWrapper>
    )
}

export default Item;
