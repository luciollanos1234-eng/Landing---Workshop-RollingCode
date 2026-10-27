import facebookIcon from '../assets/facebook.svg'
import githubIcon from '../assets/github.svg'
import instagramIcon from '../assets/instagram.svg'
import linkedinIcon from '../assets/linkedin.svg'
import logo from '../assets/logo-rolling-blanco.png'
import xIcon from '../assets/x.svg'
import youtubeIcon from '../assets/youtube.svg'

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/rollingcodeschool/', icon: instagramIcon },
  { name: 'Facebook', url: 'https://www.facebook.com/RollingCodeSchool', icon: facebookIcon },
  { name: 'LinkedIn', url: 'https://ar.linkedin.com/school/rollingcodeschool/', icon: linkedinIcon },
  { name: 'YouTube', url: 'https://www.youtube.com/@rollingcode7175', icon: youtubeIcon },
  { name: 'X', url: 'https://x.com/rollingcodeok', icon: xIcon },
  { name: 'GitHub', url: 'https://github.com/404', icon: githubIcon },
]

function Footer() {
  return (
    <footer className="mt-16 border-t border-borde-tarjeta bg-superficie py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4">
        <img src={logo} alt="RollingCode" className="h-14 w-auto" />

        <nav aria-label="Redes sociales">
          <ul className="flex flex-wrap justify-center gap-4">
            {socialLinks.map(({ name, url, icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-borde-tarjeta transition-all duration-300 hover:-translate-y-1 hover:bg-rojo-oscuro hover:shadow-md hover:shadow-rojo-rolling/20"
                >
                  <img src={icon} alt="" aria-hidden="true" className="h-6 w-6 brightness-0 invert" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
