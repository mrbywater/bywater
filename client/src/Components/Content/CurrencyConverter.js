import './Main.scss'
import './CurrencyConverter.scss'
import axios from "axios"
import moment from 'moment'
import { useState, useRef, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Loader } from './Loader.js'

const fastChoiceArr = [
	'USD',
	'EUR',
	'UAH',
	'BTC'
]

const CurrencyConverter = () => {

	const datePickerRef = useRef();

	const firstInputRef = useRef();
	const isFocusedF = useRef();

	const secondInputRef = useRef();
	const isFocusedS = useRef();

	const apiKey = '67d05cb1b5e4e170c3ef7b4ca60cd9c5'

	const [dateValue, setDateValue] = useState(new Date(Date.now()-86400000))
	const [rightFormatDate, setRightFormatDate] = useState(moment(dateValue).format("YYYY-MM-DD"))
	const [convertCurrency, setConvertCurrency] = useState(null)
	const [currencySymbols, setCurrencySymbols] = useState(null)
	const [currencySymbolsNames, setCurrencySymbolsNames] = useState([])

	const [filtredSymbolsNamesF, setFiltredSymbolsNamesF] = useState(currencySymbolsNames)
	const [firstInputValue, setFirstInputValue] = useState('Euro')
	const [firstInputShortCurrency, setFirstInputShortCurrency] = useState('EUR')
	const [firstInputFocused, setFirstInputFocused] = useState(false)
	const [firstAmount, setFirstAmount] = useState(1)
	const [currencyMultipleF, setCurrencyMultipleF] = useState(1)

	const [filtredSymbolsNamesS, setFiltredSymbolsNamesS] = useState(currencySymbolsNames)
	const [secondInputValue, setSecondInputValue] = useState('United States Dollar')
	const [secondInputShortCurrency, setSecondInputShortCurrency] = useState('USD')
	const [secondInputFocused, setSecondInputFocused] = useState(false)
	const [secondAmount, setSecondAmount] = useState(1)
	const [currencyMultipleS, setCurrencyMultipleS] = useState(1)

	const filterCurrency = (inputValue, setFiltredArr) => {
		setFiltredArr(currencySymbolsNames.filter(item => (
			item[1].toLowerCase().includes(inputValue.toLowerCase())
		)))
	} 

	useEffect(()=> {
		currrencyAPI()
	}, [rightFormatDate])

	useEffect(()=> {

			if (currencySymbols) {
				setCurrencySymbolsNames(Object.entries(currencySymbols[0]))
			}

	}, [currencySymbols])

	useEffect(()=> {

		document.addEventListener('click', event => {
			if (firstInputRef.current && !firstInputRef.current.contains(event.target)) {
				onBlur(setFirstInputFocused)
			}
		});

		document.addEventListener('click', event => {
			if (secondInputRef.current && !secondInputRef.current.contains(event.target)) {
				onBlur(setSecondInputFocused)
			}
		});	

	}, [])

	useMemo(()=> {

		if (convertCurrency) {
			setCurrencyMultipleF(convertCurrency[0].rates[firstInputShortCurrency])
			setCurrencyMultipleS(convertCurrency[0].rates[secondInputShortCurrency])
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

		filterCurrency(firstInputValue, setFiltredSymbolsNamesF)
		filterCurrency(secondInputValue, setFiltredSymbolsNamesS)

	}, [firstInputValue, secondInputValue])

	useMemo(()=> {
		if (currencySymbols) {
			setFirstInputValue(currencySymbols[0][firstInputShortCurrency])
			setSecondInputValue(currencySymbols[0][secondInputShortCurrency])
		}
		
	}, [firstInputShortCurrency, secondInputShortCurrency])


	const currrencyAPI = async () => {
		try {
		    const resS = await axios.get(`http://data.fixer.io/api/symbols?access_key=${apiKey}`)
		    const resC = await axios.get(`http://data.fixer.io/api/${rightFormatDate}?access_key=${apiKey}&format=1`)
		    console.log(`http://data.fixer.io/api/${rightFormatDate}?access_key=${apiKey}&format=1`)
		    return (	
		    	setCurrencySymbols([resS.data.symbols]),
		    	setConvertCurrency([resC.data])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const onFocus = (setInput) => () => setInput(true)
	const onBlur = (setInput) => setInput(false)	

	const swapValues = () => {
		setFirstInputShortCurrency(secondInputShortCurrency);
		setSecondInputShortCurrency(firstInputShortCurrency);
	}

	if (currencySymbols) {
		return (
			<div className="mainContainerContent">
				<div className="currencyConverterContainer">
					<div className="converterContainer">
						<div>
							<div>
								<div 
									className="currencySearch tooltip" 
									ref={firstInputRef}
								>
									{firstInputFocused ? (
										<>
											<FontAwesomeIcon icon={faMagnifyingGlass}/>
											<FontAwesomeIcon 
												onClick={()=> {
													setFirstInputValue('')
													isFocusedF.current.focus();
												}} 
												icon={faXmark}
											/>
										</>
									) : (
										<div>{firstInputShortCurrency}</div>
									)}
									<input 
										ref={isFocusedF}
										className={firstInputFocused ? 'inputIsFocused' : ''}
										onFocus={onFocus(setFirstInputFocused)}
										value={firstInputValue}
										onChange={(event) => {
											setFirstInputValue(event.target.value)
										}}
										onMouseDown={()=>setFirstInputValue('')}
									/>
									{!firstInputFocused && firstInputValue &&
										<span class="tooltiptext">
											{firstInputValue}
										</span>
									}
									{firstInputFocused &&
										<div>
											{filtredSymbolsNamesF.length ? (
												filtredSymbolsNamesF.map(item => (
													<div 
														className="selectedCurrency"
														onClick={()=> {
															setFirstInputFocused(false)
															setFirstInputValue(item[1])
															setFirstInputShortCurrency(item[0])
														}}
														key={`f_${item[0]}`}
													>
														<span>{item[0]}</span>
														<span>{item[1]}</span>
													</div>	
												))) : (
													<div className="selectedCurrencyNoItems">
														No items
													</div>	
												)
											}
										</div>
									}	 
								</div>
								<div className="currencyValue">
									<input 
										value={firstAmount}
										onChange={(event) => {
											if (/^\d+(\.\d*)?$/.test(event.target.value) || event.target.value === '') {
												setFirstAmount(event.target.value)
											}

											if (!/[^0-9.]/g.test(event.target.value)) {
												setSecondAmount(event.target.value * currencyMultipleS/currencyMultipleF)
											} 
										}}
										className="amountInput"
									/>
								</div>
								<div className="fastCurrency">
									{fastChoiceArr.map(item => (
										<div 
											onClick={()=>setFirstInputShortCurrency(item)}
										>
											{item}
										</div>
									))}
								</div>
							</div>
							<div 
								className="currencySwap"
								onClick={swapValues}
							>
								<FontAwesomeIcon icon={faRightLeft} />
							</div>
							<div>
								<div 
									className="currencySearch tooltip" 
									ref={secondInputRef}
								>
									{secondInputFocused ? (
										<>
											<FontAwesomeIcon icon={faMagnifyingGlass}/>
											<FontAwesomeIcon 
												onClick={()=> {
													setSecondInputValue('')
													isFocusedS.current.focus();
												}} 
												icon={faXmark}
											/>
										</>
									) : (
										<div>{secondInputShortCurrency}</div>
									)}
									<input 
										ref={isFocusedS}
										className={secondInputFocused ? 'inputIsFocused' : ''}
										onFocus={onFocus(setSecondInputFocused)}
										value={secondInputValue}
										onChange={(event) => {
											setSecondInputValue(event.target.value)
										}}
										onMouseDown={()=>setSecondInputValue('')}
									/>
									{!secondInputFocused && secondInputValue &&
										<span class="tooltiptext">
											{secondInputValue}
										</span>
									}
									{secondInputFocused &&
										<div>
											{filtredSymbolsNamesS.length ? (
												filtredSymbolsNamesS.map(item => (
													<div 
														className="selectedCurrency"
														onClick={()=> {
															setSecondInputFocused(false)
															setSecondInputValue(item[1])
															setSecondInputShortCurrency(item[0])
														}}
														key={`s_${item[0]}`}
													>
														<span>{item[0]}</span>
														<span>{item[1]}</span>
													</div>	
												))) : (
													<div className="selectedCurrencyNoItems">
														No items
													</div>	
												)
											}
										</div>
									}	 
								</div>
								<div className="currencyValue">
									<input 
										value={secondAmount}
										onChange={(event) => {
											if (/^\d+(\.\d*)?$/.test(event.target.value) || event.target.value === '') {
												setSecondAmount(event.target.value)
											}

											if (!/[^0-9.]/g.test(event.target.value)) {
												setFirstAmount(event.target.value * currencyMultipleF/currencyMultipleS)
											}
										}}
										className="amountInput"
									/>
								</div>
								<div className="fastCurrency">
									{fastChoiceArr.map(item => (
										<div
											onClick={()=>setSecondInputShortCurrency(item)}
										>
											{item}
										</div>
									))}
								</div>
							</div>
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
								    minDate={new Date('Jan 1, 2000')}
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
						<div></div>
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