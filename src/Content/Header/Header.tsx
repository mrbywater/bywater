import './Header.scss'
import { faMoon, faSun, faTemperatureHalf, faUser, faCalculator} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import {useScreenResize} from "../../helper";
import {HeaderButtons} from "../../types";

const headerButtons = [
	{
		icon: faUser,
		name: 'Home',
		selectColor: '#22222E'
	},
	{
		icon: faTemperatureHalf,
		name: 'Weather',
		selectColor: '#271B80'
	},
	{
		icon: faCalculator,
		name: 'Currency converter',
		selectColor: '#F3D408'
	}
]


const Header = () => {

	const windowWidth : number = useScreenResize()
	const logo = require('../../Images/logo.png')

	let darkMode : string | null = localStorage.getItem('darkMode');
	let location : string = useLocation().pathname.slice(1)

	const [switcher, setSwitcher] = useState<boolean>(darkMode !== 'enabled')
	const [isOpen, setOpen] = useState<boolean>(false)

	const handleIsOpen = () => setOpen(!isOpen)
	const closeSideBar = () => setOpen(false)
			
	const switcherPosition : string = !switcher ? "35px" : ''

	const enableDarkMode = (): void => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkMode', 'enabled');
    }

    const disableDarkMode = (): void => {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkMode', 'null');
    }

	const switchTheme = () : void => {
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

    const linkConvert = (str : string) => (str.toLowerCase().replace(/ /g, '-'))

	return windowWidth <= 1280 ? (
		<div className="mainContainerHeader">
			<Menu
				isOpen={isOpen}
				onOpen={handleIsOpen}
				onClose={handleIsOpen}
			>
				<div className="headerLogo">
					<Link to={'/'}>
						<img src={logo} alt="logo" onClick={closeSideBar}/>
					</Link>
				</div>
			   <div className="buttonsHeaderContainer">
					{headerButtons.map((i : HeaderButtons) =>
						<Link
							to={i.name === "Home" ? "/" : linkConvert(i.name)}
							key={`name_${i.name}`}
							onClick={closeSideBar}
						>
							<div className="buttonsHeaderLabel">
								<FontAwesomeIcon icon={i.icon} style={((i.name === "Home" ? '' : linkConvert(i.name)) === location) ? {color: i.selectColor} : {}}/>
							</div>
							<div className="buttonsHeaderName">{i.name}</div>
						</Link>
					)}
				</div>
			</Menu>
			<div className="themeSwitcherContainer">
				<div className="themeSwitcher" onClick={switchTheme}>
					<div className="themeSwitcherButton" style={{left:switcherPosition}}/>
					<FontAwesomeIcon icon={faMoon} id="moon"/>
					<FontAwesomeIcon icon={faSun} id="sun"/>
				</div>
			</div>
		</div>
    ) : (
		<div className="mainContainerHeader">
			<div className="headerLogo">
				<Link to={'/'}>
					<img src={logo} alt="logo"/>
				</Link>
			</div>
			<div className="buttonsHeaderContainer">
				{headerButtons.map((i : HeaderButtons) =>
					<Link to={i.name === "Home" ? "/" : linkConvert(i.name)} key={`name_${i.name}`}>
						<div className="buttonsHeaderLabel">
							<FontAwesomeIcon icon={i.icon} style={((i.name === "Home" ? '' : linkConvert(i.name)) === location) ? {color: i.selectColor} : {}}/>
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