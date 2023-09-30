import './Main.scss'
import './CurrencyConverter.scss'
import axios from "axios"
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
	const fisrtInputRef = useRef();
	const isFocused = useRef();

	const apiKey = '67d05cb1b5e4e170c3ef7b4ca60cd9c5'

	const [dateValue, setDateValue] = useState(new Date())
	const [currencySymbols, setCurrencySymbols] = useState(null)
	const [currencySymbolsNames, setCurrencySymbolsNames] = useState([])
	const [filtredSymbolsNames, setFiltredSymbolsNames] = useState(currencySymbolsNames)
	const [fisrtInputValue, setFisrtInputValue] = useState('Euro')
	const [fisrtInputShortCurrency, setFisrtInputShortCurrency] = useState('EUR')
	const [fisrtInputFocused, setFisrtInputFocused] = useState(false)

	const filterCurrency = (inputValue, setFiltredArr) => {
		setFiltredArr(currencySymbolsNames.filter(item => (
			item[1].toLowerCase().includes(inputValue.toLowerCase())
		)))
	} 

	useEffect(()=> {
		currrencyAPI()
	}, [])

	useEffect(()=> {

			if (currencySymbols) {
				setCurrencySymbolsNames(Object.entries(currencySymbols[0]))
			}

	}, [currencySymbols])

	useEffect(()=> {

		document.addEventListener('click', event => {
			if (fisrtInputRef.current && !fisrtInputRef.current.contains(event.target)) {
				onBlur()
			}
		});

	}, [])

	useMemo(()=> {

		if (currencySymbols && !Object.values(currencySymbols[0]).includes(fisrtInputValue) && !fisrtInputFocused) {
			setFisrtInputValue(currencySymbols[0][fisrtInputShortCurrency])
		}

	}, [fisrtInputFocused])

	useMemo(()=> {

		filterCurrency(fisrtInputValue, setFiltredSymbolsNames)

	}, [fisrtInputValue])


	const currrencyAPI = async () => {
		try {
		    const res = await axios.get(`http://data.fixer.io/api/symbols?access_key=${apiKey}`)

		    return (
		    	setCurrencySymbols([res.data.symbols])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	const onFocus = () => setFisrtInputFocused(true)
	const onBlur = () => setFisrtInputFocused(false)	

	if (currencySymbols) {
		return (
			<div className="mainContainerContent">
				<div className="currencyConverterContainer">
					<div className="converterContainer">
						<div>
							<div>
								<div 
									className="currencySearch tooltip" 
									ref={fisrtInputRef}
								>
									{fisrtInputFocused ? (
										<>
											<FontAwesomeIcon icon={faMagnifyingGlass}/>
											<FontAwesomeIcon 
												onClick={()=> {
													setFisrtInputValue('')
													isFocused.current.focus();
												}} 
												icon={faXmark}
											/>
										</>
									) : (
										<div>{fisrtInputShortCurrency}</div>
									)}
									<input 
										ref={isFocused}
										className={fisrtInputFocused ? 'inputIsFocused' : ''}
										onFocus={onFocus}
										value={fisrtInputValue}
										onChange={(event) => {
											setFisrtInputValue(event.target.value)
										}}
										onMouseDown={()=>setFisrtInputValue('')}
									/>
									{!fisrtInputFocused && fisrtInputValue &&
										<span class="tooltiptext">
											{fisrtInputValue}
										</span>
									}
									{fisrtInputFocused &&
										<div>
											{filtredSymbolsNames.length ? (
												filtredSymbolsNames.map(item => (
													<div 
														className="selectedCurrency"
														onClick={()=> {
															setFisrtInputFocused(false)
															setFisrtInputValue(item[1])
															setFisrtInputShortCurrency(item[0])
														}}
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
								<div className="currencyValue"></div>
								<div className="fastCurrency"></div>
							</div>
							<div 
								className="currencySwap"
								onClick={()=>console.log()}
							>
								<FontAwesomeIcon icon={faRightLeft} />
							</div>
							<div>
								<div className="currencySearch"></div>
								<div className="currencyValue"></div>
								<div className="fastCurrency"></div>
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
								    minDate={new Date('Jan 1, 1990')}
								    maxDate={new Date()}
								    mobileButtons={[
								      {
								        label: "TODAY",
								        type: "button",
								        className: "rmdp-button rmdp-action-button",
								        onClick: () => {
								        	setDateValue(new Date())
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