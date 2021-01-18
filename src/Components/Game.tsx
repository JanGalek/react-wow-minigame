import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {ItemInterface, Data} from "./Game/Data";
import ItemList from "./Game/ItemList";
import ButtonShuffle from "./Game/ButtonShuffle";
import {Container, Row, Col} from "react-bootstrap";
import DifficultToggle from "./Game/DifficultToggle";
import {connect} from "react-redux";

type LiveItemInterface = {
    flower: boolean,
    circle: boolean,
    filled: boolean,
    image: string,
    main: boolean,
}

type TimerInterface = {
    timerOn: boolean,
    time: number,
    timerStart: number,
    timer: any
}

const ConnectedGame = () => {
    const [Items, setItems] = useState<ItemInterface[]|null>(null)
    const [list, setList] = useState<LiveItemInterface[]|null>(null)
    const [prevMainItem, setPrevMainItem] = useState<number|null>(null)
    const [score, setScore] = useState<number>(0)
    const [difficult, setDifficult] = useState<number>(0)
    const [timer, setTimer] = useState<TimerInterface>({
        timerOn: false,
        timerStart: 0,
        time: 0,
        timer: () => {}
    })

    useEffect(function setupItems() {
        if (Items === null) {
            setItems(Data)
        }
    }, [Items])


    const randomInteger = (min: number, max: number) => {
        return Math.floor(min + 1 + Math.random() * (max - min))
    }

    const filterItem = (item: ItemInterface, rightProp: number, main: boolean, mainItem: ItemInterface|null) => {
        if (rightProp === 1 && item.flower === main) {
            if (mainItem !== null && mainItem.circle === item.circle && mainItem.filled === item.filled) {
                return false;
            }
            return true
        }
        if (rightProp === 2 && item.circle === main) {
            if (mainItem !== null && mainItem.flower === item.flower && mainItem.filled === item.filled) {
                return false;
            }
            return true
        }
        if (rightProp === 3 && item.filled === main) {
            if (mainItem !== null && mainItem.circle === item.circle && mainItem.flower === item.flower) {
                return false;
            }
            return true
        }

        return false;
    }

    const createLiveItems = (items: ItemInterface[], main: ItemInterface) => {
        let liveItems: LiveItemInterface[] = [{
            flower: main.flower,
            circle: main.circle,
            filled: main.filled,
            image: main.image,
            main: true
        }]
        items.forEach(function (item, key) {
            liveItems.push({
                flower: item.flower,
                circle: item.circle,
                filled: item.filled,
                image: item.image,
                main: false
            })
        })
        return liveItems
    }

    const shuffle = (items: any) => {
        let length = items.length

        while (length !== 0) {
            let randId = Math.floor(Math.random() * length)
            length -= 1

            let tmp = items[length]
            items[length] = items[randId]
            items[randId] = tmp
        }

        return items
    }

    const generateMainIndex: (i: number, prevIndex: (number | null)) => (number) = useCallback((i: number, prevIndex: number|null) => {
        let mainIndex = randomInteger(0, i - 1)

        if (prevIndex === null) {
            return mainIndex
        }

        if (prevIndex !== null && mainIndex === prevIndex) {
            return generateMainIndex(i, prevIndex)
        }

        return mainIndex;
    }, [])

    const generate = useCallback(() => {
        if (Items !== null) {
            let rightProp = Math.floor(Math.random() * (3 - 1 + 1)) + 1
            let rightPropValue = Math.random() !== 0

            let availableList = Items.filter((item, key) => {
                return filterItem(item, rightProp, rightPropValue, null)
            })

            let mainIndex = generateMainIndex(availableList.length, prevMainItem)

            let mainItem = availableList[mainIndex]

            let playList = shuffle(Items.filter((item, key) => {
                return filterItem(item, rightProp, !rightPropValue, mainItem)
            }));

            let liveItems = createLiveItems(playList, mainItem)

            liveItems = shuffle(liveItems)

            liveItems.map((item, key) => {
                if (item.main) {
                    mainIndex = key
                }

                return item
            })

            setPrevMainItem(mainIndex)

            setList(liveItems)
        }
    }, [Items, generateMainIndex, prevMainItem])

    useEffect(function initGenerate() {
        if (Items !== null && list === null) {
            generate()
        }
    }, [Items, list, generate])

    const getTimerTimeByDifficult = (difficult: number) => {
        let coefficient = 10
        let i = Math.ceil(coefficient / (difficult) + 1);
        // diff 0 = 10
        // diff 1 = 5
        // diff 2 = 3
        console.log(i)
        return i * 1000
    }

    const startTimer = () => {
        let timerTime = getTimerTimeByDifficult(difficult)
        setTimer({
            timerOn: true,
            timerStart: Date.now() - timer.time,
            time: timer.time,
            timer: setInterval(() => {
                setTimer({
                    timerOn: timer.timerOn,
                    timerStart: timer.timerStart,
                    time: Date.now() - timer.timerStart,
                    timer: timer.timer
                })
            }, 10)
        })
    }

    const stopTimer = () => {
        setTimer({timerOn: false, timerStart: timer.timerStart, time: timer.time, timer: timer.timer})
        clearInterval(timer.timer)
    }

    const timeLeft = () => {
        if (list !== null) {
            let newScore = score - 1
            setScore(newScore)
            generate()
        }
    }

    const onClick = (key: number) => {
        if (list !== null) {
            let selected = list[key]
            let newScore;

            if (selected.main) {
                newScore = score + 1
            } else {
                newScore = score - 1
            }

            setScore(newScore)
            generate()
        }
    }

    if (list == null) {
        return <></>
    }

    let seconds = ("0" + (Math.floor((timer.time / 1000) % 60) % 60)).slice(-2)

    return (
        <>
            <Row>
                <Col>Game score: </Col>
                <Col><h2>{score}</h2></Col>
                <Col><DifficultToggle difficult={difficult} /></Col>
                <Col>{seconds}</Col>
            </Row>
            <ItemList itemList={list} handleItemClick={onClick} />
            <ButtonShuffle onClick={generate} />
        </>
    )
}

const Game = connect()(ConnectedGame)

export default Game;
