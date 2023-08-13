import './Header.scss'
import Logo from '../../Images/logo.png'
import { faMoon, faSun, faTemperatureHalf, faPenToSquare, faCalculator} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'

const headerButtons = [
	{
		label: faPenToSquare,
		name: 'To-do list'
	},
	{
		label: faTemperatureHalf,
		name: 'Weather'
	},
	{
		label: faCalculator,
		name: 'Currency calculator'
	}
]

const Header = () => {

	let darkMode = localStorage.getItem('darkMode');

	const [switcher, setSwitcher] = useState(darkMode === 'enabled' ? false : true)

	const switcherPosition = !switcher ? "35px" : ''

	const enableDarkMode = () => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkMode', 'enabled');
    }

    const disableDarkMode = () => {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkMode', null);
    }

	const switchTheme = () => {
        if (darkMode !== 'enabled') {
            enableDarkMode();
            setSwitcher(false)
        } else {
            disableDarkMode();
            setSwitcher(true)
        }
	}

	useEffect(()=>{
        if (darkMode === 'enabled') {
            enableDarkMode();
            setSwitcher(false)
        }
    }, [])

	return (
		<div className="mainContainerHeader">
			<div className="headerLogo">
				<img src={Logo} alt="logo"/>	
			</div>
			<div className="buttonsHeaderContainer">
				{headerButtons.map(i =>
					<div key={i.name + '_header'}> 
						<div className="buttonsHeaderLabel">
							<FontAwesomeIcon icon={i.label}/>
						</div>
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