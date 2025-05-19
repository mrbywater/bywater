import '../../components/Main.scss';
import './Home.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { useScreenResize } from '../../helper';
import { SKILLS_ARR } from '../../constants';
import CustomButton from '../../components/formComponents/customButton/CustomButton';

const Home = () => {
  // const windowWidth: number = useScreenResize();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = require('../../media/CV_Nick_Melnik.pdf');
    link.download = 'CV_Nick_Melnik.pdf';
    link.click();
  };

  return (
    <div className="mainContainerContent mainContainerHome">
      <div className="personContainer">
        <div>
          <span>
            <b>Melnik</b> Nick
          </span>
          <span>React developer</span>
          <CustomButton icon={faDownload} onClick={handleDownloadCV}>
            CV
          </CustomButton>
        </div>
        <div>
          <img src={require('../../media/myPhoto.jpg')} alt="myPhoto" />
        </div>
      </div>
      <div className="skillsContainer">
        <div
          className="blocksLabel"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="500">
          My Skills
        </div>
        <div>
          {SKILLS_ARR.map(item => (
            <div
              className="selectedSkill"
              data-aos="flip-down"
              key={`skill_${item.name}`}>
              <img src={item.img} alt={`imgOf${item.name}`} />
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
          data-aos-duration="500">
          Education
        </div>
        <div>
          <div className="educationContainerImg" data-aos="zoom-in-down">
            <img src={require('../../media/unik.jpg')} alt="unik" />
          </div>
          <div className="educationContainerDescp" data-aos="zoom-in-down">
            <span>
              <b>Odessa national maritime university</b> <br />
              majoring in computer science
            </span>
            <div className="educationContainerDescpTable">
              <div>
                <span>Already have</span>
                <span>Bachelor&apos;s degree</span>
              </div>
              <div>
                <span>Already have</span>
                <span>Master&apos;s degree</span>
              </div>
            </div>
            <FontAwesomeIcon icon={faGraduationCap} />
          </div>
        </div>
      </div>
      {/*<div className="worksContainer">*/}
      {/*  <div*/}
      {/*    className="blocksLabel"*/}
      {/*    data-aos="fade-down"*/}
      {/*    data-aos-easing="linear"*/}
      {/*    data-aos-duration="500">*/}
      {/*    My works*/}
      {/*  </div>*/}
      {/*<div className="worksBackground">*/}
      {/*  <div>*/}
      {/*    <div data-aos="zoom-in-down">*/}
      {/*      <span>*/}
      {/*        <b>Graduate work</b>*/}
      {/*      </span>*/}
      {/*      <span>Website/online store for car service station</span>*/}
      {/*    </div>*/}
      {/*    <div data-aos="zoom-in-down">*/}
      {/*      <video*/}
      {/*        width={windowWidth < 1200 ? '80%' : '500px'}*/}
      {/*        height="80%"*/}
      {/*        controls>*/}
      {/*        <source src={require('../../media/GW.mp4')} type="video/mp4" />*/}
      {/*        Sorry, your browser doesn&apos;t support videos.*/}
      {/*      </video>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*</div>*/}
      <div className="aboutMeContainer">
        <div
          className="blocksLabel"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="500">
          About me
        </div>
        <div>
          <div data-aos="zoom-in-down">
            <span>
              I&apos;m a developer with experience in creating web and mobile
              applications on React and React Native. I work confidently with
              JavaScript, TypeScript, Redux and modern development tools. Focus
              on clean code, performance and team interaction. Open to new
              challenges and technologies. This is a portfolio website and plus
              a couple of small works.
            </span>
            <span>
              <b>E-mail:</b> nickmelnikbywater@gmail.com
            </span>
            <div className="infoButtonsMobile">
              <div>
                <a href="https://github.com/mrbywater">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/nick-melnik-mrbywater">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
          <div data-aos="zoom-in-down">
            <div className="infoButtons">
              <div>
                <a href="https://github.com/mrbywater">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/nick-melnik-mrbywater">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Home };
