import './InputBlockCurrencyConverter.scss'
import { useState, useRef, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const fastChoiceArr = [
	'USD',
	'EUR',
	'UAH',
	'JPY'
]

const InputBlockCurrencyConverter = (props) => {

	const {
		handlerAmmountChange,
		amount,
		inputFocused,
		setInputFocused,
		inputShortCurrency,
		setInputShortCurrency,
		inputValue,
		setInputValue,
		currencySymbolsNames
	} = props

	const inputRef = useRef();
	const isFocused = useRef();



	const [filtredSymbolsNames, setFiltredSymbolsNames] = useState(currencySymbolsNames)

	const fastChoiceCurrency = (item) => () => setInputShortCurrency(item)

	const handlerChangeCurrency = (setInputFocused, setInputValue, setInputShortCurrency, item) => (event) => {
		setInputFocused(false)
		setInputValue(item[1])
		setInputShortCurrency(item[0])
	}

	const searchIconAppear = (setInputValue, ref) => () => {
		setInputValue('')
		ref.current.focus();
	} 

	const onMouseDownClear = (setInputValue) => () => setInputValue('')

	const inputValueHandler = (setInputValue) => (event) => setInputValue(event.target.value)

	const filterCurrency = (inputValue, setFiltredArr) => {
		setFiltredArr(currencySymbolsNames.filter(item => (
			item[1].toLowerCase().includes(inputValue.toLowerCase())
		)))
	} 

	const onFocus = (setInput) => () => setInput(true)
	const onBlur = (setInput) => setInput(false)	

	useMemo(()=> {

		filterCurrency(inputValue, setFiltredSymbolsNames)

	}, [inputValue])

	useEffect(()=> {

		document.addEventListener('click', event => {
			if (inputRef.current && !inputRef.current.contains(event.target)) {
				onBlur(setInputFocused)
			}
		});

	}, [])

	return (
		<div className="inputMainContainer">
			<div 
				className="currencySearch tooltip" 
				ref={inputRef}
			>
				{inputFocused ? (
					<>
						<FontAwesomeIcon icon={faMagnifyingGlass}/>
						<FontAwesomeIcon 
							onClick={searchIconAppear(setInputValue, isFocused)} 
							icon={faXmark}
						/>
					</>
				) : (
					<div>{inputShortCurrency}</div>
				)}
				<input 
					ref={isFocused}
					className={inputFocused ? 'inputIsFocused' : ''}
					onFocus={onFocus(setInputFocused)}
					value={inputValue}
					onChange={inputValueHandler(setInputValue)}
					onMouseDown={onMouseDownClear(setInputValue)}
				/>
				{!inputFocused && inputValue &&
					<span class="tooltiptext">
						{inputValue}
					</span>
				}
				{inputFocused &&
					<div>
						{filtredSymbolsNames.length ? (
							filtredSymbolsNames.sort().map(item => (
								<div 
									className="selectedCurrency"
									onClick={handlerChangeCurrency(setInputFocused, setInputValue, setInputShortCurrency, item)}
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
					value={amount}
					onChange={handlerAmmountChange}
					className="amountInput"
				/>
			</div>
			<div className="fastCurrency">
				{fastChoiceArr.map(item => (
					<div
						onClick={fastChoiceCurrency(item)}
					>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}

export {InputBlockCurrencyConverter}