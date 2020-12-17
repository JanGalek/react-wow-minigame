
export type ItemInterface = {
    flower: boolean,
    circle: boolean,
    filled: boolean,
    image: string
};

export const Data: ItemInterface[] = [
    {
        flower: true,
        circle: true,
        filled: true,
        image: 'CircledFlowerFull.png'
    },
    {
        flower: true,
        circle: true,
        filled: false,
        image: 'CircledFlowerEmpty.png'
    },
    {
        flower: true,
        circle: false,
        filled: true,
        image: 'FlowerFull.png'
    },
    {
        flower: true,
        circle: false,
        filled: false,
        image: 'FlowerEmpty.png'
    },
    {
        flower: false,
        circle: true,
        filled: true,
        image: 'CircledLeafFull.png'
    },
    {
        flower: false,
        circle: true,
        filled: false,
        image: 'CircledLeafEmpty.png'
    },
    {
        flower: false,
        circle: false,
        filled: true,
        image: 'LeafFull.png'
    },
    {
        flower: false,
        circle: false,
        filled: false,
        image: 'LeafEmpty.png'
    }
];
