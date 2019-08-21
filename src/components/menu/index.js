import { Link } from "gatsby"
import React from "react"

const Menu = (props) => {

  const menuRoot = props.siteMenu.filter(mnu => mnu.parentid === '-1')
  //const subMenus = props.siteMenu.filter(mnu => mnu.parentid !== '-1')

  menuRoot.map(menu => {
    var hasSubmenu = props.siteMenu.filter(mnu => mnu.parentid === menu.id)
    if (hasSubmenu.length > 0) {
      menu.withsub = true
      menu.items = hasSubmenu
    }
    return menu
  })

  return (
    <nav id="menu">
      <header className="major">
        <h2>Menu</h2>
      </header>
      <ul>
        {menuRoot.map(menulink => (
          menulink.parentid !== '-1' ? '' :
            <li key={menulink.id}>
              {menulink.withsub !== true ?
              <Link to={menulink.link}>{menulink.label}</Link>
                :
              <span className="opener">{menulink.label}</span>}

              {menulink.withsub === true ?
              <ul key={`${menulink.id}-sub`}>
                {menulink.items.map(submenulink => (
                  <li key={submenulink.id}>
                    <Link to={submenulink.link}>{submenulink.label}</Link>
                  </li>
                ))}
              </ul> : ''}

            </li>
        ))}
        {/*<li><Link to="/generic">Generic</Link></li>
      <li><Link to="/elements">Elements</Link></li>
      <li>
        <span className="opener">Submenu</span>
        <ul>
          <li><Link to="/">Lorem Dolor</Link></li>
          <li><Link to="/">Ipsum Adipiscing</Link></li>
          <li><Link to="/">Tempus Magna</Link></li>
          <li><Link to="/">Feugiat Veroeros</Link></li>
        </ul>
      </li>
      <li><Link to="/">Etiam Dolore</Link></li>
      <li><Link to="/">Adipiscing</Link></li>
      <li>
        <span className="opener">Another Submenu</span>
        <ul>
          <li><Link to="/">Lorem Dolor</Link></li>
          <li><Link to="/">Ipsum Adipiscing</Link></li>
          <li><Link to="/">Tempus Magna</Link></li>
          <li><Link to="/">Feugiat Veroeros</Link></li>
        </ul>
      </li>
      <li><Link to="/">Maximus Erat</Link></li>
      <li><Link to="/">Sapien Mauris</Link></li>
      <li><Link to="/">Amet Lacinia</Link></li>*/}
      </ul>
    </nav>
  )
}

export default Menu
