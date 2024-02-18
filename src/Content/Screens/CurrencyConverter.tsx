import '../Components/Main.scss'
import './CurrencyConverter.scss'
import axios from "axios"
import * as moment from 'moment'
import {currencyApiAxios} from '../../requests'
import { GraficCurrencyConverter } from '../Components/GraficCurrencyConverter';
import { InputBlockCurrencyConverter } from '../Components/InputBlockCurrencyConverter';
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { Loader } from '../Components/Loader'
import {AllCurrencySymbols, ApiResponseType, ConvertCurrencyItem, DatePickerOptions} from "../../types";

const apiKey = 'd235c21d0b78818653feef36b9149cc49272039f'

const CurrencyConverter = () => {

	const datePickerRef = useRef<any>();

	const datePickerOptions : DatePickerOptions = {
		label: "YESTERDAY",
	    type: "button",
	    className: "rmdp-button rmdp-action-button",
	    onClick: () => datePickerChooseYesterday(),
	}

	const [dateValue, setDateValue] = useState<any>(moment.default().subtract(1, 'day').toDate())
	const [rightFormatDate, setRightFormatDate] = useState<string>(moment.default(dateValue).format("YYYY-MM-DD"))
	const [convertCurrency, setConvertCurrency] = useState<ApiResponseType<ConvertCurrencyItem[]>>(null)
	const [currencySymbols, setCurrencySymbols] = useState<ApiResponseType<AllCurrencySymbols>>(null)
	const [currencySymbolsNames, setCurrencySymbolsNames] = useState<string[][]>([])

	const [firstInputValue, setFirstInputValue] = useState<string>('United States Dollar')
	const [firstInputShortCurrency, setFirstInputShortCurrency] = useState<string>('USD')
	const [firstInputFocused, setFirstInputFocused] = useState<boolean>(false)
	const [firstAmount, setFirstAmount] = useState<number>(1)
	const [currencyMultipleF, setCurrencyMultipleF] = useState<number | string>(1)

	const [secondInputValue, setSecondInputValue] = useState<string>('Euro')
	const [secondInputShortCurrency, setSecondInputShortCurrency] = useState<string>('EUR')
	const [secondInputFocused, setSecondInputFocused] = useState<boolean>(false)
	const [secondAmount, setSecondAmount] = useState<number>(1)
	const [currencyMultipleS, setCurrencyMultipleS] = useState<number | string>(1)

	const dates: string[] = Array.from({ length: 3 }, (item, index : number) => (moment.default(rightFormatDate).subtract('months', index*4).format('YYYY-MM-DD'))).reverse()

	const currencyAPI = async () => {
		try {

			const graficUrlCreator = dates.map((dates: string) => (
				currencyApiAxios.get(`/historical/${dates}?api_key=${apiKey}`)
			))

			const resC = await axios.all(graficUrlCreator)
		    const resS = await currencyApiAxios.get(`/list?api_key=${apiKey}`)

		    return (	
		    	setCurrencySymbols([resS.data.currencies][0]),
		    	setConvertCurrency(resC.map(cur => cur.data).reverse())

		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	console.log(currencySymbolsNames)

	const swapValues = (): void => {
		setFirstInputShortCurrency(secondInputShortCurrency);
		setSecondInputShortCurrency(firstInputShortCurrency);
	}

	const handlerAmountChangeFirst = () => (event : React.ChangeEvent<HTMLInputElement>): void => {
		if (/^\d+(\.\d*)?$/.test(event.target.value) || event.target.value === '') {
			setFirstAmount(+event.target.value)
		}

		if (!/[^0-9.]/g.test(event.target.value)) {
			setSecondAmount(+event.target.value * +currencyMultipleS/+currencyMultipleF)
		} 
	}

	const handlerAmountChangeSecond = () => (event : React.ChangeEvent<HTMLInputElement>): void => {
		if (/^\d+(\.\d*)?$/.test(event.target.value) || event.target.value === '') {
			setSecondAmount(+event.target.value)
		}

		if (!/[^0-9.]/g.test(event.target.value)) {
			setFirstAmount(+event.target.value * +currencyMultipleF/+currencyMultipleS)
		}
	}

	const datePickerChooseYesterday = (): void => {
		setDateValue(moment.default().subtract(1, 'day').toDate())
		datePickerRef.current.closeCalendar()
	}

	useEffect(()=> {
		currencyAPI()
	}, [rightFormatDate])

	useEffect(()=> {
		if (currencySymbols) {
			setCurrencySymbolsNames(Object.entries(currencySymbols))
		}
	}, [currencySymbols])

	useMemo(()=> {

		if (convertCurrency) {
			setCurrencyMultipleF(convertCurrency[0].rates[firstInputShortCurrency].rate)
			setCurrencyMultipleS(convertCurrency[0].rates[secondInputShortCurrency].rate)
		}	

	}, [firstInputShortCurrency, secondInputShortCurrency, convertCurrency])

	useMemo(()=> {
		setSecondAmount(firstAmount * +currencyMultipleS/+currencyMultipleF)
	}, [currencyMultipleF, currencyMultipleS, rightFormatDate])

	useMemo(()=> {
		setRightFormatDate(moment.default(new Date(dateValue)).format("YYYY-MM-DD"))
	}, [dateValue.dayOfYear, dateValue.year])

	useMemo(()=> {

		if (currencySymbols && !Object.values(currencySymbols).includes(firstInputValue) && !firstInputFocused) {
			setFirstInputValue(currencySymbols[firstInputShortCurrency])
		}

		if (currencySymbols && !Object.values(currencySymbols).includes(secondInputValue) && !secondInputFocused) {
			setSecondInputValue(currencySymbols[secondInputShortCurrency])
		}

	}, [firstInputFocused, secondInputFocused])

	useMemo(()=> {
		if (currencySymbols) {
			setFirstInputValue(currencySymbols[firstInputShortCurrency])
			setSecondInputValue(currencySymbols[secondInputShortCurrency])
		}
		
	}, [firstInputShortCurrency, secondInputShortCurrency])

	return currencySymbols && convertCurrency ?
		(
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
								handlerAmountChange={handlerAmountChangeFirst()}
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
								handlerAmountChange={handlerAmountChangeSecond()}
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
								    minDate={moment.default('Jan 1, 2010').toDate()}
								    maxDate={moment.default().subtract(1, 'day').toDate()}
								    mobileButtons={[{...datePickerOptions}]}
									render={<InputIcon/>}
								/>
							</div>
						</div>
					</div>
					<div className="graphicContainer">
						<div>
							<GraficCurrencyConverter
								datesArr={dates}
								graficValues={convertCurrency}
								firstInputShortCurrency={firstInputShortCurrency}
								secondInputShortCurrency={secondInputShortCurrency}
							/>
						</div>
					</div>
				</div>
			</div>
		) : <Loader/>
}

export {CurrencyConverter}