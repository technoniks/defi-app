import React, { Component } from "react";
import tether from '../assets/tether.png'
import Airdrop from "./Airdrop";

class Main extends Component {

    render() {
        return (
            <div id="content" className="mt-3">
                <table className="table text-muted text-center" >
                    <thead>
                        <tr style={{color: 'white'}}>
                            <th scope="col">Staking Balance</th>
                            <th scope="col">Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{color: 'white'}}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'ether')} USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className="card mb-2 p-3" style={{opacity: '.9'}}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        let amount
                        amount = this.input.value.toString()
                        amount = window.web3.utils.toWei(amount, 'ether')
                        this.props.stakeTokens(amount)
                    }} className="mb-3" action="">
                        <div style={{borderSpacing: '0 1em'}}>
                            <label style={{marginLeft: '15px'}} className="float-start">
                                <b>Stake Tokens</b>
                            </label>
                            <span style={{marginRight: '8px'}} className="float-end">
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'ether')}
                            </span>
                            <div className="input-group mb-4">
                                <input 
                                    ref={(input => {this.input = input})}
                                    className="bg-white text-black"
                                    type="text" 
                                    placeholder="0"
                                    required /> 
                                <div className="input-group-open">
                                    <div className="input-group-text">
                                        <img height="25" src={tether} alt="tether" />
                                        &nbsp;&nbsp;&nbsp;USDT
                                    </div>    
                                </div> 
                            </div>
                            <div className="d-grid">
                            <button type="submit" className="btn btn-primary btn-md btn-block ">Deposite</button>
                            </div>
                        </div>
                    </form>
                    <button onClick={(e)=>{
                        e.preventDefault()
                        this.props.unStakeTokens()
                    }} className="btn btn-primary btn-md btn-block">Withdraw</button>
                    <div className="card-body text-center text-blue">
                        Airdrop<Airdrop stakingBalance={this.props.stakingBalance}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default React.memo(Main)