import './Header.scss'
import Logo from '../../Images/logo.png'
import { faMoon, faSun, faTemperatureHalf, faUser, faCalculator} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const headerButtons = [
	{
		label: faUser,
		name: 'Home',
		selectColor: '#22222E'
	},
	{
		label: faTemperatureHalf,
		name: 'Weather',
		selectColor: '#271B80'
	},
	{
		label: faCalculator,
		name: 'Currency converter',
		selectColor: '#F3D408'
	}
]


const Header = () => {

	let darkMode = localStorage.getItem('darkMode');
	let location = useLocation().pathname.slice(1)

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
    }, [darkMode])

    const linkConvert = (str) => (str.toLowerCase().replace(/ /g, '-'))

	return (
		<div className="mainContainerHeader">
			<div className="headerLogo">
				<Link to={'/'}> 
					<img src={Logo} alt="logo"/>
				</Link>		
			</div>
			<div className="buttonsHeaderContainer">
				{headerButtons.map(i =>
					<Link to={i.name === "Home" ? "/" : linkConvert(i.name)} key={`name_${i.name}`}> 
						<div className="buttonsHeaderLabel">
							<FontAwesomeIcon icon={i.label} style={((i.name === "Home" ? '' : linkConvert(i.name)) === location) ? {color: i.selectColor} : ''}/>
						</div>
						<div className="buttonsHeaderName">{i.name}</div>
					</Link> 
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