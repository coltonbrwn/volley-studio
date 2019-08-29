const scrollTo = e => {
  e.preventDefault;
  console.log(e.target.href);
}

const Nav = props => (
  <div>
    <nav>
      <a href="#portfolio" onClick={ scrollTo }>
        Portfolio
      </a>
      <a href="#about" onClick={ scrollTo }>
        About
      </a>
      <a href="#contact" onClick={ scrollTo }>
        Contact
      </a>
    </nav>
  </div>
);

export default Nav;
