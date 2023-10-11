import './Main.scss'
import './CurrencyConverter.scss'
import axios from "axios"
import moment from 'moment'
import { GraficCurrencyConverter } from './GraficCurrencyConverter.js';
import { InputBlockCurrencyConverter } from './InputBlockCurrencyConverter.js';
import { useState, useRef, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Loader } from './Loader.js'

const CurrencyConverter = () => {

	const datePickerRef = useRef();

	const apiKey = 'd235c21d0b78818653feef36b9149cc49272039f'

	const [dateValue, setDateValue] = useState(new Date(Date.now()-86400000))
	const [rightFormatDate, setRightFormatDate] = useState(moment(dateValue).format("YYYY-MM-DD"))
	const [convertCurrency, setConvertCurrency] = useState(null)
	const [currencySymbols, setCurrencySymbols] = useState(null)
	const [currencySymbolsNames, setCurrencySymbolsNames] = useState([])
	const [graficValues, setGraficValues] = useState(null)

	const [firstInputValue, setFirstInputValue] = useState('United States Dollar')
	const [firstInputShortCurrency, setFirstInputShortCurrency] = useState('USD')
	const [firstInputFocused, setFirstInputFocused] = useState(false)
	const [firstAmount, setFirstAmount] = useState(1)
	const [currencyMultipleF, setCurrencyMultipleF] = useState(1)

	const [secondInputValue, setSecondInputValue] = useState('Euro')
	const [secondInputShortCurrency, setSecondInputShortCurrency] = useState('EUR')
	const [secondInputFocused, setSecondInputFocused] = useState(false)
	const [secondAmount, setSecondAmount] = useState(1)
	const [currencyMultipleS, setCurrencyMultipleS] = useState(1)

	const datesArr = Array.from({ length: 3 }, (item, index) => (
		moment(rightFormatDate).subtract('months', index*4).format('YYYY-MM-DD'))
	).reverse()

	const graficUrlCreator = datesArr.map(dates => (
		axios.get(`https://api.getgeoapi.com/v2/currency/historical/${dates}?api_key=${apiKey}&from=${firstInputShortCurrency}&to=${secondInputShortCurrency}`)
	))

	const currrencyAPI = async () => {
		try {

		    const resS = await axios.get(`https://api.getgeoapi.com/v2/currency/list?api_key=${apiKey}`)
		    const resC = await axios.get(`https://api.getgeoapi.com/v2/currency/historical/${rightFormatDate}?api_key=${apiKey}`)

		    return (	
		    	setCurrencySymbols([resS.data.currencies]),
		    	setConvertCurrency([resC.data])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const graficAPI = async () => {
		try {
		    const res = await axios.all(graficUrlCreator)

		    return(
		    	setGraficValues(res.map(cur => cur.data))
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}


	const swapValues = () => {
		setFirstInputShortCurrency(secondInputShortCurrency);
		setSecondInputShortCurrency(firstInputShortCurrency);
	}

	const handlerAmmountChangeFirst = () => (event) => {
		if (/^\d+(\.\d*)?$/.test(event.target.value) || event.target.value === '') {
			setFirstAmount(event.target.value)
		}

		if (!/[^0-9.]/g.test(event.target.value)) {
			setSecondAmount(event.target.value * currencyMultipleS/currencyMultipleF)
		} 
	}

	const handlerAmmountChangeSecond = () => (event) => {
		if (/^\d+(\.\d*)?$/.test(event.target.value) || event.target.value === '') {
			setSecondAmount(event.target.value)
		}

		if (!/[^0-9.]/g.test(event.target.value)) {
			setFirstAmount(event.target.value * currencyMultipleF/currencyMultipleS)
		}
	}

	useEffect(()=> {
		currrencyAPI()
	}, [rightFormatDate])

	useEffect(()=> {

			if (currencySymbols) {
				setCurrencySymbolsNames(Object.entries(currencySymbols[0]))
			}

	}, [currencySymbols])

	useMemo(()=> {

		graficAPI()	

	}, [rightFormatDate, firstInputShortCurrency, secondInputShortCurrency])

	useMemo(()=> {

		if (convertCurrency) {
			setCurrencyMultipleF(convertCurrency[0].rates[firstInputShortCurrency].rate)
			setCurrencyMultipleS(convertCurrency[0].rates[secondInputShortCurrency].rate)
		}	

	}, [firstInputShortCurrency, secondInputShortCurrency, convertCurrency])

	useMemo(()=> {
		setSecondAmount(firstAmount * currencyMultipleS/currencyMultipleF)
	}, [currencyMultipleF, currencyMultipleS, rightFormatDate])

	useMemo(()=> {
		setRightFormatDate(moment(new Date(dateValue)).format("YYYY-MM-DD"))
	}, [dateValue.dayOfYear, dateValue.year])

	useMemo(()=> {

		if (currencySymbols && !Object.values(currencySymbols[0]).includes(firstInputValue) && !firstInputFocused) {
			setFirstInputValue(currencySymbols[0][firstInputShortCurrency])
		}

		if (currencySymbols && !Object.values(currencySymbols[0]).includes(secondInputValue) && !secondInputFocused) {
			setSecondInputValue(currencySymbols[0][secondInputShortCurrency])
		}

	}, [firstInputFocused, secondInputFocused])

	useMemo(()=> {
		if (currencySymbols) {
			setFirstInputValue(currencySymbols[0][firstInputShortCurrency])
			setSecondInputValue(currencySymbols[0][secondInputShortCurrency])
		}
		
	}, [firstInputShortCurrency, secondInputShortCurrency])

	if (currencySymbols && graficValues) {
		return (
			<div className="mainContainerContent">
				<div className="currencyConverterContainer">
					<div className="converterContainer">
						<div>
							<InputBlockCurrencyConverter
								inputFocused={firstInputFocused}
								setInputFocused={setFirstInputFocused}
								inputShortCurrency={firstInputShortCurrency}
								setInputShortCurrency={setFirstInputShortCurrency}
								inputValue={firstInputValue}
								setInputValue={setFirstInputValue}
								currencySymbolsNames={currencySymbolsNames}
								handlerAmmountChange={handlerAmmountChangeFirst()}
								amount={firstAmount}
							/>
							<div 
								className="currencySwap"
								onClick={swapValues}
							>
								<FontAwesomeIcon icon={faRightLeft} />
							</div>
							<InputBlockCurrencyConverter
								inputFocused={secondInputFocused}
								setInputFocused={setSecondInputFocused}
								inputShortCurrency={secondInputShortCurrency}
								setInputShortCurrency={setSecondInputShortCurrency}
								inputValue={secondInputValue}
								setInputValue={setSecondInputValue}
								currencySymbolsNames={currencySymbolsNames}
								handlerAmmountChange={handlerAmmountChangeSecond()}
								amount={secondAmount}
							/>
						</div>
						<div>
							<div className="dateChangerContainer">
								<span>
									Date
								</span>
								<DatePicker 
									ref={datePickerRef}
									className="rmdp-mobile bg-dark"
								    value={dateValue}
								    onChange={setDateValue}
								    minDate={new Date('Jan 1, 2010')}
								    maxDate={new Date(Date.now()-86400000)}
								    mobileButtons={[
								      {
								        label: "YESTERDAY",
								        type: "button",
								        className: "rmdp-button rmdp-action-button",
								        onClick: () => {
								        	setDateValue(new Date(Date.now()-86400000))
								        	datePickerRef.current.closeCalendar()
								        },
								      },
								    ]}
									render={<InputIcon/>}
								/>
							</div>
						</div>
					</div>
					<div className="graphicContainer">
						<div>
							<GraficCurrencyConverter
								datesArr={datesArr}
								graficValues={graficValues}
								firstInputShortCurrency={firstInputShortCurrency}
								secondInputShortCurrency={secondInputShortCurrency}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<Loader/>
		)
	}
}

export {CurrencyConverter}