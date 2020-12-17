import React from "react";

const ButtonShuffle = (props: any) => {
    const onClick = props.onClick

    return (
        <>
            <button onClick={onClick}>Shuffle</button>
        </>
    )
}

export default ButtonShuffle;
