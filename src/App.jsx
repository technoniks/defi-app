import { Component } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import Web3 from 'web3'
import Tether from './truffle_abis/Tether.json'
import RWD from './truffle_abis/RWD.json'
import DecentralBank from './truffle_abis/DecentralBank.json'
import Main from './components/Main'
import ParticleSettings from './components/ParticleSettings'

class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    this.setState({ account : account[0] })
    const networkId = await web3.eth.net.getId()

    let tetherBalance, rwdBalance, stakingBalance
    let tether, rwd, decentralBank

    const tetherData = Tether.networks[networkId]
    if (tetherData) {
      tether = new web3.eth.Contract(Tether.abi, tetherData.address)
      // this.setState({tether})
      tetherBalance = await tether.methods.balanceOf(this.state.account).call()
    }else {
      alert('Error! Tether contract not deployed ~ network not detected')
    }
    const rwdData = RWD.networks[networkId]
    if (rwdData) {
      rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
      // this.setState({rwd})
      rwdBalance = await rwd.methods.balanceOf(this.state.account).call()
    }else {
      alert('Error! RWD contract not deployed ~ network not detected')
    }
    const decentralBankData = DecentralBank.networks[networkId]
    if (decentralBankData) {
      decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
      // this.setState({decentralBank})
      stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call()
    }else {
      alert('Error! DecentralBank contract not deployed ~ network not detected')
    }
    this.setState({
      tether,
      rwd,
      decentralBank,
      tetherBalance: tetherBalance.toString(),
      rwdBalance: rwdBalance.toString(),
      stakingBalance: stakingBalance.toString(),
      loading: false
    })
    
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }else {
      window.alert('No ethereum browser detected! You can check metamask')
    }
  }

  stakeTokens = (amount) => {
    this.setState({loading: true})
    this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({from: this.state.account}).on('transactionHash', (hash) => {
      this.state.decentralBank.methods.depositeTokens(amount).send({from: this.state.account}).on('transactionHash', (hash) => {
        this.setState({loading: false})
      })
    })
  }

  unStakeTokens = () => {
    this.setState({loading: true})
    this.state.decentralBank.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({loading: false})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      tether: {},
      rwd: {},
      decentralBank: {},
      tetherBalance: '0',
      rwdBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }
  render () {
    let content
    {
      content = this.state.loading ? <h2 id='loader' className='text-center' style={{margin: '30px', color: 'white'}}>Loading ...</h2> : 
      <Main 
        tetherBalance={this.state.tetherBalance}
        rwdBalance={this.state.rwdBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unStakeTokens={this.unStakeTokens} />
    }
    return (
      <div className='App' style={{position: 'relative'}}>
        <div style={{position: 'absolute'}}>
          <ParticleSettings />
        </div>
        <Navbar account={this.state.account} tetherBalance={this.state.tetherBalance} />
        <div className='container-fluid mt-5' style={{position: 'relative'}}>
          <div className='row'>
            <main role='main' className='col-lg-12 ml-auto mr-auto' style={{minWidth: '600px', maxHeight: '100vh'}}>
              <div>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default App
