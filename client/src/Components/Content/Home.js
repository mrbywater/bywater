import './Main.scss'
import './Home.scss'
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from 'react'

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
		name: 'React Native',
		img : require('../../Images/reactn.png')
	},
	{
		name: 'Sass',
		img : require('../../Images/sass.png')
	},
	{
		name: 'Axois',
		img : require('../../Images/axios.png')
	},
	{
		name: 'ES6',
		img : require('../../Images/es6.png')
	}
]

const Home = () => {

	useEffect(() => {
        AOS.init();
      }, [])

	return (
		<div className="mainContainerContent">
			<div className="personContainer">
				<div>
					<span><b>Melnik</b> Nick</span>
					<span>beginning IT developer</span>
				</div>
				<div>
					<img src={require('../../Images/doflamingo.jpg')} alt="myPhoto"/>
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
						<div className="selectedSkill" data-aos="flip-down">
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
				<div></div>
			</div>
		</div>
	)
}

export {Home}

