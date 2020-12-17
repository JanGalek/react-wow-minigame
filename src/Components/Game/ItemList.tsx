import {ItemInterface} from "./Data";
import Item from "./Item";
import React from "react";
import styled from "styled-components";
import {Row} from "react-bootstrap";

const Container = styled(Row)`
  background-color: var(--gray-dark);
  border: 1px solid var(--gray);
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const ItemList = (props: any) => {
    const itemList = props.itemList;
    return (
        <>
            <Container>
                {itemList.map((item: ItemInterface, key: number) => (
                    <Item item={item} key={key} itemKey={key} handleItemClick={props.handleItemClick} />
                ))}
            </Container>
        </>
    )
}

export default ItemList;
