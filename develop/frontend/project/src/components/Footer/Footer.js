import { FaGithub, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';
const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <div style={{ padding: 20 }}>Team IMCA</div>
      <div className={styles.footer_info}>
        <div>공연/페스티벌 일정과 정보를 확인하고</div>
        <div> 나만의 캘린더에서 원하는 공연일정을</div>
        <div>저장/관리할 수 있는 사이트입니다</div>
      </div>
      <div className={styles.footer_names}>
        <div>
          <div className={styles.footer_name}>김산이</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/_tancong_"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="white" />
            </a>
            <a
              href="https://github.com/tanmtn"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="white" />
            </a>
          </div>
        </div>
        <div>
          <div className={styles.footer_name}>김진우</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/sds7629/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="white" />
            </a>
            <a
              href="https://github.com/sds7629"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="white" />
            </a>
          </div>
        </div>
        <div>
          <div className={styles.footer_name}>김희은</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/_hiniminih_/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="white" />
            </a>
            <a
              href="https://github.com/hiheeen"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="white" />
            </a>
          </div>
        </div>
        <div>
          <div className={styles.footer_name}>박민정</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/minz0ey/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="white" />
            </a>
            <a
              href="https://github.com/MINZOEY"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="white" />
            </a>
          </div>
        </div>
        <div>
          <div className={styles.footer_name}>방민식</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/spaceenterbs/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="white" />
            </a>
            <a
              href="https://github.com/spaceenterbs"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="white" />
            </a>
          </div>
        </div>
        <div>
          <div className={styles.footer_name}>양예은</div>
          <div className={styles.footer_links}>
            <a
              href="https://www.instagram.com/hi._.yangkong/"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={20} color="white" />
            </a>
            <a
              href="https://github.com/DEV-Yangkong"
              className="github"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={20} color="white" />
            </a>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Footer;
