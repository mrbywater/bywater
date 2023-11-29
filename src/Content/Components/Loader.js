import './Main.scss'
import './Loader.scss'

const Loader = () => {
	return (
		<div className="mainContainerContent NotFoundPage">
			<div class="loader">
				<span class="loader-text">loading</span>
				<span class="load"></span>
			</div>
		</div>
	)
}

export {Loader}