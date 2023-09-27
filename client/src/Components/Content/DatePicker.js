import './DatePicker.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faRightLeft } from "@fortawesome/free-solid-svg-icons";

const DatePicker = (props) => {

    const {} = props

    return (
        <div className="datePickerMainContainer">
			<input
				type="date"
			/>
			{/*<FontAwesomeIcon icon={faRightLeft} />*/}
		</div>
    )
}

export {DatePicker}