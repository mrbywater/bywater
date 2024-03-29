import '../Components/Main.scss'
import './Home.scss'
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {useScreenResize} from "../../helper";

const skills = [
	{
		name: 'JS',
		img : require('../../Images/js.png')
	},
	{
		name: 'HTML',
		img : require('../../Images/html.png')
	},
	{
		name: 'CSS',
		img : require('../../Images/css.png')
	},
	{
		name: 'Git',
		img : require('../../Images/git.png')
	},
	{
		name: 'React',
		img : require('../../Images/react.png')
	},
	{
		name: 'TypeScript',
		img : require('../../Images/typescript.png')
	},
	{
		name: 'Sass',
		img : require('../../Images/sass.png')
	},
	{
		name: 'Axios',
		img : require('../../Images/axios.png')
	},
	{
		name: 'ES6',
		img : require('../../Images/es6.png')
	}
]

const Home = () => {

	const windowWidth : number = useScreenResize()

	useEffect(() => {
        AOS.init();
    }, [])

	return (
		<div className="mainContainerContent mainContainerHome">
			<div className="personContainer">
				<div>
					<span><b>Melnik</b> Nick</span>
					<span>React developer</span>
				</div>
				<div>
					<img src={require('../../Images/myPhoto.jpg')} alt="myPhoto"/>
				</div>
			</div>
			<div className="skillsContainer">
				<div
					className="blocksLabel"
					data-aos="fade-down"
	     			data-aos-easing="linear"
	     			data-aos-duration="500"
				>
					My Skills
				</div>
				<div>
					{skills.map(item => (
						<div
							className="selectedSkill"
							data-aos="flip-down"
							key={`skill_${item.name}`}
						>
							<img src={item.img} alt={`imgOf${item.name}`}/>
							<span>{item.name}</span>
						</div>
					))}
				</div>
			</div>
			<div className="educationContainer">
				<div
					className="blocksLabel"
					data-aos="fade-down"
	     			data-aos-easing="linear"
	     			data-aos-duration="500"
				>
					Education 
				</div>
				<div>
					<div className="educationContainerImg" data-aos="zoom-in-down">
						<img src={require('../../Images/unik.jpg')} alt="unik"/>
					</div>
					<div className="educationContainerDescp" data-aos="zoom-in-down">
						<span><b>Odessa national maritime university</b> <br/>majoring in computer science</span>
						<div className="educationContainerDescpTable">
							<div>
								<span>Already have</span>
								<span>Bachelor's degree</span>
							</div>
							<div>
								<span>Studying now</span>
								<span>Master's degree</span>
							</div>
						</div>
						<FontAwesomeIcon icon={faGraduationCap}/>
					</div>
				</div>
			</div>
			<div className="worksContainer">
				<div
					className="blocksLabel"
					data-aos="fade-down"
	     			data-aos-easing="linear"
	     			data-aos-duration="500"
				>
					My works 
				</div>
				<div className="worksBackground">
					<div>
						<div data-aos="zoom-in-down">
							<span><b>Graduate work</b></span>
							<span>Website/online store for car service station</span>
						</div>
						<div data-aos="zoom-in-down">
							<video width={windowWidth < 1200 ? "80%" : "500px"} height="80%" controls>
	    						<source src={require("../../Images/GW.mp4")} type="video/mp4" />
	    						Sorry, your browser doesn't support videos.
							</video>
						</div>
					</div>
				</div>
			</div>
			<div className="aboutMeContainer">
				<div
					className="blocksLabel"
					data-aos="fade-down"
	     			data-aos-easing="linear"
	     			data-aos-duration="500"
				>
					About me
				</div>
				<div>
					<div data-aos="zoom-in-down">
						<span>I'm a 22-year-old computer science student from Ukraine, familiar with ReactJS, and have written several trial projects using React and ReactNative, as well as a full-fledged project - my thesis. This is a portfolio website and plus a couple of small works.</span>
						<span><b>E-mail:</b> nickmelnikbywater@gmail.com</span>
						<div className="infoButtonsMobile">
							<div>
								<a href="https://github.com/mrbywater">
									<FontAwesomeIcon icon={faGithub}/>
								</a>
							</div>
							<div>
								<a href="https://www.linkedin.com/in/nick-melnik-mrbywater">
									<FontAwesomeIcon icon={faLinkedin}/>
								</a>
							</div>
						</div>
					</div>
					<div data-aos="zoom-in-down">
						<div className="infoButtons">
							<div>
								<a href="https://github.com/mrbywater">
									<FontAwesomeIcon icon={faGithub}/>
								</a>
							</div>
							<div>
								<a href="https://www.linkedin.com/in/nick-melnik-mrbywater">
									<FontAwesomeIcon icon={faLinkedin}/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
	)
}

export {Home}

