import './Main.scss'
import './CurrencyConverter.scss'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from './DatePicker.js';

const CurrencyConverter = () => {

	const [dateValue, setDateValue] = useState('')

	return (
		<div className="mainContainerContent">
			<div className="currencyConverterContainer">
				<div className="converterContainer">
					<div>
						<div>
							<div className="currencySearch"></div>
							<div className="currencyValue"></div>
							<div className="fastCurrency"></div>
						</div>
						<div className="currencySwap">
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
							<DatePicker/>  
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