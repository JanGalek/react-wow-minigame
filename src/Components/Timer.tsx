import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";

const ConnectedTimer = () => {
    const [startDate, setStartDate] = useState<number|null>(null)
    const [dateTimer, setDateTimer] = useState<any>(null)
    const [countDate, setCountDate] = useState<string|null>(null)

    const [started, setStarted] = useState(false)

    const dateStyle = {hourCycle: 'h23', hour: 'numeric', minute: '2-digit', second: '2-digit'}

    const getFormattedDate = useCallback((date: Date) => {
        return new Intl.DateTimeFormat([], dateStyle).format(date);
    }, [])

    const startTimer = useCallback(() => {
        const timer = setInterval(() => {
            if (started && startDate !== null) {
                let now = new Date(Date.now());
                let newCountDate = new Date(Date.now() - startDate + (now.getTimezoneOffset() * 60 * 1000));
                setCountDate(getFormattedDate(newCountDate))

            }
        }, 1000)

        if (dateTimer === null) {
            setDateTimer(timer)
        }
    }, [dateTimer, getFormattedDate, startDate, started])


    useEffect(() => {
        if (countDate === null) {
            const date = new Date();
            date.setHours(0, 0, 0, 0)
            setCountDate(getFormattedDate(date))
        }

        if (dateTimer === null && started) {
            startTimer()
            return () => clearInterval(dateTimer)
        }

    }, [countDate, dateTimer, getFormattedDate, startDate, startTimer, started])

    const handleClick = () => {
        if (started) {
            setStarted(false)
            clearInterval(dateTimer)
            setDateTimer(null)
        } else {
            setStartDate(Date.now())
            setStarted(true)
        }
    }

    return (
        <>
            <h2>Timer</h2>
            <p>{countDate}</p>
            <TimerHandleButton started={started} handleClick={handleClick} />
        </>
    )
}

const TimerHandleButton = (props: any) => {
    const started = props.started
    const handleClick = props.handleClick
    return (
        <>
            <button onClick={handleClick} >{started ? 'Stop' : 'Start'}</button>
        </>
    )
}

const Timer = connect()(ConnectedTimer)

export default Timer
