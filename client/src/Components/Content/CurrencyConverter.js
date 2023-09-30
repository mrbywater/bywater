import './Main.scss'
import './CurrencyConverter.scss'
import axios from "axios"
import { useState, useRef, useEffect } from 'react'
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

	const apiKey = '67d05cb1b5e4e170c3ef7b4ca60cd9c5'

	const [dateValue, setDateValue] = useState(new Date())
	const [currencySymbols, setCurrencySymbols] = useState(null)
	const [currencySymbolsNames, setCurrencySymbolsNames] = useState([])
	const [fisrtInputValue, setFisrtInputValue] = useState('')
	const [fisrtInputShortCurrency, setFisrtInputShortCurrency] = useState('EUR')
	const [fisrtInputFocused, setFisrtInputFocused] = useState(false)

	useEffect(()=> {
		currrencyAPI()
	}, [])

	useEffect(()=> {
			if (currencySymbols) {
				setCurrencySymbolsNames(Object.entries(currencySymbols[0]))
			}
	}, [currencySymbols])

	useEffect(()=> {
		const handleClickOutside = (event) => {
			if (fisrtInputRef.current && !fisrtInputRef.current.contains(event.target)) {
				onBlur()
			}
		};

		document.addEventListener('click', handleClickOutside);

	}, [])

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
									onClick={()=>console.log(fisrtInputFocused)}
								>
									{fisrtInputFocused ? (
										<>
											<FontAwesomeIcon icon={faMagnifyingGlass}/>
											<FontAwesomeIcon 
												onClick={()=> {
													setFisrtInputValue('3')
												}} 
												icon={faXmark}
											/>
										</>
									) : (
										<div>{fisrtInputShortCurrency}</div>
									)}
									<input 
										className={fisrtInputFocused ? 'inputIsFocused' : ''}
										onFocus={onFocus}
										value={fisrtInputValue}
										onChange={(event) => {
											setFisrtInputValue(event.target.value)
										}}
									/>
									{!fisrtInputFocused && fisrtInputValue &&
										<span class="tooltiptext">
											{fisrtInputValue}
										</span>
									}
									{fisrtInputValue && fisrtInputFocused &&
										<div>
											{currencySymbolsNames.map(item => (
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
											))}
										</div>
									}	 
								</div>
								<div className="currencyValue"></div>
								<div className="fastCurrency"></div>
							</div>
							<div 
								className="currencySwap"
								
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