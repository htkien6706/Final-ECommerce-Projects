import { NavLink } from "react-router-dom"
import styles from "./admin.module.css"

export default function AdminLayout() {
    return (
        <div className={styles.app}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <img src="/admin/brand-icon.avif"></img>
                    <span className={styles.brand_name}> KShopify</span>
                </div>
                <nav className={styles.navbar}>
                    <ul>
                        <span className={styles.main_menu}> Main menu</span>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => {
                                console.log(isActive);
                                return `${styles.nav_link} ${isActive ? styles.active : ""}`
                            }} style={{paddingLeft: "10px"}}> 
                            <img src="/admin/dashboard.jpg" style={{width: "30px", marginRight: "5px"}}></img>
                            <span> Dashboard</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/inventory" className={({ isActive }) => `${styles.nav_link} ${isActive ? styles.active : ''}`} style={{paddingLeft: "7px"}}>
                                <img src="/admin/inventory.png" style={{width: "35px", mixBlendMode:"multiply", paddingRight: "4px"}}></img>
                                <span> Inventory</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/customers" className={({ isActive }) => `${styles.nav_link} ${isActive ? styles.active : ""}`} style={{paddingLeft:"0px",}}>
                            <img src="/admin/customers.avif" style={{width: "45px", mixBlendMode:"multiply", paddingRight: "0px"}}></img>
                            Customers 
                            
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/orders" className={({ isActive }) => {
                                console.log("The current state of this navbar is active? : ", isActive);
                                return `${styles.nav_link} ${isActive ? styles.active : ''}`;
                            }}>
                                <img src="/admin/orders.png" style={{width: "35px", marginRight:"2px"}}></img>
                                <span> Orders</span>
                            </NavLink>
                        </li>

                    </ul>

                    <ul>
                        <span> Delivery and Analysis</span>
                        <li>
                            <NavLink to="/delivery" className={({ isActive }) => {
                                console.log(isActive);
                                return `${styles.nav_link} ${isActive ? styles.active : ''}`
                            }} style={{paddingLeft: "5px"}}> 
                            <img src="/admin/delivery.jpg" style={{width:"38px", marginRight: "5px"}}></img>
                            Delivery </NavLink>
                        </li>

                        <li>
                            <NavLink to="/analysis" className={({ isActive, isPending }) => {
                                console.log("The current state of navlink is: isActive:", isActive);
                                console.log("Is it in pending status? :", isPending);
                                return `${styles.nav_link} ${isActive ? 'active' : ''}`;
                            }}> 
                            
                            <img src="/admin/analytics.png" style={{width: "28px", paddingRight: "8px"}}></img>
                            Analytics </NavLink>
                        </li>
                    </ul>

                    <ul>
                        <span> Setting and support</span>
                        <li>
                            <NavLink to="/setting" className={({ isActive }) => {
                                console.log("Is Setting active:", isActive);
                                return `${styles.nav_link} ${isActive ? styles.active : ''}`;
                            }}> 
                            <img src="/admin/settings.png" style={{width: "30px", paddingRight: "6px"}}></img>
                            Settings</NavLink>
                        </li>

                        <li>
                            <NavLink to="/notifications" className={({ isActive }) => {
                                console.log(isActive);
                                return `${styles.nav_link} ${isActive ? styles.active : ''}`;
                            }}> 
                            <img src="/admin/notifications.png" style={{width:"30px", mixBlendMode:"multiply", paddingRight:"5px"}}></img>
                            Notifications </NavLink>
                        </li>

                        <li>
                            <NavLink to="/help" className={({ isActive }) => {
                                console.log(isActive);
                                return `${styles.nav_link} ${isActive ? styles.active : ''}`;
                            }}> 
                            <img src="/admin/help-center.webp" style={{width:"32px", paddingRight: "4px"}}></img>
                            Help Center</NavLink>
                        </li>
                    </ul>

                    <ul className={styles.logout}>
                        <li>
                            <NavLink to="/logout" className={({ isActive }) => {
                                console.log(isActive);
                                return `${styles.nav_link} ${isActive ? styles.active : ''}`;
                            }} style={{ paddingLeft: "0px" }}> 
                            
                            <img src="/admin/logout.png" style={{width:"32px",paddingRight: "5px"}}></img>
                            Logout</NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.main}>
                <header className={styles.headers}></header>
                <section className={styles.content}></section>
            </main>
        </div>
    )
}