import './Header.scss'
import Logo from '../../Images/logo.png'
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

const headerButtons = [
	{
		label: 'TD',
		name: 'To-do list'
	},
	{
		label: 'W',
		name: 'Weather'
	},
	{
		label: 'C',
		name: 'Currency calculator'
	}
]

const Header = () => {

	const [switcher, setSwitcher] = useState(true)

	const switcherPosition = !switcher ? "35px" : ''

	const switchTheme = () => {
		setSwitcher(!switcher)
	}

	return (
		<div className="mainContainerHeader">
			<div className="headerLogo">
				<img src={Logo}/>	
			</div>
			<div className="buttonsHeaderContainer">
				{headerButtons.map(i =>
					<div key={i.name + '_header'}> 
						<div className="buttonsHeaderLabel">{i.label}</div>
						<div className="buttonsHeaderName">{i.name}</div>
					</div> 
				)}
			</div>
			<div className="themeSwitcherContainer">
				<div className="themeSwitcher" onClick={switchTheme}>
					<div className="themeSwitcherButton" style={{left:switcherPosition}}/>
					<FontAwesomeIcon icon={faMoon} id="moon"/>
					<FontAwesomeIcon icon={faSun} id="sun"/>
				</div>
			</div>
		</div>
	)
}

export {Header}