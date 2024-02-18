import './Main.scss'
import './Loader.scss'

const Loader = () => {
	return (
		<div className="mainContainerContent NotFoundPage">
			<div className="loader">
				<span className="loader-text">loading</span>
				<span className="load"></span>
			</div>
		</div>
	)
}

export {Loader}