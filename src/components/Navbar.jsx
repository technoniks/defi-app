import { Component } from 'react'
import bank from '../assets/bank.png'

export class Navbar extends Component {
    
    render () {
        return (
            <nav className="navbar navbar-dark fixed-top shadow p-0 bg-dark">
                <div className='navbar-brand col-sm-3 col-md-2'>
                    <img src={bank} width='40' height='40' className='d-inline-block align-top mx-2'/>
                    <a className="navbar-brand">
                        DeFi Bank App
                    </a>
                </div>
                <ul className="navbar-nav px-3">
                    <li className='text-nowrap d-none nav-item  d-sm-block'>
                        <small className="text-white">Account: {this.props.account}</small>
                    </li>
                </ul>
            </nav>  
        )
    }
}