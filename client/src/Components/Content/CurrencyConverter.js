import './Main.scss'
import './CurrencyConverter.scss'
import axios from "axios"
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
// import { DatePicker } from './DatePicker.js';

const CurrencyConverter = () => {

	const datePickerRef = useRef();

	const apiKey = '67d05cb1b5e4e170c3ef7b4ca60cd9c5'

	const [dateValue, setDateValue] = useState(new Date())
	const [currrency, setCurrency] = useState(null)


	useEffect(()=> {
		currrencyAPI()
	}, [])
	
	const currrencyAPI = async () => {
		try {
		    const res = await axios.get(`http://data.fixer.io/api/latest?access_key=${apiKey}`)

		    return (
		    	setCurrency([res])
		    )
		  } catch (err) {
		    console.error(err.toJSON())
		  }
	}

	

	return (
		<div className="mainContainerContent">
			<div className="currencyConverterContainer">
				<div className="converterContainer">
					<div>
						<div>
							<div className="currencySearch">
								<div>EUR</div>
								{/*<FontAwesomeIcon icon={faMagnifyingGlass} />*/}
								<input 
									// style={{paddingLeft: '50px'}}
								/>
								<div>
									<div className="selectedCurrency ">
										<span>USDWW</span>
										<span>US Dollar US Dollar US Dollar US Dollar</span>
									</div>	
									<div className="selectedCurrency ">
										<span>USDWW</span>
										<span>US Dollar US Dollar US Dollar US Dollar</span>
									</div>
									<div className="selectedCurrency ">
										<span>USDWW</span>
										<span>US Dollar US Dollar US Dollar US Dollar</span>
									</div>
									<div className="selectedCurrency ">
										<span>USDWW</span>
										<span>US Dollar US Dollar US Dollar US Dollar</span>
									</div>								
								</div>
							</div>
							<div className="currencyValue"></div>
							<div className="fastCurrency"></div>
						</div>
						<div 
							className="currencySwap"
							onClick={()=> console.log(currrency)}
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
}

export {CurrencyConverter}